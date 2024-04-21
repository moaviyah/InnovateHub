import { SafeAreaView, StatusBar, StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { SECONDARY } from '../colors'

/**
 * Component for creating a new blog.
 * 
 * @param {object} navigation - Navigation prop object.
 * @returns {JSX.Element} - Create new blog UI.
 */
const CreateNewBlog = ({ navigation }) => {
    return (
        // SafeAreaView container
        <SafeAreaView style={styles.container}>
            {/* StatusBar */}
            <StatusBar barStyle={'dark-content'} />
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center', paddingTop: 15, marginBottom: 10 }}>
                {/* Back button */}
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/left-arrow.png')} style={{ height: 24, width: 24 }} />
                </TouchableOpacity>
                {/* Title */}
                <Text style={{ fontWeight: '700', fontSize: 18 }}>Create new blog</Text>
                {/* Save button */}
                <TouchableOpacity style={{ backgroundColor: '#4C6FBF', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 10 }} >
                    <Text style={{ color: SECONDARY, fontWeight: '600' }}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
            {/* Blog input fields */}
            <View>
                <TextInput placeholder='Blog Title' style={styles.input} placeholderTextColor={'black'} />
                <TextInput placeholder='Category' placeholderTextColor={'black'} style={styles.input} />
                <TextInput placeholder='Enter blog Description' placeholderTextColor={'black'} style={[styles.input, { paddingBottom: '40%' }]} />
            </View>
        </SafeAreaView>
    )
}

export default CreateNewBlog

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SECONDARY
    },
    topBtn: {
        flexDirection: 'row',
        borderWidth: 1,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 10
    },
    input: {
        borderWidth: 1,
        paddingVertical: 15,
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 10,
        paddingHorizontal: 20
    }
})
