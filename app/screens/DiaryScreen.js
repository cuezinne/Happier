import React, { useState } from 'react';

import colors from "../config/colors";
import { View, StyleSheet, Text, Button } from 'react-native';
import { FAB, TextInput } from 'react-native-paper';

function DiaryScreen({ route, navigation }) {

    const { currentTime } = route.params
    // {currentMonth} {day}, {year}

    const [noteTime, setNoteTime] = useState(() => currentTime)
    const [noteTitle, setNoteTitle] = useState("")
    const [noteDescription, setNoteDescription] = useState("")
    
    function onSaveNote(){
        route.params.addNote({ noteTime, noteTitle, noteDescription })
        navigation.goBack()
    }

    return(
        <View style={styles.background}>
            <View style={styles.topBar}>
                <View style={styles.buttonContainer}>
                    <FAB 
                        style={styles.backButton}
                        small
                        icon="arrow-left"
                        onPress={onSaveNote}
                    />
                    <FAB 
                        style={styles.deleteButton}
                        small
                        icon="close"
                        onPress={() => {
                            navigation.goBack()
                        }}
                    />
                </View>
                <View style={styles.diaryTitle}>
                    <Text style={styles.diaryTitleText}>Personal Diary</Text>
                </View>
                <View style={styles.timeStamp}>
                    <Text style={{fontSize: 15}}>{currentTime}</Text>
                    </View>
            </View>

            <View style={styles.contentArea}>
                <TextInput
                    label="Enter an Entry Title"
                    value={noteTitle}
                    mode="outlined"
                    onChangeText={setNoteTitle}
                    style={styles.noteTitleText}
                />

                <TextInput 

                    label="Write About Your Day"
                    value={noteDescription}
                    onChangeText={setNoteDescription}
                    mode="flat"
                    multiline={true}
                    style={styles.noteText}
                    scrollEnabled={true}
                    returnKeyLabel="done"
                    blurOnSubmit={true}

                    //onChangeText={setNoteDescription}
                >

                </TextInput>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    buttonContainer:{
        flex:1,
        flexDirection:"row"
    },
    contentArea: {
        flex:90,
        backgroundColor: colors.tan,
    },
    deleteButton: {
        flex:1,
        top:5,
        height:"50%",
        alignItems: "center",
        justifyContent:"center",
        left: 10,
        margin: 5,
        backgroundColor: colors.deepPurple,
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
    noteText: {
        fontSize: 15,
        margin:10,
        height: 500,
    },
    noteTitleText: {
        fontSize: 25,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 15,
    },
    backButton: {
        flex:1,
        top:5,
        height:"50%",
        alignItems: "center",
        justifyContent:"center",
        left: 10,
        margin: 5,
        backgroundColor: colors.lightGreen,
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

export default DiaryScreen;