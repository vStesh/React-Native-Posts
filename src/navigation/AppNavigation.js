import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {MainScreen} from "../screens/MainScreen";
import {PostScreen} from "../screens/PostScreen";

const Post = createNativeStackNavigator();


export const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Post.Navigator>
                <Post.Screen name="Main" component={MainScreen}/>
                <Post.Screen name="Post" component={PostScreen}/>
            </Post.Navigator>
        </NavigationContainer>
    );
}

