import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, BackHandler } from 'react-native';
import Emoji from 'react-native-emoji';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import colors from '../config/colors';
function HowYouFeelScreen( { navigation, user, change} ) {

    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
            return true;
          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, []),
      );
    //   {route.params.user}
    return(
        <View style={styles.background}>
            <View style={styles.questionAndAnswerContainer}>
                
                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>{user.name}, How Are You Feeling Today?</Text>
                </View>
                
                <View style={styles.answerContainer}>
                    <MaterialCommunityIcons name="emoticon-happy-outline" color={"white"} size={40} style={{margin:15}} onPress={() => {
                            if(change==true){
                                navigation.navigate("Home")
                            }
                            else{
                                navigation.navigate("Bottom Tabs Screen")
                            }
                        }}/>
                    <MaterialCommunityIcons name="emoticon-neutral-outline" color={"white"} size={40} style={{margin:15}} onPress={() => {
                            if(change==true){
                                navigation.navigate("Home")
                            }
                            else{
                                navigation.navigate("Bottom Tabs Screen")
                            }
                        }}/>
                    <MaterialCommunityIcons name="emoticon-sad-outline" color={"white"} size={40} style={{margin:15}} onPress={() => {
                            if(change==true){
                                navigation.navigate("Home")
                            }
                            else{
                                navigation.navigate("Bottom Tabs Screen")
                            }
                        }}/>
                    <MaterialCommunityIcons name="emoticon-angry-outline" color={"white"} size={40} style={{margin:15}} onPress={() => {
                            if(change==true){
                                navigation.navigate("Home")
                            }
                            else{
                                navigation.navigate("Bottom Tabs Screen")
                            }
                        }}/>
                    {/* <View style={styles.sampleAnswer} />
                    <View style={styles.sampleAnswer} />
                    <View style={styles.sampleAnswer} />
                    <View style={styles.sampleAnswer} /> */}
                </View>

                {/* <TouchableOpacity 
                    style={styles.nextButton} 
                    onPress={() => navigation.navigate("Bottom Tabs Screen")} 
                >
                    <Text style={styles.nextText}>Next</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    answerContainer: {
        width: '80%',
        height: 70,
        backgroundColor: colors.lightBlack,
        top: 70,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    background: {
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: "flex-start",
    },
    nextButton: {
        width: '80%',
        height: 70,
        top: 200,
        backgroundColor: colors.lightBlack,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    nextText: {
        fontSize: 30,
        color:colors.white,
    },
    questionAndAnswerContainer: {
        alignItems: "center",
        top: 190,
    },
    questionContainer: {
        width: '80%',
        height: 140,
        backgroundColor: colors.white,
        margin: 5,
        borderRadius: 25,
        justifyContent: "center",
        
    },
    questionText: {
        fontSize: 25,
        padding:15,
        textAlign:"center",
    },
    sampleAnswer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        margin: 7,
        backgroundColor: colors.white,
    },
})

export default HowYouFeelScreen;