import React from "react";
import {Platform} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {MainScreen} from "../screens/MainScreen";
import {PostScreen} from "../screens/PostScreen";
import {THEME} from "../theme";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeaderIcon";

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
                        },
                        headerRight: () => (
                            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                                <Item
                                    title="Take photo"
                                    iconName="ios-camera"
                                    onPress={() => console.log('Press photo')}
                                />
                            </HeaderButtons>
                        ),
                        headerLeft: () => (
                            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                                <Item
                                    title="Toggle drawer"
                                    iconName="ios-menu"
                                    onPress={() => console.log('Toggle drawer')}
                                />
                            </HeaderButtons>
                        )
                    })}
                />
                <Post.Screen
                    name="Post"
                    component={PostScreen}
                    options={({route}) => ({
                        title: route.params.title,
                        headerRight: () => (
                            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                                <Item
                                    title="Take photo"
                                    iconName={route.params.iconName}
                                    onPress={() => console.log('Press photo')}
                                />
                            </HeaderButtons>
                        ),
                    })}
                />
            </Post.Navigator>
        </NavigationContainer>
    );
}

