import React, { useState } from 'react';

import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { FAB, TextInput } from 'react-native-paper';
import colors from '../config/colors';

const ListItem = ({ desc, onDelete, id, index, changeText }) => {

    const [text, onChangeText] = useState(() => desc)

    const onTextChange = (text) =>{
        onChangeText(text)
        changeText(text, index)
    }

    return (
        <View style={styles.listView}>
            <TextInput
                multiline={true}
                style={styles.listText}
                placeholder="What do you want to do?"
                mode="flat"
                value={text}
                onChangeText={(text) => onTextChange(text)}
                returnKeyLabel="done"
                blurOnSubmit={true}
            />
            <FAB
                style={styles.deleteButton}
                onPress={() => onDelete(id)}
                small
                icon="minus"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    deleteButton: {
        backgroundColor: colors.deepPurple,
        flex:10,
        margin: 3,
        height:40,
        alignItems:"center",
        justifyContent:"center"
    },
    listText: {
        fontSize: 15,
        backgroundColor: colors.tan,
        flex: 90,
    },
    listView: {
        backgroundColor:colors.tan,
        borderRadius:10,
        marginLeft:5,
        marginRight:5,
        marginTop: 5,
        flexDirection: "row",
    },
})

export default ListItem;