import React,{useState,useEffect} from 'react'
import { KeyboardAvoidingView } from 'react-native';
import { ActionSheetIOS } from 'react-native';
import { StatusBar } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input,Image} from 'react-native-elements';
import {auth} from '../firebase';



export default function LoginScreen({navigation}) {
    const[email,setEmail]= useState('');
    const[password,setPassword]=useState('');
    const[input,setInput]=useState('');


    useEffect(() => {

       const unsubscribe = auth.onAuthStateChanged((authUser)=>{
           console.log(authUser)
            if(authUser){
                navigation.replace("Home");
            }
        })
        return unsubscribe;

        
    }, [input])

    const signIn =()=>{
        auth.signInWithEmailAndPassword(email,password)
        .catch((error)=>alert(error));



    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style = "light"/>
            <Image
            source={{ 
                uri:"https://www.politico.com/news-tips/logo-signal.png",
            }}
            style={{width:200,height:200}}
            />
            <View >
                <Input style={styles.inputContainer} placeholder="Email" autoFocus type="email" value={email} 
                onChangeText={text=>setEmail(text)}
                />
                <Input style={styles.inputContainer} placeholder="Password" secureTextEntry type="password"
                value={password} 
                onChangeText={text=>setPassword(text)}
                onSubmitEditing={signIn}
                />

        </View>
        <Button containerStyle={styles.button} title="Login" onPress={signIn}></Button>
        <Button onPress={()=>navigation.navigate('Register')} containerStyle={styles.button}  title="Register" type="outline"></Button>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:"center",
        padding:5,
        backgroundColor:"white",
    },
   inputContainer:{
       width:300,
       padding:10,

   },
   button:{
       width:210,
       marginTop:10,
   }

})
