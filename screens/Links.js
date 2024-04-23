import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Linking, Image, Alert } from 'react-native';
import { getDatabase, ref, query, orderByChild, equalTo, onValue, off, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const Links = ({ navigation }) => {
    const [links, setLinks] = useState([]);
    const db = getDatabase();
    const resourcesRef = ref(db, 'resource');
    const linksQuery = query(resourcesRef, orderByChild('category'), equalTo('link'));
    const auth = getAuth()
    useEffect(() => {
        const fetchLinks = () => {
            onValue(linksQuery, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const linksArray = Object.values(data);
                    setLinks(linksArray);
                }
            }, {
                cancelCallback: (error) => {
                    console.log('Error fetching links:', error);
                }
            });
        };

        fetchLinks();

        return () => {
            off(linksQuery);
        };
    }, []);

    const openLink = (url) => {
        Linking.openURL(url).catch((error) => Alert.alert(error.message));
    };

    const toggleFavorite = (index, key) => {
        const updatedLinks = [...links];
        updatedLinks[index].favorite = !updatedLinks[index].favorite;
        setLinks(updatedLinks);
    
        // Update favorite status in Firebase
        const userId = auth.currentUser.uid;
        const favoriteRef = ref(db, `favoriteResources/${userId}`);
        const favoriteStatus = updatedLinks[index].favorite;
        update(favoriteRef, { [key]: favoriteStatus }) // Use an object with key-value pair to update
            .then(() => {
                console.log('Favorite status updated successfully');
            })
            .catch((error) => {
                console.error('Error updating favorite status:', error);
                // Rollback the UI change if updating in Firebase fails
                updatedLinks[index].favorite = !favoriteStatus;
                setLinks(updatedLinks);
            });
    };
    

    const renderItem = ({ item, index }) => (
        <TouchableOpacity style={styles.linkContainer} onPress={() => openLink(item.links[0])}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={[styles.linkText, { color: 'black' }]}>{item.title}: </Text>
                <TouchableOpacity onPress={() => toggleFavorite(index, item.key)}>
                    <Image
                        source={item.favorite ? require('../assets/heart1.png') : require('../assets/favorites-outline-black.png')}
                        style={styles.favoriteIcon}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.linkText}>{item.links}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/left-arrow.png')} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.title}>Links</Text>
                <TouchableOpacity>
                    <Image source={require('../assets/posting.png')} style={[styles.icon, { opacity: 0 }]} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={links}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    linkContainer: {
        paddingVertical: 10,
        borderColor: '#ccc',
        borderWidth: 0.5,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    linkText: {
        fontSize: 16,
        color: 'blue',
        textDecorationLine: 'underline',
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
    favoriteIcon: {
        height: 24,
        width: 24,
    },
});

export default Links;
