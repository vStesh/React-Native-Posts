import React from "react";
import {View, Text, StyleSheet, Button, FlatList} from "react-native";
import {DATA} from "../data";
import {Post} from "../components/Post";

export const MainScreen = ({navigation}) => {
    const openPostHandler = (post) => {
        let iconName = post.booked ? 'ios-star' : 'ios-star-outline' ;
        navigation.navigate('Post', {
            postId: post.id,
            title: `Пост от ${new Date(post.date).toLocaleDateString()}`,
            iconName
        });
    }
    return (
        <View style={styles.wrapper}>
            <FlatList
                data={DATA}
                keyExtractor={post => post.id.toString()}
                renderItem={({item}) => {
                    return <Post post={item} onOpen={openPostHandler} />
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    }
});