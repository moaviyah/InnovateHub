import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push, onValue, query, orderByKey, set } from 'firebase/database';

const ChatUser = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
    }
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      const db = getDatabase();
      const messagesRef = ref(db, 'messages');
      const messagesQuery = query(messagesRef, orderByKey());
  
      onValue(messagesQuery, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Convert the object of messages to an array
          const messagesArray = Object.values(data).flatMap(conversation => Object.values(conversation));
          setMessages(messagesArray);
        }
      }, {
        cancelCallback: (error) => {
          console.error('Error fetching messages:', error);
        }
      });
    };
  
    fetchMessages();
  }, []);
  

  const sendMessage = () => {
    if (!newMessage) {
      return;
    }

    const db = getDatabase();
    const messagesRef = ref(db, `messages/${userId}`);
    const newMessageRef = push(messagesRef);
    const newMessageKey = newMessageRef.key;

    const messageData = {
      userId: userId,
      message: newMessage,
      timestamp: Date.now(),
    };

    setNewMessage('');

    // Save message to Firebase Realtime Database
    set(newMessageRef, messageData)
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  };

  const renderItem = ({ item }) => (
    <View style={[styles.message, { marginHorizontal:10,alignSelf: item.userId === userId ? 'flex-end' : 'flex-start', backgroundColor: item.userId === userId ? 'green':'white' }]}>
      <Text style={{ color: item.userId === userId ? '#fff' : '#000', fontSize:16 }}>{item.message}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
          <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image source={require('../assets/left-arrow.png')} style={styles.icon} />
              </TouchableOpacity>
              <Text style={styles.title}>Support</Text>
              <TouchableOpacity>
                  <Image source={require('../assets/posting.png')} style={[styles.icon, { opacity: 0 }]} />
              </TouchableOpacity>
          </View>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        inverted
      />
      <KeyboardAvoidingView
        style={styles.inputContainer}
        behavior="padding"
        keyboardVerticalOffset={Platform.select({ ios: 0, android: -30 })}
      >
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0', // Change the background color as needed
  },
  message: {
    maxWidth: '80%',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#007bff', // Your message bubble color
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: '#ccc',
    paddingTop: 10,
    paddingHorizontal: 20,
    marginBottom: 10
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginRight: 10,
    backgroundColor: '#fff', // Input field background color
  },
  sendButton: {
    backgroundColor: '#007bff', // Send button color
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
    paddingTop: 15,
    marginBottom: 10,
    borderBottomWidth:1,
    borderBottomColor:'#CCC',
    paddingBottom:15
},
icon: {
    height: 24,
    width: 24,
},
title: {
    fontWeight: '700',
    fontSize: 18,
},
});
