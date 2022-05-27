import React, { useEffect } from "react";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";

import colors from "../config/colors";
import { mapLocations } from "../config/mapLocations";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Button,
  ScrollView, 
  Animated,
  Dimensions,
  BackHandler
} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from "@react-navigation/native";

function MapScreen({navigation}) {

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

  const locations = mapLocations;

  global.CARD_WIDTH = Dimensions.get("window").width * .7;
  global.CARD_MARGIN = Dimensions.get("window").width * .15;

  let mapIndex = 0
  let mapAnimation = new Animated.Value(0)

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / (Dimensions.get("window").width - 1))
      if(index > locations.length){
        index = locations.length - 1
      }
      if(index < 0) {
        index = 0
      }

      clearTimeout(regionTimeout)

      const regionTimeout = setTimeout(() => {
        if( mapIndex !== index ){
          mapIndex = index
          const { coordinate } = locations[index]
          _map.current.animateToRegion(
            {
              latitude: locations[index].latitude,
              longitude: locations[index].longitude,
              latitudeDelta: 0.0025,
              longitudeDelta: 0.0025,
            },
            350
          )
        }
      }, 10)
    })
  })

  const interpolations = locations.map((marker, index) => {
    const inputRange = [
      (index-1)*(Dimensions.get("window").width),
      index*(Dimensions.get("window").width),
      ((index+1)*(Dimensions.get("window").width))
    ]

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.2, 1],
      extrapolate: "clamp"
    })

    return { scale }
  })

  const _map = React.useRef(null)
  const _scrollView = React.useRef(null)

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key

    let x = (markerID*(Dimensions.get("window").width))

    _scrollView.current.scrollTo({x: x, y:0, animated: true})
  }

  return (
    <View style={styles.background}>
      <View style={styles.topBar}>
    
       <MaterialCommunityIcons name="menu" color={"black"} size={40} style={styles.menuButton} onPress={() => navigation.openDrawer()} />

        <View style={styles.mapTitle}>
          <Text style={styles.mapTitleText}>Therapist Map</Text>
        </View>

        <View style={styles.timeStamp}>
          <Text style={{fontSize: 15}}>
            {currentMonth} {day}, {year}
          </Text>
        </View>
      </View>

      <MapView
      ref={_map}
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        region={{
          latitude: 38.915,
          longitude: -77.045,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        }}
      >
        {locations.map((location, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          }
          return(
          <Marker
            key={index}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.title}
            description={location.description}
            onPress={(e)=>onMarkerPress(e)}
          >
            <Animated.View style = {styles.mapMarkerStyle}>
              <Animated.Image
                source={require("../assets/map_marker.png")}
                style={[styles.markerStyle, scaleStyle]}
                resizeMode="center"
              />
            </Animated.View>
          </Marker>
          )
          })}
        
      </MapView>
      <Animated.ScrollView
      ref={_scrollView}
      style={styles.scrollContainer}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      snapToInterval={Dimensions.get("window").width}
      snapToAlignment="center"
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                x:mapAnimation,
              }
            },
          },
        ],
        {useNativeDriver: true}
      )}
      >
        {locations.map((location,index) => (
          <View 
          key={index}
          style={styles.cardView}>
            <Text style={styles.cardText}> {location.title} </Text>
            <Text style={styles.cardText}> {location.description} </Text>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
}
{/* {locations.map((location, index) => (
  <MapCard
  key={index}
  title={location.title}
  description={location.description}
  />
))} */}

const styles = StyleSheet.create({
  // background: {
    //   flex: 1,
    // },
    topBar: {
      //flex: 10,
      position:"absolute",
      height: "10%",
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.primary,
    },
    background: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    position: 'absolute'
  },
  map: { 
    height:"90%",
    //flex:90,
    left: 0, 
    right: 0, 
    bottom: 0, 
    position: 'absolute'
  },
  cardText: {
    fontSize: 15,
    flexWrap: "wrap",
    textAlign:"center",
  },
  cardView: {
    height: 130,
    width: (Dimensions.get("window").width * .7),
    marginLeft: (Dimensions.get("window").width * .15),
    marginBottom: 10,
    marginRight: (Dimensions.get("window").width * .15),
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightPeach,
  },
  mapMarkerStyle: {
    width: 128,
    height: 128,
  },
  mapMarkerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  // mapStyle: {
  //   flex: 90,
  // },
  mapTitle: {
    flex: 2,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  mapTitleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  menuButton: {
    margin: 15,
    marginTop: 23,
  },
  scrollContainer: {
    position:"absolute",
    bottom:0,
  },
  timeStamp: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MapScreen;
