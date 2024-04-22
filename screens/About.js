import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';

// Importing colors from custom color file
import { PRIMARY, SECONDARY } from '../colors';

// Getting device dimensions
const windowHeight = Dimensions.get('window').height;

const About = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* About section */}
        <Text style={styles.titleText}>About</Text>
        {/* Button for Privacy Policy */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => { }}
        >
          <Image source={require('../assets/privacy.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
        {/* Button for Terms of Use */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#213768' }]}
          onPress={() => { }}
        >
          <Image source={require('../assets/assignment.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>
            Terms of use
          </Text>
        </TouchableOpacity>
        {/* Button for About Us */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#333948' }]}
          onPress={() => { }}
        >
          <Image source={require('../assets/info.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>
            About Us
          </Text>
        </TouchableOpacity>

        {/* Support section */}
        <Text style={styles.titleText}>Support</Text>
        {/* Button for Chat with us */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#C9644F' }]}
          onPress={() => {navigation.navigate('ChatUser') }}
        >
          <Image source={require('../assets/customer-support.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>
            Chat with us
          </Text>
        </TouchableOpacity>
        {/* Button for Admin Login */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#3F612D' }]}
          onPress={() => {navigation.navigate('AdminLogin') }}
        >
          <Image source={require('../assets/admin.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>
            Are you an Admin? Sign in here.
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default About

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
  button: {
    flexDirection: 'row',
    backgroundColor: PRIMARY,
    height: windowHeight * 0.1,
    marginHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    marginVertical: 7
  },
  buttonText: {
    color: SECONDARY,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 10
  },
  buttonIcon: {
    height: 30,
    width: 30,
    marginLeft: 10
  }
})
