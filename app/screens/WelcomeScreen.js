import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, BackHandler } from 'react-native';

import colors from '../config/colors';
function WelcomeScreen({ navigation, name, onSetName, onSetUser, change }) {

    // useFocusEffect(
    //     React.useCallback(() => {
    //       const onBackPress = () => {
    //         return true;
    //       };
    
    //       BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
    //       return () =>
    //         BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    //     }, []),
    // );

    return (
        <View style={styles.background}>
            <View style={styles.buttonContainer}>
                
                <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>What is your name?</Text>
                </View>
                
                <TextInput 
                    style={styles.textInputStyle}
                    placeholder="Enter Your Name"
                    value={name}
                    onChangeText={onSetName}
                    autoCapitalize="words"
                />

                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => {
                        onSetUser()
                        if (change==true)
                        {
                            navigation.navigate("Home")
                        }
                    }}
                >
                    <Text style={styles.nexText}>Next</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: "flex-end"
    },
    buttonContainer: {
        bottom: 110,
        alignItems: "center"
    },
    textInputStyle: {
        backgroundColor: "white",
        height: 70,
        width: "80%",
        borderRadius: 25,
        bottom: "30%",
        textAlign: "center",
        fontSize:20,
    },
    nameContainer: {
        width: '80%',
        height: 140,
        backgroundColor: colors.white,
        bottom: "50%",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center"
    },
    nameText: {
        fontSize: 30,
    },
    nextButton: {
        width: '80%',
        height: 70,
        backgroundColor: colors.lightBlack,
        margin: 5,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    nexText: {
        fontSize: 30,
        color: colors.white,
    },
})

export default WelcomeScreen;