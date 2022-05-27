import React from "react";

import { View, Text, StyleSheet } from "react-native";

const MapCard = ({ title, description }) => {
  return (
      <View style={styles.cardView}>
        <Text> {title} </Text>
        <Text> {description} </Text>
      </View>
    );
};

const styles = StyleSheet.create({
  cardText: {
    fontSize: 15,
    flex: 90,
  },
  cardView: {
    flex:1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
  }
});

export default MapCard;
