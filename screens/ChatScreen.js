import React,{useLayoutEffect,useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import {AntDesign,FontAwesome,Ionicons} from "@expo/vector-icons"
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import { Keyboard } from 'react-native'
import { auth, db } from '../firebase'
import firebase from 'firebase'



export default function ChatScreen({navigation,route}) {

    const[input,setInput]=useState("")
    const[messages,setMessages]=useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title:"CHAT",
            headerBackTitleVisible:false,
            headerTitleAlign:"left",
            headerTitle: ()=>(
                <View
                style={{
                    flexDirection:"row",
                    alignItems:"center",
                }}
                >

                     <Avatar
                     rounded
                     source={{
                         uri: messages[0]?.data.photURL ||
                         "https//:www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png"
                     }}
                     />

                     <Text 
                     style={{
                        color:"white",
                        marginLeft: 10,
                        fintWeight:"700"
                    }}

                     >{route.params.chatName}</Text>


                </View>
               
                 
            ),
            headerLeft: ()=>( 
                <TouchableOpacity
                style={{marginLeft:10}}
                onPress={navigation.goBack}
                >
               <AntDesign name ="arrowleft" size ={24} color="white"/>
                </TouchableOpacity>
            ),
            headerRight:()=>(
                <View
                style={{
                    flexDirection:"row",
                    justifyContent:" space-between",
                    width:80,
                    marginRight:20,

                }}
                >
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white"/>
                    </TouchableOpacity>


                </View>
            ),

        })
        
    }, [navigation,messages])

    const sendMessage =()=>{
        Keyboard.dismiss();
         db.collection("chats").doc(route.params.id).collection("messages").add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            dispalyName:auth.currentUser.displayName,
            email:auth.currentUser.email,
            photURL:auth.currentUser.photoURL,

        })

        setInput('')
    }

    useLayoutEffect(() => {
        const unsubscribe = db.collection("chats").doc(route.params.id).collection("messages").orderBy("timestamp","desc")
        .onSnapshot(snapshot => setMessages(
            snapshot.docs.map(doc =>({
                id:doc.id,
                data:doc.data(),
            }))
        ))
        return unsubscribe
        
    }, [route])

    return (
        <SafeAreaView
        style={{flex:1,backgroundColor:"white"}}>
            <StatusBar style="light"/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <KeyboardAvoidingView  
            behavior={Platform.OS==="ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={90}
            >
                <ScrollView contentContainerStyle={{paddingTop:15}}>
                    {messages.map(({id,data})=>
                        data.email===auth.currentUser.email 
                        ?( <View key ={id} style={styles.reciever}>
                            <Avatar
                         position="absolute"
                            
                            //Web
                            containerStyle={{ 
                            position:"absolute",
                            bottom:-15,
                            right:-5
                        }}

                            bottom={-15}
                            right={-5}
                            rounded 
                            size={30}
                            source={{
                                uri:data.photURL,
                            }} 
                       

                            />
                            <Text
                            style={styles.recieverText}
                            >
                                {data.message}
                            </Text>

                        </View> 

                        ) : (

                            <View key ={id}style={styles.sender}>
                            <Avatar
                             position="absolute"
                            
                             //Web
                             containerStyle={{ 
                             position:"absolute",
                             bottom:-15,
                             left:-5
                         }}
 
                             bottom={-15}
                             left={-5}
                             rounded 
                             size={30}
                             source={{
                                 uri:data.photURL,
                             }} 
                        
                            

                            />
                            <Text style={styles.senderText}>{data.message}</Text>
                            <Text style={styles.senderName}>{data.dispalyName}</Text>



                            </View>
                        ))}

                </ScrollView>
                <View
                style={styles.footer}>
                    <TextInput
                    placeholder="signal Message"
                    style={styles.TextInput}
                    value={input}
                    onChangeText={(text) => setInput(text)}
                    onSubmitEditing={sendMessage}
                    />
                    <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={sendMessage}
                    >
                        <Ionicons name="send" size={24} color ="#2B68E6"/>


                    </TouchableOpacity>

                
                </View>

            </KeyboardAvoidingView>
            </TouchableWithoutFeedback>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,


    },
    footer:{
        flexDirection:"row",
        alignItems:"center",
        width:"100%",
        padding : 15,


    },
    reciever :{
        padding:15,
        backgroundColor:"#ECECEC",
        alignSelf:"flex-end",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative",
    },
    sender:{
        padding:15,
        backgroundColor:"#2b68e6",
        alignSelf:"flex-start",
        borderRadius:20,
        margin:15,
        maxWidth:"80%",
        position:"relative",



    },
    senderName :{
        left:10,
        paddingRight:10,
        fontSize:10,
        color:"white"

              
    },
    TextInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        borderColor:"white",
        backgroundColor:"#EcEcEc",
        borderWidth:1,
        padding:10,
        color:"grey",
        borderRadius:30,

    }
})
