import React from "react";
import {Platform} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {MainScreen} from "../screens/MainScreen";
import {PostScreen} from "../screens/PostScreen";
import {THEME} from "../theme";

const Post = createNativeStackNavigator();


export const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Post.Navigator initialRouteName="Main">
                <Post.Screen
                    name="Main"
                    component={MainScreen}
                    options={({route}) => ({
                        title: 'Мой блог ',
                        headerStyle: {
                            backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
                        },
                        headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        }
                    })}
                />
                <Post.Screen
                    name="Post"
                    component={PostScreen}
                    options={({route}) => ({title: route.params.title})}
                />
            </Post.Navigator>
        </NavigationContainer>
    );
}

