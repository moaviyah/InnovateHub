import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Dimensions, StyleSheet, Alert, Image } from 'react-native';

// Importing colors from custom color file
import { PRIMARY, SECONDARY } from '../colors';
import { getAuth, signInAnonymously } from 'firebase/auth';

// Getting device dimensions
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

// Onboarding screen component
const OnBoardingScreen3 = ({ navigation }) => {
    const auth = getAuth()
    const signIn = async () => {
        try {
            await signInAnonymously(auth);
            // Navigate to the next screen or perform any other actions
        } catch (error) {
            Alert.alert('Error signing in anonymously:', error.message);
        }
    }
    return (
        <View style={{ flex: 1 }}>
            {/* Background circles */}
            <ImageBackground
                style={{
                    backgroundColor: PRIMARY,
                    height: 400,
                    width: 400,
                    alignSelf: 'flex-end',
                    borderRadius: 250,
                    position: 'absolute',
                    left: windowWidth * 0.83,
                    marginTop: 50
                }}
            />
           <Image 
            source={require('../assets/bubble1.png')}
                style={{       
                    height: windowHeight*0.45, 
                    width: windowWidth*0.13, 
                    position: 'absolute', 
                    marginTop: windowHeight * 0.5
                }} 
            />

            {/* Logo */}
            <ImageBackground
                source={require('../assets/logo.png')}
                style={{
                    height: 70,
                    width: 70,
                    alignSelf: 'center',
                    marginTop: windowHeight * 0.05
                }}
            />

            {/* Image */}
            <ImageBackground
                source={require('../assets/1.png')}
                style={{
                    height: windowHeight * 0.35,
                    width: windowWidth * 0.6,
                    alignSelf: 'center',
                    position: 'absolute',
                    top: windowHeight * 0.2
                }}
            />

            {/* Title */}
            <View style={{ width: windowWidth, justifyContent: 'center' }}>
                <Text style={{
                    color: 'black',
                    fontWeight: '700',
                    fontSize: 18,
                    alignSelf: 'center',
                    position: 'absolute',
                    top: windowHeight * 0.43
                }}>
                    PRESENT YOUR DREAM
                </Text>
            </View>

            {/* Description */}
            <View style={{ width: windowWidth * 0.8, justifyContent: 'center', alignSelf: 'center' }}>
                <Text style={{
                    color: 'black',
                    fontWeight: '300',
                    fontSize: 16,
                    alignSelf: 'center',
                    position: 'absolute',
                    top: windowHeight * 0.47,
                    textAlign: 'center',
                    fontVariant: 'Urbanist'
                }}>
                    Now your dream will soon come true, do the best presentation according to what has been planned.
                </Text>
            </View>

            {/* Start button */}
            <TouchableOpacity
                onPress={() => signIn()}
                style={{
                    backgroundColor: PRIMARY,
                    height: 50,
                    position: 'absolute',
                    width: windowWidth * 0.25,
                    alignSelf: 'flex-end',
                    top: windowHeight * 0.85,
                    borderBottomLeftRadius: 50,
                    borderTopLeftRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text style={{ fontWeight: '600', color: SECONDARY, fontSize: 16 }}>
                    Start
                </Text>
            </TouchableOpacity>

            {/* Skip button
            <TouchableOpacity 
                style={{ 
                    backgroundColor: '#E5ECF6', 
                    height: 50, 
                    position: 'absolute', 
                    width: windowWidth * 0.25, 
                    alignSelf: 'flex-start', 
                    top: windowHeight * 0.85, 
                    borderBottomRightRadius: 50, 
                    borderTopRightRadius: 50, 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                }}
            >
                <Text style={{ fontWeight: '600', color: '#737373', fontSize: 16 }}>
                    Skip
                </Text>
            </TouchableOpacity> */}
        </View>
    );
};

export default OnBoardingScreen3;

const styles = StyleSheet.create({});
