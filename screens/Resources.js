import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native'
import React from 'react'

/**
 * Component for managing resources.
 * 
 * @param {object} navigation - Navigation prop object.
 * @returns {JSX.Element} - Resources UI.
 */

const Resources = ({ navigation }) => {
    // Array of sample resources
    const posts = [
        {
            title: "A YouTube video explaining dropshiping",
            type: 'link',
            date: "14/02/24",
            link: "https://youtube.com/dropshiper.....",
            imageAddress: require('../assets/link.png')
        },
        {
            title: "A YouTube video explaining dropshiping",
            type: "doc",
            date: "14/02/24",
            imageAddress: require('../assets/document.png')
        },
        {
            title: "Human Nature by Robert Green published in 2018.",
            type: "book",
            date: "14/02/24",
            description: "This books elaborate the human be..",
            imageAddress: require('../assets/open-book.png')
        }
    ];
    // Render each resource item
    const renderPostItem = ({ item }) => {
        let content = null;

        switch (item.type) {
            case 'link':
                content = (
                    <View style={{ backgroundColor: '#D9D9D9', marginHorizontal: 20, paddingVertical: 10, paddingHorizontal: 10, borderRadius: 15 }}>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.link}>{item.link}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>Type: </Text>
                                    <Image source={item.imageAddress} style={{ height: 24, width: 24 }} />
                                </View>
                                <View style={{ flexDirection: 'row', marginRight: 10 }}>
                                    <Image source={require('../assets/editing.png')} style={{ height: 30, width: 30 }} />
                                    <Image source={require('../assets/delete.png')} style={{ height: 30, width: 30 }} />
                                </View>
                            </View>
                        </View>
                    </View>
                );
                break;
            case 'doc':
                content = (
                    <View style={{ backgroundColor: '#D9D9D9', marginHorizontal: 20, paddingVertical: 10, paddingHorizontal: 10, borderRadius: 15, marginTop:15 }}>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{item.title}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>Type: </Text>
                                    <Image source={item.imageAddress} style={{ height: 24, width: 24 }} />
                                </View>
                                <View style={{ flexDirection: 'row', marginRight: 10 }}>
                                    <Image source={require('../assets/editing.png')} style={{ height: 30, width: 30 }} />
                                    <Image source={require('../assets/delete.png')} style={{ height: 30, width: 30 }} />
                                </View>
                            </View>
                        </View>
                    </View>
                );
                break;
            case 'book':
                content = (
                    <View style={{ backgroundColor: '#D9D9D9', marginHorizontal: 20, paddingVertical: 10, paddingHorizontal: 10, borderRadius: 15, marginTop:15 }}>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>Title: {item.title}</Text>
                            <Text style={styles.link}>Desc: {item.description}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>Type: </Text>
                                    <Image source={item.imageAddress} style={{ height: 24, width: 24 }} />
                                </View>
                                <View style={{ flexDirection: 'row', marginRight: 10 }}>
                                    <Image source={require('../assets/editing.png')} style={{ height: 30, width: 30 }} />
                                    <Image source={require('../assets/delete.png')} style={{ height: 30, width: 30 }} />
                                </View>
                            </View>
                        </View>
                    </View>
                );
                break;
            default:
                content = null;
                break;
        }

        return content;
    };

    return (
        <SafeAreaView>
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center', paddingTop: 15, marginBottom: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/left-arrow.png')} style={{ height: 24, width: 24 }} />
                </TouchableOpacity>
                <Text style={{ fontWeight: '700', fontSize: 18 }}>Resources</Text>
                <TouchableOpacity style={{}} onPress={() => { navigation.navigate('CreateNewPost') }}>
                    <Image source={require('../assets/add-list.png')} style={{ height: 35, width: 35 }} />
                </TouchableOpacity>
            </View>
            {/* FlatList to display resources */}
            <FlatList
                data={posts}
                renderItem={renderPostItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    )
}

export default Resources

const styles = StyleSheet.create({})

