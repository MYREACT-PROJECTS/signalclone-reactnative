import React,{useState,useLayoutEffect,useEffect} from 'react'
import { SafeAreaView } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import CustomListitem from '../components/CustomListitem'
import { StatusBar } from 'expo-status-bar';
import { ServerContainer } from '@react-navigation/native';
import { KeyboardAvoidingView } from 'react-native'
import { Button, Input,Image,Text, Avatar} from 'react-native-elements';
import {auth,db} from '../firebase';
import { firebase } from '../firebase'
import { Touchable } from 'react-native'
import {AntDesign,SimpleLineIcons} from "@expo/vector-icons"


export default function HomeScreen ({navigation}) {
    const [chat,setChat]=useState([]);
      
      const signOutUser = ()=>{
       
        auth.signOut().then(()=>{
            navigation.replace("Login")
        })

      }
     
        useEffect(() => {
            console.log(auth)
           const unsubscribe = db.collection("chats").onSnapshot(snapshot => (
               setChat(snapshot.docs.map(doc => ({
                   id:doc.id,
                   data:doc.data()
               }))
               )
           ))
           return unsubscribe
        }, [])


    useLayoutEffect(() => {
        navigation.setOptions({   
       
          title:"Signal",
          headerStyle :{backgroundColor:"#fff"},
          headerTitleStyle:{color : "black"},
          headerTinColor:"black",
          headerLeft:()=>(<View style={{marginLeft:20}}>
              <TouchableOpacity activeOpacity={0.5}
               onPress={signOutUser}
                >
              <Avatar
              rounded
              source= {auth.currentUser?.photoURL}/>
              </TouchableOpacity>
          </View>
          ),

          headerRight:()=>(     
              <View
              style={{
                  flexDirection:"row",
                  justifyContent :"space-between",
                  width:80,
                  marginRight:20,
              }}
              
              >
                  <TouchableOpacity activeOpacity={0.5}>
                  <AntDesign name="camerao" size ={24} color ="black"/>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.5}
                  onPress={()=>navigation.navigate("AddChat")}>
                  <SimpleLineIcons name ="pencil" size = {24} color="black"/>
                  </TouchableOpacity>


              </View>

          )
          
      })

   }, [navigation]) 

   const enterChat = (id,chatName)=>{

    navigation.navigate("Chat",{
        id,
        chatName
    });
   }

    return (

        <SafeAreaView>
          <ScrollView>
              {
                  chat.map(({id,data:{chatName}}) =>(

                    <CustomListitem
                    key={id}
                    id={id}
                    chatName={chatName}
                    enterChat={enterChat}
                    />

                  ))}

              

          </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        height:"100%"
    }
})
