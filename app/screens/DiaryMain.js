import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { BackHandler, Button, FlatList, StyleSheet, Text, View } from 'react-native'
import { FAB, List } from 'react-native-paper'
import colors from '../config/colors'

export default function DiaryMain({navigation}) {
    
    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
            return true;
          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, []),
    )

    useEffect(() => {
        readNotes()
      }, [notes])
    
    const [notes, setNotes] = useState([])

    var day = new Date().getDate();
    var month = new Date().getMonth();
    var year = new Date().getFullYear();
    var currentMonth;
    switch (month) {
        case 0:
            currentMonth = "Jan";
            break;
        case 1:
            currentMonth = "Feb";
            break;
        case 2:
            currentMonth = "Mar";
            break;
        case 3:
            currentMonth = "Apr";
            break;
        case 4:
            currentMonth = "May";
            break;
        case 5:
            currentMonth = "June";
            break;
        case 6:
            currentMonth = "July";
            break;
        case 7:
            currentMonth = "Aug";
            break;
        case 8:
            currentMonth = "Sept";
            break;
        case 9:
            currentMonth = "Oct";
            break;
        case 10:
            currentMonth = "Nov";
            break;
        case 11:
            currentMonth = "Dec";
            break;
    }

    var time = currentMonth + " " + day + ", " + year

    async function readNotes(){
        //await AsyncStorage.removeItem("notes")
        const notes = await AsyncStorage.getItem("notes")
        if (notes) {
            setNotes(JSON.parse(notes))
        }
    }

    async function addNote(note){
        var notesItemId 
        if(notes.length !== 0){
            notesItemId = notes[notes.length-1].id + 1
        } else{
            notesItemId = 0
        }

        note.id = notesItemId
        const newNotes = [...notes, note]
        await AsyncStorage.setItem("notes", JSON.stringify(newNotes))
        setNotes(newNotes)
    }

    async function updateNote(note, index, id){
        const newNotes = [...notes]
        note.id = id
        newNotes[index] = note
        await AsyncStorage.setItem("notes", JSON.stringify(newNotes))
        setNotes(newNotes)      
    }

    async function deleteItem (itemId){
        const newNotes = notes.filter(c=> c.id !== itemId)
        await AsyncStorage.setItem("notes", JSON.stringify(newNotes))
        setNotes(newNotes)
    }

    // function changeNotesValue( array, value, desc ) {
    //     for (var i in array) {
    //       if (array[i].value == value) {
    //          array[i].desc = desc;
    //          break; //Stop this loop, we found it!
    //       }
    //     }
    //  }

    return (

        <View style={styles.background}>
            <View style={styles.topBar}>

                <MaterialCommunityIcons name="menu" color={"black"} size={40} style={styles.menuButton} onPress={() => navigation.openDrawer()} />

                <View style={styles.diaryTitle}>
                    <Text style={styles.diaryTitleText}>Personal Diary</Text>
                </View>

                <View style={styles.timeStamp}>
                    <Text style={styles.noteText}>{time}</Text>
                </View>
                
            </View>

            <View style={styles.contentArea}>
                <FlatList 
                    data={notes}
                    renderItem={({ item, index }) => (
                        <List.Item
                            title={item.noteTitle+"      "+item.noteTime}
                            description={item.noteDescription}
                            descriptionNumberOfLines={1}
                            titleStyle={styles.listTitleStyle}
                            onPress={() => navigation.navigate("Update Note Screen", {
                                index: index,
                                noteId: item.id,
                                currentTime: item.noteTime,
                                noteName: item.noteTitle,
                                noteText: item.noteDescription,
                                handleChange: updateNote,
                                handleDelete: deleteItem
                            })}
                        />
                    )}
                    keyExtractor={item => JSON.stringify(item.id)}
                />
                <FAB
                    style={styles.fab}
                    small
                    icon="plus"
                    label="Add a Diary Entry"
                    onPress={() => navigation.navigate("Note Screen", {
                        currentTime: time,
                        addNote: addNote,
                        handleDelete: deleteItem
                        
                    })}
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
        backgroundColor: colors.tan,
    },
    diaryTitle: {
        flex:2,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    diaryTitleText: {
        fontSize: 20,
        fontWeight: "bold",
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

})
