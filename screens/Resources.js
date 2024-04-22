import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, FlatList, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import { SECONDARY } from '../colors';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
/**
 * Component for managing resources.
 * 
 * @param {object} navigation - Navigation prop object.
 * @returns {JSX.Element} - Resources UI.
 */

const Resources = ({ navigation }) => {
    const [resource, setResource] = useState([]);
    const db = getDatabase();
    const postsRef = ref(db, 'resource');
    useEffect(() => {
      const fetchPosts = async () => {
       
        onValue(postsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const postsArray = Object.values(data).reverse();
            setResource(postsArray);
          }
        }, {
          cancelCallback: (error) => {
            Alert.alert('Error fetching posts:', error);
          }
        });
      };
      fetchPosts();
    }, []);
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
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedDay = day < 10 ? `0${day}` : day;
        return `${formattedMonth}/${formattedDay}/${year}`;
      };

    const navigate =(resource)=>{
        navigation.navigate('EditResource', {resource})
    }
    const deletePost = (postRef)=>{
        console.log(postRef)
        remove(ref(db, `resource/${postRef}`)).then(()=>{
            Alert.alert('Resource Deleted.')
        }).catch((error)=>{
            Alert.alert('Something went wrong', error.message)
        })
    }
    // Render each resource item
    const renderPostItem = ({ item }) => {
        let content = null;

        switch (item.category) {
            case 'link':
                content = (
                    <View style={{ backgroundColor: '#D9D9D9', marginHorizontal: 20, paddingVertical: 10, paddingHorizontal: 10, borderRadius: 15,  marginTop:15 }}>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>Title: {item.title}</Text>
                            <Text style={styles.link}>{item.link}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>Type: </Text>
                                    <Image source={require('../assets/link.png')} style={{ height: 24, width: 24 }} />
                                </View>
                                <View style={{ flexDirection: 'row', marginRight: 10 }} >
                                    <TouchableOpacity onPress={()=>navigate(item)}>
                                    <Image source={require('../assets/editing.png')} style={{ height: 30, width: 30 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>deletePost(item.key)}>
                                    <Image source={require('../assets/delete.png')} style={{ height: 30, width: 30 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                );
                break;
            case 'Media':
                content = (
                    <View style={{ backgroundColor: '#D9D9D9', marginHorizontal: 20, paddingVertical: 10, paddingHorizontal: 10, borderRadius: 15, marginTop:15 }}>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>Title: {item.title}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>Type: </Text>
                                    <Image source={ require('../assets/document.png')} style={{ height: 24, width: 24 }} />
                                </View>
                                <View style={{ flexDirection: 'row', marginRight: 10 }} >
                                    <TouchableOpacity onPress={()=>navigate(item)}>
                                    <Image source={require('../assets/editing.png')} style={{ height: 30, width: 30 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>deletePost(item.key)}>
                                    <Image source={require('../assets/delete.png')} style={{ height: 30, width: 30 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                );
                break;
            case 'Book':
                content = (
                    <View style={{ backgroundColor: '#D9D9D9', marginHorizontal: 20, paddingVertical: 10, paddingHorizontal: 10, borderRadius: 15, marginTop:15 }}>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>Title: {item.title}</Text>
                            <Text style={styles.link}>Desc: {item.description}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>Type: </Text>
                                    <Image source={require('../assets/open-book.png')} style={{ height: 24, width: 24 }} />
                                </View>
                                <View style={{ flexDirection: 'row', marginRight: 10 }} >
                                    <TouchableOpacity onPress={()=>navigate(item)}>
                                    <Image source={require('../assets/editing.png')} style={{ height: 30, width: 30 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>deletePost(item.key)}>
                                    <Image source={require('../assets/delete.png')} style={{ height: 30, width: 30 }} />
                                    </TouchableOpacity>
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
                <TouchableOpacity style={{}} onPress={() => { navigation.navigate('CreateNewResource') }}>
                    <Image source={require('../assets/add-list.png')} style={{ height: 35, width: 35 }} />
                </TouchableOpacity>
            </View>
            {/* FlatList to display resources */}
            <FlatList
                data={resource}
                renderItem={renderPostItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    )
}

export default Resources

const styles = StyleSheet.create({})

