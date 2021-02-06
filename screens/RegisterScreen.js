import { ServerContainer } from '@react-navigation/native';
import React,{useState,useLayoutEffect} from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { StatusBar } from 'react-native';
import { Button, Input,Image,Text} from 'react-native-elements';
import {auth} from '../firebase';
import { firebase } from '../firebase'




export default function RegisterScreen({navigation}) {
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [imageURL,setImageURL]=useState();
   

    useLayoutEffect(() => {

        navigation.setOptions({
            headerBackTitle:"Back to Login Screen"
        })
       
    }, [navigation])

    const register =()=>{

        auth.createUserWithEmailAndPassword(email,password)
        .then(authUser =>{
            authUser.user.updateProfile({
                displayName:name,
                photoURL: imageURL,
            })
        })
        .catch((error)=> alert(error.message))

    
    }



    
      




    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light"/>
            <Text h3 style = {{marginBottom:50}}>Creat SINGLE ACCOUNT </Text>
            <View style={styles.inputContainer}>
                <Input
                 placeholder="FULL NAME" 
                 autoFocus 
                 type="text" 
                 vlaue={name} 
                 onChangeText={(text)=>setName(text)}
                />
                <Input 
                placeholder="Email" 
                type="email" 
                vlaue={email} 
                onChangeText={(text)=>setEmail(text)} 
                />
                 <Input 
                placeholder="Password" 
                type="password" 
                secureTextEntry
                vlaue={password} 
                onChangeText={(text)=>setPassword(text)} 
                />
                 <Input 
                placeholder="image of you " 
                type="text" 
                vlaue={imageURL} 
                onChangeText={(text)=>setImageURL(text)}
                onSubmitEditing={register}
                />
            </View>
            <Button
            containerStyle={styles.button}
            raised
            title="Register"
            onPress={register}

            />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:"center",
        padding:40,
        backgroundColor:"white",


    },
    button:{
        width:100,
        marginTop:10,
    },
    inputContainer:{
        width:300,

    }

})
