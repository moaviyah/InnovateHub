import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';

// Importing colors from custom color file
import { PRIMARY, SECONDARY } from '../colors';

// Getting device dimensions
const windowHeight = Dimensions.get('window').height;

const Favorites = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Favorite Posts section */}
        <Text style={styles.titleText}>Favorite Posts</Text>
        <View style={styles.postContainer}>
          {/* First Post */}
          <View style={styles.post}>
            <Text style={styles.postTitle}>
              Selling Mindset
            </Text>
            <Text style={styles.postDescription}>
              This post will talk on how much you need selling mindset for your business...
            </Text>
            <View style={styles.postFooter}>
              <Text style={styles.postDate}>
                27 March
              </Text>
              <Image source={require('../assets/heart.png')} style={styles.postIcon} />
            </View>
          </View>
          {/* Second Post */}
          <View style={styles.post}>
            <Text style={styles.postTitle}>
              AI Bubble
            </Text>
            <Text style={styles.postDescription}>
              About current and future AI trends and how to make a career in artificial intelli...
            </Text>
            <View style={styles.postFooter}>
              <Text style={styles.postDate}>
                25 March
              </Text>
              <Image source={require('../assets/heart.png')} style={styles.postIcon} />
            </View>
          </View>
        </View>

        {/* Saved Resources section */}
        <Text style={styles.titleText}>Saved Resources</Text>
        {/* First Saved Resource */}
        <TouchableOpacity style={styles.resourceButton}>
          <Text style={styles.resourceText}>
            A YouTube video explaining dropshipping
          </Text>
          <View style={styles.resourceIcons}>
            <Image source={require('../assets/link.png')} style={styles.resourceIcon} />
            <Text style={styles.resourceLabel}>
              Copy
            </Text>
          </View>
          <View style={styles.resourceIcons}>
            <Image source={require('../assets/bookmark.png')} style={styles.resourceIcon} />
            <Text style={styles.resourceLabel}>
              Unsave
            </Text>
          </View>
        </TouchableOpacity>
        {/* Second Saved Resource */}
        <TouchableOpacity style={styles.resourceButton}>
          <Text style={styles.resourceText}>
            A YouTube video explaining dropshipping
          </Text>
          <View style={styles.resourceIcons}>
            <Image source={require('../assets/downloading.png')} style={styles.resourceIcon} />
            <Text style={styles.resourceLabel}>
              Download
            </Text>
          </View>
          <View style={styles.resourceIcons}>
            <Image source={require('../assets/bookmark.png')} style={styles.resourceIcon} />
            <Text style={styles.resourceLabel}>
              Unsave
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Favorites;

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
    flex: 1,
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
