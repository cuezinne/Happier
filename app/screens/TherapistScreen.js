import React, { useEffect } from 'react'

import colors from "../config/colors"

import { View, StyleSheet, Text, TextInput, Button, BackHandler, FlatList, Linking } from 'react-native'
import { useState } from "react"
import ListItem from '../components/ListItem'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native'
import { FAB, List } from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage'
import { mapLocations } from '../config/mapLocations'


function TherapistScreen({navigation}) {    
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
        
    var day = new Date().getDate()
    var month = new Date().getMonth()
    var year = new Date().getFullYear()
    var currentMonth
    switch (month) {
        case 0:
            currentMonth = "Jan"
            break
        case 1:
            currentMonth = "Feb"
            break
        case 2:
            currentMonth = "Mar"
            break
        case 3:
            currentMonth = "Apr"
            break
        case 4:
            currentMonth = "May"
            break
        case 5:
            currentMonth = "June"
            break
        case 6:
            currentMonth = "July"
            break
        case 7:
            currentMonth = "Aug"
            break
        case 8:
            currentMonth = "Sept"
            break
        case 9:
            currentMonth = "Oct"
            break
        case 10:
            currentMonth = "Nov"
            break
        case 11:
            currentMonth = "Dec"
            break
    }

    const list = mapLocations

    return(
        <View style={styles.background}>
            <View style={styles.topBar}>
    
                <MaterialCommunityIcons name="menu" color={"black"} size={40} style={styles.menuButton} onPress={() => navigation.openDrawer()} />

                <View style={styles.plannerTitle}>
                    <Text style={styles.plannerTitleText}>Health Help Services</Text>
                </View>
                <View style={styles.timeStamp}><Text style={{fontSize: 15}}>{currentMonth} {day}, {year}</Text></View>
            </View>

            <View style={styles.contentArea}>
                <FlatList 
                        data={list}
                        renderItem={({ item }) => (
                            <View>
                                <List.Item
                                    title={item.Name + " \nOccupation: " + item.Occuation}
                                    titleNumberOfLines={2}
                                    description={item.Address}
                                    descriptionNumberOfLines={3}
                                    titleStyle={styles.listTitleStyle}
                                />
                                <Text style={styles.phoneStyle} onPress={()=> Linking.openURL(`tel:${item.Phone}`)}>{item.Phone}</Text>
                            </View>
                        )}
                        keyExtractor={item => JSON.stringify(item.id)}
                    />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    contentArea: {
        flex:90,
        backgroundColor: colors.lightPeach,
    },
    fab:{
        backgroundColor: colors.lightGrey,
        position: "absolute",
        margin: 20,
        alignSelf: "center",
        bottom: 10
    },
    listTitleStyle: {
        fontSize: 14,
        fontWeight: "bold",
    },
    noteText: {
        fontSize: 15,
    },
    menuButton: {
        margin: 15,
        marginTop: 23,
    },
    timeStamp: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    topBar: {
        flex:10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.primary,
    },
    phoneStyle: {
        marginLeft: 16,
        fontStyle: "italic",
        fontSize:14,
        fontWeight:"bold",
        bottom:10,
        width: "40%"
    },  
    plannerTitle: {
        flex:2,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    plannerTitleText: {
        fontSize: 20,
        fontWeight: "bold",
    },
})

export default TherapistScreen;