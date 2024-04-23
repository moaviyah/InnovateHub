import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image, Dimensions, TouchableOpacity, Alert, FlatList, Linking } from 'react-native';
import { getDatabase, ref, query, orderByKey, equalTo, onValue, off, update, remove } from 'firebase/database';

// Importing colors from custom color file
import { PRIMARY, SECONDARY } from '../colors';
import { getAuth } from 'firebase/auth';

// Getting device dimensions
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Favorites = ({ navigation }) => {
    const [favoritePosts, setFavoritePosts] = useState([]);
    const [favoriteResources, setfavoriteResources] = useState([])
    const auth = getAuth()
    useEffect(() => {
        const db = getDatabase();
        const favoritesRef = ref(db, `favorites/${auth.currentUser.uid}`); // Assuming the user ID is hardcoded
        const favoritesQuery = query(favoritesRef, orderByKey());
        const favoriteResources = ref(db, `favoriteResources/${auth.currentUser.uid}`); // Assuming the user ID is hardcoded
        const favoriteResourcesQuery = query(favoriteResources, orderByKey());
        const fetchFavoritePosts = () => {
            onValue(favoritesQuery, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const postIds = Object.keys(data);
                    const promises = postIds.map((postId) => fetchPostData(postId));
                    Promise.all(promises)
                        .then((posts) => setFavoritePosts(posts))
                        .catch((error) => Alert.alert('Error fetching favorite posts:', error.message));
                }
            }, {
                cancelCallback: (error) => {
                    console.error('Error fetching favorite posts:', error);
                }
            });
        };
        const fetchFavoriteResources = () => {
            onValue(favoriteResourcesQuery, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const postIds = Object.keys(data);
                    const promises = postIds.map((postId) => fetchResourceData(postId));
                    Promise.all(promises)
                        .then((posts) => {setfavoriteResources(posts), console.log('favorite resource', posts)})
                        .catch((error) => Alert.alert('Error fetching favorite posts:', error.message));
                }
            }, {
                cancelCallback: (error) => {
                    console.error('Error fetching favorite posts:', error);
                }
            });
        };

        fetchFavoritePosts();
        fetchFavoriteResources();
        return () => {
            off(favoritesQuery);
        };
    }, []);

    const fetchPostData = (postId) => {
        return new Promise((resolve, reject) => {
            const db = getDatabase();
            const postRef = ref(db, `posts/${postId}`);

            onValue(postRef, (snapshot) => {
                const postData = snapshot.val();
                resolve(postData);
            }, {
                cancelCallback: (error) => {
                    reject(error);
                }
            });
        });
    };
    const fetchResourceData = (postId) => {
        return new Promise((resolve, reject) => {
            const db = getDatabase();
            const postRef = ref(db, `resource/${postId}`);

            onValue(postRef, (snapshot) => {
                const postData = snapshot.val();
                resolve(postData);
            }, {
                cancelCallback: (error) => {
                    reject(error);
                }
            });
        });
    };
    const openLink = (url) => {
        Linking.openURL(url).catch((error) => Alert.alert(error.message));
    };
    const unFavoriteResource = (key)=>{
        const db = getDatabase();
        const Unref = ref(db, `favoriteResources/${auth.currentUser.uid}`)
        remove(Unref, {[key]: true})
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* Favorite Posts section */}
                <Text style={styles.titleText}>Favorite Posts</Text>
                <ScrollView horizontal>
                    <View style={styles.postContainer}>
                        {favoritePosts && favoritePosts.map((post, index) => (
                            <View style={styles.post} key={index}>
                                <Text style={styles.postTitle}>{post?.title}</Text>
                                <Text style={styles.postDescription}>{post?.description}</Text>
                                <View style={styles.postFooter}>
                                    <Text style={styles.postDate}>{post?.date}</Text>
                                    <Image source={require('../assets/heart.png')} style={styles.postIcon} />
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
                {/* Saved Resources section */}
                <Text style={styles.titleText}>Saved Resources</Text>
                {favoriteResources && favoriteResources.map((item, index) => (
                    <View
                        key={index}
                        style={styles.resourceButton}
                    >
                        <Text style={styles.resourceText}>{item.title}</Text>
                        <View style={{flexDirection:'row'}}>
                        {/* <View style={styles.resourceIcons}>
                            <Image source={require('../assets/link.png')} style={styles.resourceIcon} />
                            <Text style={styles.resourceLabel}>Copy</Text>
                        </View> */}
                        <View style={styles.resourceIcons}>
                            <Image source={require('../assets/bookmark.png')} style={styles.resourceIcon} />
                            <TouchableOpacity onPress={()=>unFavoriteResource(item?.key)}>
                            <Text style={styles.resourceLabel}>Unsave</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SECONDARY
    },
    titleText: {
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 10
    },
    postContainer: {
        flexDirection: 'row',
        height: windowHeight * 0.25,
        marginHorizontal: 10
    },
    post: {
        backgroundColor: PRIMARY,
        borderRadius: 15,
        width: windowWidth * 0.43,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    postTitle: {
        color: SECONDARY,
        fontWeight: '600',
        marginTop: 5
    },
    postDescription: {
        color: SECONDARY,
        fontWeight: '300',
        marginTop: 10
    },
    postFooter: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between'
    },
    postDate: {
        color: SECONDARY
    },
    postIcon: {
        height: 24,
        width: 24
    },
    resourceButton: {
        flexDirection: 'row',
        backgroundColor: '#D9D9D9',
        height: windowHeight * 0.1,
        marginHorizontal: 20,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginVertical: 7
    },
    resourceText: {
        color: 'black',
        fontSize: 12,
        fontWeight: '500',
        marginLeft: 10
    },
    resourceIcons: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    resourceIcon: {
        height: 24,
        width: 24
    },
    resourceLabel: {
        fontSize: 8
    }
});

export default Favorites;
