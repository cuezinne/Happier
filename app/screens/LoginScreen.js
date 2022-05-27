import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, BackHandler } from 'react-native';

import colors from '../config/colors';
function LoginScreen({ navigation }) {

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
    

    return (
        <View style={styles.background}>
            <View style={styles.infoContainer}>
                
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>place holder for logo</Text>
                </View>
                
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => navigation.navigate("Welcome Screen")}
                >
                    <Text style={styles.loginText}>Login With Google</Text>
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
    infoContainer: {
        bottom: 200,
        alignItems: "center"
    },
    // textInputStyle: {
    //     backgroundColor: "white",
    //     height: 70,
    //     width: "80%",
    //     borderRadius: 25,
    //     bottom: "30%",
    //     textAlign: "center",
    //     fontSize:20,
    // },
    logoContainer: {
        width: '80%',
        height: 140,
        backgroundColor: colors.white,
        bottom: "50%",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center"
    },
    // logoText: {
    //     fontSize: 30,
    // },
    loginButton: {
        width: '80%',
        height: 70,
        backgroundColor: colors.black,
        margin: 5,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    loginText: {
        fontSize: 30,
        color: colors.white,
    },
})

export default LoginScreen;