import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';

// Importing colors from custom color file
import { PRIMARY, SECONDARY } from '../colors';

// Getting device dimensions
const windowHeight = Dimensions.get('window').height;

const Home = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch post data from Firebase Realtime Database
    const fetchPosts = () => {
      const db = getDatabase();
      const postsRef = ref(db, 'posts');
      onValue(postsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Convert the object of posts to an array
          const postsArray = Object.values(data);
          setPosts(postsArray);
        }
      }, {
        cancelCallback: (error) => {
          console.error('Error fetching posts:', error);
        }
      });
    };

    fetchPosts();
  }, []);

  const navigate =(postData)=>{
  navigation.navigate('PostDetail', {postData})
  }

  // Rendering each item in FlatList
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={()=>navigate(item)}>
      {/* Title and category */}
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.title}>{item?.title}</Text>
          <View style={styles.categoryContainer}>
            <Image source={require('../assets/categorization.png')} style={styles.categoryIcon} />
            <Text style={styles.category}>{item?.category}</Text>
          </View>
        </View>
        {/* Favorite icon */}
        <Image source={require('../assets/favorites-outline.png')} style={styles.favoriteIcon} />
      </View>
      {/* Image */}
      <Image source={{ uri: item.media[0].uri }} style={styles.image} resizeMode='cover'/>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Text style={styles.titleText}>Start your entrepreneurial journey</Text>
      {/* FlatList to display items horizontally */}
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SECONDARY
  },
  titleText: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 20,
    marginTop: 20
  },
  itemContainer: {
    marginLeft: 20,
    backgroundColor: PRIMARY,
    height: windowHeight * 0.5,
    borderRadius: 25,
    marginVertical: 20
  },
  textContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  image: {
    width: windowHeight*0.4,
    height:windowHeight*0.4,
    borderRadius: 10,
  },
  title: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: '500',
    color: SECONDARY
  },
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 7,
    alignItems: 'center'
  },
  categoryIcon: {
    height: 24,
    width: 24,
    marginRight: 3
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
    color: SECONDARY
  },
  favoriteIcon: {
    height: 32,
    width: 32,
    marginLeft: 15
  },
});
