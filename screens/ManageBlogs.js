import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'

/**
 * Component for managing blogs.
 * 
 * @param {object} navigation - Navigation prop object.
 * @returns {JSX.Element} - Manage blogs UI.
 */
const ManageBlogs = ({ navigation }) => {
    // Array of sample blog posts
    const posts = [
        {
            title: "How to improve sleep cycle",
            category: "Sleep",
            date: "14/02/24",
            description: "Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur ....",
        },
        {
            title: "Train your mind to sprint work",
            category: "Mind",
            date: "14/02/24",
            description: "Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur ....",
            imageAddress: require('../assets/card.png')
        },
        {
            title: "From driver to entrepreneur, dubai",
            category: "Success story",
            date: "14/02/24",
            description: "Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur ....",
            imageAddress: require('../assets/card.png')
        }
    ];

    // Render each blog post item
    const renderPostItem = ({ item }) => (
        <View style={{ borderWidth: 1, marginHorizontal: 20, marginTop: 10, paddingHorizontal: 10, paddingVertical: 10, borderRadius: 15 }}>
            <View style={styles.textContainer}>
                <Text style={{fontSize:16, fontWeight:'700'}}>{item.title}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{opacity:0.5}}>{item.date}</Text>
                    <Text style={{ color: '#18A0FB' }}>{item.category}</Text>
                </View>

                <View style={{   }}>
                    <View style={{ width: '70%', marginTop:10 }}>
                        <Text numberOfLines={2} style={{opacity:0.7}}>{item.description}</Text>
                    </View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignSelf: 'flex-end', width: '30%', paddingHorizontal: 10,  }}>
                        <Image source={require('../assets/editing.png')} style={{ height: 32, width: 32 }} />
                        <Image source={require('../assets/delete.png')} style={{ height: 32, width: 32 }} />
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'dark-content'} />
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center', paddingTop: 15, marginBottom: 10 }}>
                {/* Back button */}
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/left-arrow.png')} style={{ height: 24, width: 24 }} />
                </TouchableOpacity>
                {/* Title */}
                <Text style={{ fontWeight: '700', fontSize: 18 }}>Manage Blogs</Text>
                {/* Create new blog button */}
                <TouchableOpacity style={{}} onPress={() => { navigation.navigate('CreateNewBlog') }}>
                    <Image source={require('../assets/posting.png')} style={{ height: 30, width: 30 }} />
                </TouchableOpacity>
            </View>
            {/* FlatList to display blog posts */}
            <FlatList
                data={posts}
                renderItem={renderPostItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    )
}

export default ManageBlogs

const styles = StyleSheet.create({})
