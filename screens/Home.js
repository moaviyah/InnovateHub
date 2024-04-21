import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, FlatList, Image, Dimensions } from 'react-native';

// Importing colors from custom color file
import { PRIMARY, SECONDARY } from '../colors';

// Getting device dimensions
const windowHeight = Dimensions.get('window').height;

const Home = ({ navigation }) => {

  // Dummy data for FlatList
  const data = [
    {
      title: 'How to start Gym business',
      category: 'Physical',
      imageUrl: require('../assets/card.png'),
    },
    {
      title: 'Books to read in 2024',
      category: 'E-commerce',
      imageUrl: require('../assets/card1.png'),
    },
  ];

  // Rendering each item in FlatList
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {/* Title and category */}
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.categoryContainer}>
            <Image source={require('../assets/categorization.png')} style={styles.categoryIcon} />
            <Text style={styles.category}>{item.category}</Text>
          </View>
        </View>
        {/* Favorite icon */}
        <Image source={require('../assets/favorites-outline.png')} style={styles.favoriteIcon} />
      </View>
      {/* Image */}
      <Image source={item.imageUrl} style={styles.image} resizeMode='contain'/>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Text style={styles.titleText}>Start your entrepreneurial journey</Text>
      {/* FlatList to display items horizontally */}
      <FlatList
        data={data}
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
    width: windowHeight * 0.45,
    height: windowHeight * 0.4,
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
})
