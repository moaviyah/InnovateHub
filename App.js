import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PRIMARY, SECONDARY } from './colors';
import OnBoardingScreen1 from './screens/OnBoardingScreen1';
import OnBoardingScreen2 from './screens/OnBoardingScreen2';
import OnBoardingScreen3 from './screens/OnBoardingScreen3';
import Navigator from './screens/Navigator';
import ManagePosts from './screens/ManagePosts';
import Admin from './screens/Admin';
import CreateNewPost from './screens/CreateNewPost';
import Resources from './screens/Resources';
import ManageBlogs from './screens/ManageBlogs';
import CreateNewBlog from './screens/CreateNewBlog';
import Chats from './screens/Chats';
import { app } from './config'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence } from 'firebase/auth/react-native'
import {  onAuthStateChanged, initializeAuth } from 'firebase/auth';
import AdminLogin from './screens/AdminLogin';
import EditPost from './screens/EditPost';
import CreateNewResource from './screens/CreateNewResource';
import EditResource from './screens/EditResource';
import EditBlog from './screens/EditBlog';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [initialRoute, setInitialRoute] = useState('Navigator')
  useEffect(() => {
    SplashScreen();
  }, []);

  const SplashScreen = () => {
    setTimeout(() => {
      const auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
      });
      onAuthStateChanged(auth, (user) => {
        if(auth?.currentUser?.email === 'maviyaakram6@gmail.com'){
          setInitialRoute('Admin')
        }
        setUser(user);
        setLoading(false);
      });
    }, 2000);
  }

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('./assets/logo.png')} />
          </View>
          <Text style={styles.loadingText}>Innovate Hub</Text>
        </View>
      ) : (
        <NavigationContainer independent={true}>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
            {user
              ?
              (
                <>
                  <Stack.Screen name='Navigator' component={Navigator} />
                  <Stack.Screen name='Admin' component={Admin} />
                  <Stack.Screen name='ManagePosts' component={ManagePosts} />
                  <Stack.Screen name='CreateNewPost' component={CreateNewPost} />
                  <Stack.Screen name='Resources' component={Resources} />
                  <Stack.Screen name='ManageBlogs' component={ManageBlogs} />
                  <Stack.Screen name='CreateNewBlog' component={CreateNewBlog} />
                  <Stack.Screen name='Chats' component={Chats} />
                  <Stack.Screen name='AdminLogin' component={AdminLogin}/>
                  <Stack.Screen name='EditPost' component={EditPost}/>
                  <Stack.Screen name='CreateNewResource' component={CreateNewResource}/>
                  <Stack.Screen name='EditResource' component={EditResource}/>
                  <Stack.Screen name='EditBlog' component={EditBlog}/>
                </>
              )
              :
              (
                <>
                  <Stack.Screen name='Onboarding1' component={OnBoardingScreen1} />
                  <Stack.Screen name='Onboarding2' component={OnBoardingScreen2} />
                  <Stack.Screen name='Onboarding3' component={OnBoardingScreen3} />
                </>
              )
            }

          </Stack.Navigator>
        </NavigationContainer>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    height: '100%',
    alignItems: 'center',
    backgroundColor: PRIMARY,
  },
  logoContainer: {
    padding: 30,
    backgroundColor: SECONDARY,
    borderRadius: 20,
    marginTop: 150,
  },
  logo: {
    height: 60,
    width: 60,
  },
  loadingText: {
    color: SECONDARY,
    fontWeight: '700',
    marginTop: 30,
    fontSize: 16,
  },
});
