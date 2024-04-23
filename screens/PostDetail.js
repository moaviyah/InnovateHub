    import React, {useState, useEffect} from 'react';
    import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
    // Getting device dimensions
    import { getAuth } from 'firebase/auth';
    import { getDatabase, ref, set, push, remove, onValue, off } from 'firebase/database';
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width

    const PostDetail = ({ navigation, route }) => {
        const { postData } = route.params;
        const [isFavorite, setIsFavorite] = useState(false);
        const [userId, setUserId] = useState(null);
        useEffect(() => {
            const auth = getAuth();
            if (auth.currentUser) {
                setUserId(auth.currentUser.uid);
            }
        }, []);
        useEffect(() => {
            if (!userId) return;
    
            const db = getDatabase();
            const favoritesRef = ref(db, `favorites/${userId}/${postData.key}`);
    
            // Check if the post is in the user's favorites list
            onValue(favoritesRef, (snapshot) => {
                const isFavorited = snapshot.exists();
                setIsFavorite(isFavorited);
            });
    
            // Cleanup function
            return () => {
                // Remove the listener
                off(favoritesRef);
            };
        }, [userId, postData]);
        const toggleFavoritse = (index,  key) => {
            const updatedLinks = [...links];
            updatedLinks[index].favorite = !updatedLinks[index].favorite;
            setLinks(updatedLinks);
    
            // Update favorite status in Firebase
            const resourceId = updatedLinks[index].id; // Assuming there's an "id" field in your resource data
            const favoriteStatus = updatedLinks[index].favorite;
            update(ref(db, `resource/${key}`), { favorite: favoriteStatus });
        };
        const toggleFavorite = () => {
            const db = getDatabase();
            const favoritesRef = ref(db, `favorites/${userId}/${postData.key}`);
    
            if (isFavorite) {
                // Remove post from favorites
                remove(favoritesRef)
                    .then(() => {
                        setIsFavorite(false);
                    })
                    .catch((error) => {
                        console.error('Error removing post from favorites:', error);
                    });
            } else {
                // Add post to favorites
                set(favoritesRef, true)
                    .then(() => {
                        setIsFavorite(true);
                    })
                    .catch((error) => {
                        console.error('Error adding post to favorites:', error);
                    });
            }
        };
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/left-arrow.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>
                <ScrollView>

                {/* Display images */}
                {postData?.media && postData.media.length > 0 && (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {postData.media.map((image, index) => (
                            <Image key={index} source={{ uri: image.uri }} style={styles.image} resizeMode="cover" />
                        ))}
                    </ScrollView>
                )}
                <Text style={{fontSize:18, fontWeight:'600', marginBottom:10}}>
                    {postData?.title}
                </Text>
                <View style={styles.content}>
                    {/* Category icon and text */}
                    <View style={styles.categoryContainer}>
                        <Image source={require('../assets/categorization.png')} style={styles.categoryIcon} />
                        <Text style={styles.categoryText}>{postData?.category}</Text>
                    </View>

                    {/* Favorite button */}
                    <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
                        <Image 
                         source={isFavorite ? require('../assets/heart1.png') : require('../assets/favorites-outline.png')}
                        style={styles.favoriteIcon} />
                    </TouchableOpacity>
                </View>

                {/* Description */}
                {
                    postData.description && (
                        <View>
                        <Text style={{opacity:0.5}}>Description:</Text>
                        <Text style={styles.description}>{postData.description}</Text>
                        </View>
                    )
                }

                {/* Links */}
                {postData.links && postData.links.length > 0 && (
                    <View style={styles.linksContainer}>
                        <Text style={styles.linksTitle}>Links:</Text>
                        {postData.links.map((link, index) => (
                            <Text key={index} style={styles.link}>{link}</Text>
                        ))}
                    </View>
                )}
                </ScrollView>
            </View>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            padding: 20,
        },
        content: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,backgroundColor:'lightgray',
            borderRadius:10, 
            paddingHorizontal:5,
            paddingVertical:10
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 15,
            marginBottom: 20,
        },
        icon: {
            height: 24,
            width: 24,
        },
        title: {
            fontWeight: '700',
            fontSize: 18,
        },
        image: {
            width: windowWidth*0.9,
            height: windowHeight*0.5,
            borderRadius: 10,
            marginBottom: 20,
        },
        categoryContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        categoryIcon: {
            width: 24,
            height: 24,
            marginRight: 5,
        },
        categoryText: {
            fontSize: 16,
            fontWeight: '500',
            color: '#333',
        },
        favoriteButton: {
            padding: 10,
            borderRadius: 20,
        },
        favoriteIcon: {
            width: 24,
            height: 24,
        },
        description: {
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 20,
        },
        linksContainer: {
            marginTop: 20,
        },
        linksTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 5,
        },
        link: {
            fontSize: 14,
            color: 'blue',
            textDecorationLine: 'underline',
        },
    });

    export default PostDetail;
