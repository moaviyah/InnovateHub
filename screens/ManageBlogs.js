import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert, FlatList } from 'react-native';
import { SECONDARY } from '../colors';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
/**
 * Component for managing blogs.
 * 
 * @param {object} navigation - Navigation prop object.
 * @returns {JSX.Element} - Manage blogs UI.
 */
const ManageBlogs = ({ navigation }) => {
  const [blogs, setBlogs] = useState([]);
  const db = getDatabase();
  const postsRef = ref(db, 'blogs');
  useEffect(() => {
    const fetchPosts = async () => {
      onValue(postsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const postsArray = Object.values(data).reverse();
          setBlogs(postsArray);
        }
      }, {
        cancelCallback: (error) => {
          Alert.alert('Error fetching posts:', error);
        }
      });
    };
    fetchPosts();
  }, []);
  const navigate = (blogData) => {
    navigation.navigate('EditBlog', { blogData })
  }
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    return `${formattedMonth}/${formattedDay}/${year}`;
  };
  const deletePost = (postRef) => {
    console.log(postRef)
    remove(ref(db, `blogs/${postRef}`)).then(() => {
      Alert.alert('Resource Deleted.')
    }).catch((error) => {
      Alert.alert('Something went wrong', error.message)
    })
  }
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
        <Text style={{ fontSize: 16, fontWeight: '700' }}>{item.title}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ opacity: 0.5 }}>{item.date}</Text>
          <Text style={{ color: '#18A0FB' }}>{item.category}</Text>
        </View>

        <View style={{}}>
          <View style={{ width: '70%', marginTop: 10 }}>
            <Text numberOfLines={2} style={{ opacity: 0.7 }}>{item.description}</Text>
          </View>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignSelf: 'flex-end', width: '30%', paddingHorizontal: 10, }}>
            <Image source={require('../assets/editing.png')} style={{ height: 32, width: 32 }} />
            <Image source={require('../assets/delete.png')} style={{ height: 32, width: 32 }} />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center', paddingTop: 15, marginBottom: 10 }}>
          {/* Back button */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../assets/left-arrow.png')} style={{ height: 24, width: 24 }} />
          </TouchableOpacity>
          {/* Title */}
          <Text style={{ fontWeight: '700', fontSize: 18 }}>Handle Blogs</Text>
          {/* Create new post button */}
          <TouchableOpacity onPress={() => { navigation.navigate('CreateNewBlog') }}>
            <Image source={require('../assets/posting.png')} style={{ height: 30, width: 30 }} />
          </TouchableOpacity>
        </View>
        {blogs.map((item, index) => (
          <View key={index} style={styles.postContainer}>
            {/* {item.image && (
            <Image source={item.image} style={styles.image} resizeMode='contain' />
          )} */}
            <View style={styles.textContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.category}>{item.category}</Text>
              </View>
              <Text style={styles.date}>{formatDate(item.time)}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <View style={{ width: '70%', }}>
                  <Text numberOfLines={2} style={styles.description}>{item.description}</Text>
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', width: '30%', paddingHorizontal: 10 }}>
                  <TouchableOpacity onPress={() => navigate(item)}>
                    <Image source={require('../assets/editing.png')} style={{ height: 32, width: 32 }} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { deletePost(item.key) }}>
                    <Image source={require('../assets/delete.png')} style={{ height: 32, width: 32 }} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </View>
        ))}
      </SafeAreaView>
    </ScrollView>
  )
}

export default ManageBlogs

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SECONDARY,
  },
  postContainer: {
    borderWidth: 0.5,
    borderColor: 'black',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRightColor: 'black',
    borderRadius: 20,
    paddingBottom: 15,
    paddingTop: 10
  },
  image: {
    height: '20%',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  textContainer: {
    marginHorizontal: 10,
    marginTop: 5
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  category: {
    fontSize: 14,
    color: '#18A0FB'
  },
  date: {
    fontSize: 14,
    color: 'black',
    marginBottom: 5,
    opacity: 0.5
  },
  description: {
    fontSize: 14,
    color: '#333',
    opacity: 0.8
  }
})
