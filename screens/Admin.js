import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, StatusBar, Dimensions, Alert } from 'react-native'
import React from 'react'
import { SECONDARY } from '../colors'
import { getAuth, signInAnonymously, signOut } from 'firebase/auth';

// Getting device dimensions
const windowHeight = Dimensions.get('window').height;

// Admin screen component
const Admin = ({ navigation }) => {
    const auth = getAuth()
    const logOut = () => {
        signOut(auth)
          .then(() => {
            // Sign out successful
            Alert.alert('Signed Out');
            signInAnonymously(auth)
              .then(() => {
                console.log('User signed in anonymously');
                navigation.navigate('Navigator');
              })
              .catch(error => {
                console.error('Error signing in anonymously:', error.message);
              });
          })
          .catch(error => {
            // An error occurred while signing out
            console.error('Error signing out:', error.message);
          });
      };
    return (
        // SafeAreaView container
        <SafeAreaView style={styles.container}>
            {/* StatusBar */}
            <StatusBar barStyle={'dark-content'} />
            {/* Admin title */}
            <Text style={styles.titleText}>Howdy, admin!</Text>
            {/* Manage Posts button */}
            <TouchableOpacity style={[styles.btn, { backgroundColor: '#4C6FBF' }]} onPress={()=>navigation.navigate('ManagePosts')}>
                <Image style={styles.img} source={require('../assets/blog.png')} />
                <Text style={styles.btnText}>
                    Manage Posts
                </Text>
                <Image style={styles.img1} source={require('../assets/setting.png')} />
            </TouchableOpacity>
            {/* Resources button */}
            <TouchableOpacity style={[styles.btn, { backgroundColor: '#181F1C' }]} onPress={()=>navigation.navigate('Resources')}>
                <Image style={styles.img} source={require('../assets/education.png')} />
                <Text style={styles.btnText}>
                    Resources
                </Text>
                <Image style={styles.img1} source={require('../assets/setting.png')} />
            </TouchableOpacity>
            {/* Handle Blogs button */}
            <TouchableOpacity style={[styles.btn, { backgroundColor: '#F78764' }]} onPress={()=>navigation.navigate('ManageBlogs')}>
                <Image style={styles.img} source={require('../assets/computer.png')} />
                <Text style={styles.btnText}>
                    Handle Blogs
                </Text>
                <Image style={styles.img1} source={require('../assets/setting.png')} />
            </TouchableOpacity>
            {/* User Chats button */}
            <TouchableOpacity style={[styles.btn, { backgroundColor: '#4E6E58', }]} onPress={()=>navigation.navigate('Chats')}>
                <Image style={styles.img} source={require('../assets/communications.png')} />
                <Text style={styles.btnText}>
                    User Chats
                </Text>
                {/* The setting icon is invisible */}
                <Image style={[styles.img1, { opacity: 0 }]} source={require('../assets/setting.png')} />
            </TouchableOpacity>

            {/* Sign Out button */}
            <TouchableOpacity
                style={{ backgroundColor: '#FF4365', flexDirection: 'row', alignItems: 'center', borderRadius: 10, position: 'absolute', top: 580, left: 200, paddingHorizontal: 20, paddingVertical: 13 }}
                onPress={()=>logOut()}
            >
                <Image source={require('../assets/logout.png')} style={{ height: 35, width: 35 }} />
                <Text style={{ color: SECONDARY, fontWeight: '700', marginLeft: 5, fontSize: 16 }}>
                    Sign Out
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Admin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SECONDARY
    },
    titleText: {
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 15,
        marginTop: 20
    },
    btn: {
        flexDirection: 'row',
        paddingVertical: 15,
        marginHorizontal: 20,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop: 15,
        borderRadius: 15
    },
    img: {
        height: 32,
        width: 32
    },
    btnText: {
        color: SECONDARY,
        fontWeight: '700',
        fontSize: 16
    },
    img1: {
        height: 24,
        width: 24,
    }
})
