import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import WelcomeScreen from './app/screens/WelcomeScreen';
import HowYouFeelScreen from './app/screens/HowYouFeelScreen';
import MenuScreen from './app/screens/MenuScreen';
import DiaryScreen from './app/screens/DiaryScreen';
import PlannerScreen from './app/screens/PlannerScreen';
//import MapScreen from './app/screens/MapScreen';
import UpdateDiaryScreen from './app/screens/UpdateDiaryScreen'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import DiaryMain from './app/screens/DiaryMain';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from './app/config/colors';
import HelpScreen from './app/screens/HelpScreen';
import TherapistScreen from './app/screens/TherapistScreen';


export default function App() {

  const [user, setUser] = useState(null)
  const [name, setName] = useState("")

  const Stack = createStackNavigator()
  const Drawer = createDrawerNavigator()
  const MaterialBottomTabs = createMaterialBottomTabNavigator()
  
  createBottomTabs = () => {
    return(
      <MaterialBottomTabs.Navigator
        shifting={true}
        activeColor={colors.lightBlack}
        inactiveColor={colors.lightBlack}
      >
        <MaterialBottomTabs.Screen name="Diary" component={DiaryMain} 
          options={{
            tabBarLabel: 'Diary',
            tabBarColor: colors.tan,
            tabBarIcon: () => (
              <MaterialCommunityIcons name="book-open-outline" color={colors.lightBlack} size={24} />
            ),
          }}
        />
        <MaterialBottomTabs.Screen name="Planner" component={PlannerScreen} 
          options={{
            tabBarLabel: 'Planner',
            tabBarColor: colors.peach,
            tabBarIcon: () => (
              <MaterialCommunityIcons name="lightbulb-on-outline" color={colors.lightBlack} size={24} />
            ),
            
          }}
        />
        {/* <MaterialBottomTabs.Screen name="Map" component={MapScreen} 
          options={{
            tabBarLabel: 'Map',
            tabBarColor: colors.lightPeach,
            tabBarIcon: () => (
              <MaterialCommunityIcons name="map" color={colors.lightBlack} size={24} />
            ),
          }}
        /> */}
        <MaterialBottomTabs.Screen name="Therapy" component={TherapistScreen} 
          options={{
            tabBarLabel: 'Therapy',
            tabBarColor: colors.lightPeach,
            tabBarIcon: () => (
              <MaterialCommunityIcons name="account-tie" color={colors.lightBlack} size={24} />
            ),
          }}
        />
        <MaterialBottomTabs.Screen name="Hotlines" component={HelpScreen} 
          options={{
            tabBarLabel: 'Hotlines',
            tabBarColor: colors.apricot,
            tabBarIcon: () => (
              <MaterialCommunityIcons name="phone" color={colors.lightBlack} size={24} />
            ),
          }}
        />
        {/* <MaterialBottomTabs.Screen name="screen" component={} /> */}
      </MaterialBottomTabs.Navigator>
    )
  }
  
  createDrawerTabs = () => {
    return(
      <Drawer.Navigator initialRouteName="Diary" >

        <Drawer.Screen name="Home" component={createBottomTabs} />

        <Drawer.Screen name="Change Your Name">
         {props => <WelcomeScreen {...props} name={name} onSetName={setName} onSetUser={handleUser} change={true} />}
        </Drawer.Screen>
{/* 
        <Drawer.Screen name="Change How You Feel">
         {props => <HowYouFeelScreen {...props} user={user} change={true} />}
        </Drawer.Screen> */}

      </Drawer.Navigator>
    )
  }

  useEffect(() => {
    readUser()
  }, [])
  
  async function readUser(){
    //await AsyncStorage.removeItem("user")
    const user = await AsyncStorage.getItem("user")
    if (user) {
      setUser(JSON.parse(user))
    }
  }
  
  async function handleUser(){
    const _id = Math.random().toString(36).substring(7)
    const user = { _id, name }
    await AsyncStorage.setItem("user", JSON.stringify(user))
    setUser(user)
  }

  if(!user){
    return(
      <WelcomeScreen name={name} onSetName={setName} onSetUser={handleUser} />
    )
  }

  return (

    <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >

          <Stack.Screen 
            name="Feel Screen"
          >
            {props => <HowYouFeelScreen {...props} user={user} change={false}/>}
          </Stack.Screen>

          <Stack.Screen 
            name="Bottom Tabs Screen" 
            children={createDrawerTabs} 
            options={{
              headerLeft: null
            }}
          />

          <Stack.Screen
            name="Note Screen"
            component={DiaryScreen}
            options={{
              headerLeft: null
            }}
          />

          <Stack.Screen
            name="Update Note Screen"
            component={UpdateDiaryScreen}
            options={{
              headerLeft: null
            }}
          />
        </Stack.Navigator>
    </NavigationContainer>

    //<WelcomeScreen />
    //<HowYouFeelScreen />
    //<MenuScreen />
    //<DiaryScreen />
    //<PlannerScreen />
    //<MapScreen />
    //<DiaryMain />
    
  );
}
