import React  from 'react';

import colors from "../config/colors";
import { View, StyleSheet } from 'react-native';

function MenuScreen() {
    return(
        <View style={styles.background}>
            <View style={styles.menuButtonContainer}>
                <View style={styles.menuButton}></View>
                <View style={styles.menuButton}></View>
                <View style={styles.menuButton}></View>
                <View style={styles.menuButton}></View>
            </View>
        </View>
    );    
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: "flex-start",
    },
    menuButton: {
        width: "70%",
        margin: 10,
        height: 70,
        borderRadius: 40,
        backgroundColor: colors.white,
    },
    menuButtonContainer: {
        alignItems: "center",
        top: "35%"
    },
})

export default MenuScreen;