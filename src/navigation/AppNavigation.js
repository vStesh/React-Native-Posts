import React, {useCallback, useEffect} from "react";
import {Platform} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator} from "@react-navigation/drawer";
import {useDispatch, useSelector} from "react-redux";
import {MainScreen} from "../screens/MainScreen";
import {PostScreen} from "../screens/PostScreen";
import {THEME} from "../theme";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeaderIcon";
import {BookedScreen} from "../screens/BookedScreen";
import {Ionicons} from "@expo/vector-icons";
import {AboutScreen} from "../screens/AboutScreen";
import {CreateScreen} from "../screens/CreateScreen";
import {toggleBooked} from "../store/actions/post";
import {PhotoDetail} from "../components/PhotoDetail";

const tintColor = Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR;
const Post = createNativeStackNavigator();
const Bottom = createNativeStackNavigator();

const Tab = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const PostStack = ({}) => {
    const dispatch = useDispatch();
    const toggleHandler = (post) => {
        dispatch(toggleBooked(post));
    }

    const allPosts = useSelector(state => state.post.allPosts);
    const postOptions = ({route}) => {
        const {postId} = route.params;
        const post = allPosts.find(p => p.id ===  postId);
        let iconName = post.booked ? 'ios-star' : 'ios-star-outline' ;
        return {
            title: route.params.title,
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                    <Item
                        title="Take photo"
                        iconName={iconName}
                        onPress={() => toggleHandler(post)}
                    />
                </HeaderButtons>
            ),
        }
    }

    return (
        <Post.Navigator initialRouteName="Main">
            <Post.Screen
                name="Main"
                component={MainScreen}
                options={({route, navigation}) => ({
                    title: 'Мой блог ',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
                    },
                    headerTintColor: tintColor,
                    headerTitleStyle: {
                        fontWeight: 'bold'
                    },
                    headerRight: () => (
                        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                            <Item
                                title="Take photo"
                                iconName="ios-camera"
                                onPress={() => navigation.navigate('Create')}
                            />
                        </HeaderButtons>
                    ),
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                            <Item
                                title="Toggle drawer"
                                iconName="ios-menu"
                                onPress={() => navigation.toggleDrawer()}
                            />
                        </HeaderButtons>
                    )
                })}
            />
            <Post.Screen
                name="Post"
                component={PostScreen}
                options={postOptions}
            />
            <Post.Screen
                name="PhotoDetail"
                component={PhotoDetail}
            />
        </Post.Navigator>
    );
}

const BookedStack = () => {
    return (
        <Bottom.Navigator initialRouteName="BookedMain">
            <Bottom.Screen
                name="BookedMain"
                component={BookedScreen}
                options={() => ({
                    title: 'Избранное'
                })}
            />
            <Post.Screen
                name="BookedPost"
                component={PostScreen}
                options={({route}) => ({
                    title: route.params.title,
                    headerRight: () => (
                        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                            <Item
                                title="Take photo"
                                iconName={route.params.iconName}
                                onPress={() => console.log('Toggle handler', route.params.postId)}
                            />
                        </HeaderButtons>
                    ),
                })}
            />
        </Bottom.Navigator>
    );
}

const PostTab = ({}) => {

    const tabOptions = {
        headerStyle: {height: 0},
        tabBarActiveBackgroundColor: '#a0a0a0',
        tabBarActiveTintColor: tintColor,
        tabBarInactiveTintColor: tintColor
    };
    const bookedOptions = () => {
        return {
        ...tabOptions,
            tabBarLabel: "Избранное",
            tabBarIcon: () => <Ionicons name="ios-star" size={25} color={tintColor}/>
        }
    }


    return (
            <Tab.Navigator initialRouteName="All">
                <Tab.Screen
                    name="All"
                    component={PostStack}
                    options={{
                        ...tabOptions,
                        tabBarLabel: "Все",
                        // tabBarShowLabel: false,
                        tabBarIcon: () => <Ionicons name="ios-albums" size={25} color={tintColor} />
                    }}
                />
                <Tab.Screen
                    name="Booked"
                    component={BookedStack}
                    options={bookedOptions}

                />
            </Tab.Navigator>
    );
}

const TabNavigator = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="PostTab"
                defaultStatus="closed"
                screenOptions={{
                    drawerActiveTintColor: THEME.MAIN_COLOR,
                    drawerLabelStyle: {
                        marginLeft: 10,
                        fontSize: 20,
                        color: 'white',
                        fontFamily: 'open-bold'
                    },
                    drawerContentContainerStyle: {
                        // backgroundColor: '#fafafa'
                    },
                    drawerContentStyle: {
                        // backgroundColor: 'red'
                    },
                    drawerStyle: {
                        backgroundColor: 'green',
                    }
                }}
            >
                <Drawer.Screen
                    name="PostTab"
                    component={PostTab}
                    options={{
                        title: 'Все посты', headerStyle: {opacity: 0, height: 0},
                        drawerLabel: 'Главная'
                    }}
                />
                <Drawer.Screen
                    name="Create"
                    component={CreateScreen}
                    options={{
                        title: 'Создание нового поста',
                        drawerLabel: 'Создать'
                    }}
                />
                <Drawer.Screen
                    name="About"
                    component={AboutScreen}
                    options={{
                        title: 'О приложении'
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}


export const AppNavigation = TabNavigator;