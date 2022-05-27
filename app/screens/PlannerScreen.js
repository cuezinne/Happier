import React, { useEffect } from 'react'

import colors from "../config/colors"
import { View, StyleSheet, Text, TextInput, Button, BackHandler, FlatList } from 'react-native'
import { useState } from "react"
import ListItem from '../components/ListItem'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native'
import { FAB, List } from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage'


function PlannerScreen({navigation}) {
    
    const [list, updateList] = useState([{
        id: 0,
        description:""
    }])
    
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

    useEffect(() => {
        readList()
      }, [])

    async function readList(){
        //await AsyncStorage.removeItem("list")
        const list = await AsyncStorage.getItem("list")
        if ( list !== null) {
            if (JSON.parse(list).length !== 0){
                updateList(JSON.parse(list))
            }
        }
    }

    const addItem = () => {
        var listItemId 
        
        if(list.length !== 0){
            listItemId = list[list.length-1].id + 1
        } else{
            listItemId = 0
        }
        updateList([...list, {
            id: listItemId,
            description:""
        }])
    }

    async function handleChangeText (desc, index){
        const newList = [...list]
        newList[index].description = desc
        await AsyncStorage.setItem("list", JSON.stringify(newList))
        const alist = await AsyncStorage.getItem("list")
        updateList(newList)
    }

    async function deleteItem (itemId){
        const newList = list.filter(c=> c.id !== itemId)
        await AsyncStorage.setItem("list", JSON.stringify(newList))
        updateList(newList)
    }

    return(
        <View style={styles.background}>
            <View style={styles.topBar}>
    
                <MaterialCommunityIcons name="menu" color={"black"} size={40} style={styles.menuButton} onPress={() => navigation.openDrawer()} />

                <View style={styles.plannerTitle}>
                    <Text style={styles.plannerTitleText}>Personal Planner</Text>
                </View>
                <View style={styles.timeStamp}><Text style={{fontSize: 15}}>{currentMonth} {day}, {year}</Text></View>
            </View>

            <View style={styles.contentArea}>

                <FlatList 
                    data={list}
                    renderItem={({ item, index }) => (
                        <ListItem 
                            index={index}
                            id={item.id}
                            desc={item.description}
                            changeText={handleChangeText}
                            onDelete={deleteItem}
                        />
                    )}
                    keyExtractor={item => JSON.stringify(item.id)}
                />

                {/* {list.map((item, index) => (
                    <ListItem 
                        key={item.id} 
                        index={index}
                        id={item.id}
                        desc={item.description}
                        changeText={handleChangeText}
                        onDelete={deleteItem}
                    />
                ))} */}
                <FAB 
                    onPress={addItem} 
                    style={styles.fab}
                    small
                    icon="plus"
                    label="Add a Reminder"
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
        backgroundColor: colors.peach,
    },
    fab:{
        backgroundColor: colors.lightGrey,
        position: "absolute",
        margin: 20,
        alignSelf: "center",
        bottom: 10
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

export default PlannerScreen;