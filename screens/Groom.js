import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';

// Importing colors from custom color file
import { PRIMARY, SECONDARY } from '../colors';

// Getting device dimensions
const windowHeight = Dimensions.get('window').height;

const Groom = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'}/>
      <ScrollView>
        {/* Resources section */}
        <Text style={styles.titleText}>Resources</Text>
        {/* Button for helpful links */}
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {navigation.navigate('Links')}}
        >
          <Text style={styles.buttonText}>
            Helpful links for your entrepreneurial journey
          </Text>
          <Image source={require('../assets/right-arrow.png')} style={styles.buttonIcon} />
        </TouchableOpacity>
        {/* Button for books */}
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#8F8389' }]}
          onPress={() => {navigation.navigate('Books')}}
        >
          <Text style={styles.buttonText}>
            Books are always your best friends
          </Text>
          <Image source={require('../assets/right-arrow.png')} style={styles.buttonIcon} />
        </TouchableOpacity>
        {/* Button for useful files/documents */}
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#4B5842' }]}
          onPress={() => {navigation.navigate('Docs')}}
        >
          <Text style={styles.buttonText}>
            Useful files/documents
          </Text>
          <Image source={require('../assets/right-arrow.png')} style={styles.buttonIcon} />
        </TouchableOpacity>
        
        {/* Self-improvement section */}
        <Text style={styles.titleText}>Self-improvement</Text>
        {/* Button for time management */}
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {navigation.navigate('Time')}}
        >
          <Text style={styles.buttonText}>
            Time Management
          </Text>
          <Image source={require('../assets/right-arrow.png')} style={styles.buttonIcon} />
        </TouchableOpacity>
        {/* Button for improving sleep/productivity */}
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#ED7D3A' }]}
          onPress={() => {navigation.navigate('Sleep')}}
        >
          <Text style={styles.buttonText}>
            Improve your Sleep/productivity
          </Text>
          <Image source={require('../assets/right-arrow.png')} style={styles.buttonIcon} />
        </TouchableOpacity>
        {/* Button for mental health */}
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#4E6E58' }]}
          onPress={() => {navigation.navigate('Mental')}}
        >
          <Text style={styles.buttonText}>
            Mental Health
          </Text>
          <Image source={require('../assets/right-arrow.png')} style={styles.buttonIcon} />
        </TouchableOpacity>
        {/* Button for success stories */}
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#33312E' }]}
          onPress={() => {navigation.navigate('Success')}}
        >
          <Text style={styles.buttonText}>
            Success Stories
          </Text>
          <Image source={require('../assets/right-arrow.png')} style={styles.buttonIcon} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Groom

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
  button: {
    flexDirection: 'row',
    backgroundColor: PRIMARY,
    height: windowHeight * 0.1,
    marginHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 7
  },
  buttonText: {
    color: SECONDARY,
    fontSize: 12,
    fontWeight: '600'
  },
  buttonIcon: {
    height: 24,
    width: 24
  }
})
