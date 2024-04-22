import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Dimensions, Alert, ScrollView, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { PRIMARY, SECONDARY } from '../colors';

import { getDatabase, ref, push, set, update, remove } from 'firebase/database';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').height;
const EditBlog = ({ navigation, route }) => {
    const {blogData} = route.params;
    const [title, setTitle] = useState(blogData?.title);
    const [category, setCategory] = useState(blogData?.category);
    const [description, setDescription] = useState(blogData?.description);
    const [media, setMedia] = useState(blogData?.media||[]);
    const [links, setLinks] = useState(blogData?.links||[]);
    const key = blogData?.key;
    const categories = ['Time', 'Sleep', 'Mental', 'Success Story'];

    const db = getDatabase();
    const postsRef = ref(db, `blogs/${blogData?.key}`);
    const postKey = postsRef.key;

      
    // Function to handle adding media from gallery
    const addMedia = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true,
        });

        if (!result.canceled) {
            setMedia(result.assets);
            console.log(result.assets)
        }
    };
    const resetMedia = () => {
        setMedia([])
    }
    const resetLink = () => {
        setLinks([])
    }
    // Function to handle adding link via Alert
    const addLink = () => {
        Alert.prompt(
            'Add Link',
            'Paste the link',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Add',
                    onPress: (input) => {
                        {
                            if(!input){
                                Alert.alert('Link is empty, not included!')
                                return
                            }
                            if (links.length > 0){
                            setLinks([...links, input]);
                            }else{
                            setLinks([...links, input]);
                            }
                        }
                    },
                },
            ],
            'plain-text'
        );
    };
    const renderItem = ({ item }) => (
        <Image source={{ uri: item.uri }} style={styles.mediaItem} />
    );
    const renderLink = ({item, index})=>{ 
        return(
        <Text style={{fontSize:14}}>
            link{index && index +1}: <Text style={{color:'blue'}}>{item && item}</Text>
        </Text>
        )
    }

    // Function to handle saving post
    const savePost = () => {
        // Perform validation for title, category, and description
        if (!title || !category || !description) {
            Alert.alert('Validation Error', 'Please fill in all fields.');
            return;
        }

        // Save post details to Firebase Realtime Database
        const data = {
            title: title,
            category: category,
            description: description,
            media: media,
            links: links,
            time: Date.now(),
            key: postKey
        };
        update(postsRef, data)
            .then(() => {
                Alert.alert('Updated successfully:');
            })
            .catch((error) => {
                Alert.alert('Error saving data:', error);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding':'height'}>
                <StatusBar barStyle={'dark-content'} />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/left-arrow.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Edit Blog</Text>
                    <TouchableOpacity>
                        <Image source={require('../assets/posting.png')} style={[styles.icon, { opacity: 0 }]} />
                    </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.topBtn} onPress={addMedia}>
                        <Image source={require('../assets/add-photo.png')} style={styles.icon} />
                        <Text style={styles.btnText}>Add Media</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.topBtn} onPress={addLink}>
                        <Image source={require('../assets/add-link.png')} style={styles.icon} />
                        <Text style={[styles.btnText, { color: '#0249B3' }]}>Add Link</Text>
                    </TouchableOpacity>
                </View>
                <View style={{  }}>
                    <View style={styles.mediaContainer}>
                        {
                            media?.length > 0 ? (
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: windowWidth * 0.5, marginTop: 10, }}>
                                        <Text style={styles.subtitle}>Media: </Text>
                                        <TouchableOpacity onPress={resetMedia}>
                                            <Image source={require('../assets/round.png')} style={{ height: 20, width: 20 }} />
                                        </TouchableOpacity>
                                    </View>
                                    <FlatList
                                        data={media}
                                        horizontal
                                        renderItem={renderItem}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </View>
                            ) :
                                null
                        }

                    </View>
                    <View style={styles.linksContainer}>
                    {
                            links?.length > 0 ? (
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: windowWidth * 0.5, marginTop: 10, }}>
                                        <Text style={styles.subtitle}>Links: </Text>
                                        <TouchableOpacity onPress={resetLink}>
                                            <Image source={require('../assets/round.png')} style={{ height: 20, width: 20 }} />
                                        </TouchableOpacity>
                                    </View>
                                    <FlatList
                                        data={links}
                                        renderItem={renderLink}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </View>
                            ) :
                                null
                        }
                    </View>
                    <View style={styles.categoryContainer}>
                        {categories.map((cat, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.categoryButton, category === cat && { backgroundColor: PRIMARY }]}
                                onPress={() => setCategory(cat)}
                            >
                                <Text style={{ color: '#fff', fontSize:10, fontWeight:'700', textAlign:'center' }}>{cat}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TextInput placeholder='Post Title' style={styles.input} placeholderTextColor={'black'} value={title} onChangeText={setTitle} />
                   <TextInput placeholder='Enter Post Description' placeholderTextColor={'black'} style={[styles.input, {height:windowWidth*0.08, paddingTop:15} ]}  multiline value={description} onChangeText={setDescription} />
                </View>
                <TouchableOpacity
                    style={{ backgroundColor: '#4C6FBF', paddingHorizontal: 10, paddingVertical: 25, borderRadius: 10, marginTop: windowHeight * 0.07, width: windowHeight * 0.45, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => savePost()}
                >
                    <Text style={{ color: SECONDARY, fontWeight: '600', fontSize: 18 }}>
                        SAVE POST
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default EditBlog;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SECONDARY,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        alignItems: 'center',
        paddingTop: 15,
        marginBottom: 10,
    },
    icon: {
        height: 24,
        width: 24,
    },
    title: {
        fontWeight: '700',
        fontSize: 18,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 10,
    },
    topBtn: {
        flexDirection: 'row',
        borderWidth: 1,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 10,
    },
    btnText: {
        fontSize: 16,
        marginLeft: '2%',
    },
    input: {
        borderWidth: 1,
        paddingVertical: 15,
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 10,
        paddingHorizontal: 20,
    },
    mediaContainer: {
        marginHorizontal: 20,
    },
    subtitle: {
        fontWeight: 'bold',
        fontSize: 16
    },
    mediaItem: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
        marginTop: 10,
    },
    linksContainer: {
        marginHorizontal: 20,
    },
    linkItem: {
        marginBottom: 10,
        marginTop: 20,
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 10,
    },
    categoryButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#91818A',
        marginHorizontal: 5,
        paddingHorizontal:5
    },
});
