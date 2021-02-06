import React,{useState,useLayoutEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Input,Image} from 'react-native-elements';
import { db } from '../firebase';


export default function AddChatScreen({navigation}) {
    const [input, setInput]= useState("")
    useLayoutEffect(() => {
        navigation.setOptions({
            title:"CHAT",
            headerBackTitle:"Chats"
        })
        
    }, [navigation])
    const createChat = async()=>{
        await db.collection('chats')
        .add({
            chatName:input
        })
        .then(()=>{
            navigation.goBack();
        })
        .catch((error)=> alert(error))

    }
    return (
        <View style={styles.container}>
            <Input
            placeholder="Enter The Name Of Chat"
            value={input}
            onChangeText={(text)=>setInput(text)}
            onSubmitEditing={createChat}
            leftIcon={
                <Icon name="wechat" type ="antdesgin" size={24} color ="black"/>

            }

            />
            <Button disabled={!input} onPress={createChat} title ="Create New Chat" />
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        padding:"30",
        height:"100",
    }
})
