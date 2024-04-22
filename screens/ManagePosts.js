import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SECONDARY } from '../colors';
import { getDatabase, ref, onValue, remove } from 'firebase/database';

const ManagePosts = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const db = getDatabase();
  const postsRef = ref(db, 'posts');
  useEffect(() => {
    const fetchPosts = async () => {
      onValue(postsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const postsArray = Object.values(data).reverse();
          setPosts(postsArray);
        }
      }, {
        cancelCallback: (error) => {
          Alert.alert('Error fetching posts:', error);
        }
      });
    };
    fetchPosts();
  }, []);
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    return `${formattedMonth}/${formattedDay}/${year}`;
  };

  const deletePost = (postRef)=>{
    console.log(postRef)
    remove(ref(db, `posts/${postRef}`)).then(()=>{
        Alert.alert('Post Deleted.')
    }).catch((error)=>{
        Alert.alert('Something went wrong', error.message)
    })
}
  const navigate = (postData)=>{  
    navigation.navigate('EditPost', {postData})
  }

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center', paddingTop: 15, marginBottom: 10 }}>
        {/* Back button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/left-arrow.png')} style={{ height: 24, width: 24 }} />
        </TouchableOpacity>
        {/* Title */}
        <Text style={{ fontWeight: '700', fontSize: 18 }}>Manage Posts</Text>
        {/* Create new post button */}
        <TouchableOpacity onPress={() => { navigation.navigate('CreateNewPost') }}>
          <Image source={require('../assets/posting.png')} style={{ height: 30, width: 30 }} />
        </TouchableOpacity>
      </View>
      {posts.map((item, index) => (
        <View key={index} style={styles.postContainer}>
         {/* {item.image && (
          <Image source={item.image} style={styles.image} resizeMode='contain' />
        )} */}
        <View style={styles.textContainer}>
          <View style={{ flexDirection:'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.category}>{item.category}</Text>
          </View>
          <Text style={styles.date}>{formatDate(item.time)}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
            <View style={{ width: '70%', }}>
              <Text numberOfLines={2} style={styles.description}>{item.description}</Text>
            </View>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', width: '30%', paddingHorizontal: 10 }}>
             <TouchableOpacity onPress={()=>navigate(item)}> 
              <Image source={require('../assets/editing.png')} style={{ height: 32, width: 32 }} />
             </TouchableOpacity>
             <TouchableOpacity onPress={()=>{deletePost(item.key)}}>
              <Image source={require('../assets/delete.png')} style={{ height: 32, width: 32 }} />
             </TouchableOpacity>
            </View>
          </View>
        </View>
       
      </View>
      ))}
      </SafeAreaView>
    </ScrollView>
  );
}

export default ManagePosts;

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
    height:'20%',
    width:'100%',
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
});
