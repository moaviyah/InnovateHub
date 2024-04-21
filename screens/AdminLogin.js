import { SafeAreaView, StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { PRIMARY, SECONDARY } from '../colors'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Getting device dimensions
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const AdminLogin = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const auth = getAuth()
    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Email and password are required');
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, email, password).then(()=>{
                navigation.navigate('Admin')
            })
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: SECONDARY }}>
            <StatusBar barStyle={'dark-content'} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center', paddingTop: 15, marginBottom: 10 }}>
                {/* Back button */}
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/left-arrow.png')} style={{ height: 24, width: 24 }} />
                </TouchableOpacity>
                {/* Title */}
                <Text style={{ fontWeight: '500', fontSize: 16 }}>Admin Login</Text>

            </View>
            <Image source={require('../assets/logo.png')} style={{ alignSelf: 'center', marginTop: windowHeight * 0.03, height: 60, width: 60 }} />
            <Text style={styles.loadingText}>Innovate Hub</Text>
            <View style={{ marginTop: windowHeight * 0.05 }}>
                <TextInput
                    placeholder='Enter Admin mail'
                    style={styles.input}
                    placeholderTextColor={PRIMARY}
                    value={email}
                    onChangeText={setEmail}
                />
                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: windowHeight * 0.02, borderWidth: 1, borderColor: PRIMARY, marginHorizontal: 20, borderRadius: 10, paddingRight: 20 }}>
                    <TextInput
                        placeholder='Enter Admin Password'
                        style={{ paddingVertical: 20, marginHorizontal: 20,flex:1 }}
                        placeholderTextColor={PRIMARY}
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{}}>
                        <Image source={showPassword ? require('../assets/invisible.png') : require('../assets/eye.png')} style={{ height: 25, width: 25 }} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={{ backgroundColor: PRIMARY, width: '50%', paddingVertical: 20, alignItems: 'center', alignSelf: 'center', borderRadius: 15, marginTop: 30 }}
                    onPress={()=>handleLogin()}
                >
                    <Text style={{ color: SECONDARY, fontSize: 16, fontWeight: '600' }}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default AdminLogin

const styles = StyleSheet.create({
    loadingText: {
        color: PRIMARY,
        fontWeight: '700',
        marginTop: 30,
        fontSize: 20,
        alignSelf: 'center'
    },
    input: {
        borderWidth: 1,
        paddingVertical: 20,
        marginHorizontal: 20,
        marginTop: windowHeight * 0.02,
        borderRadius: 10,
        paddingHorizontal: 20,
        borderColor: PRIMARY
    }
})