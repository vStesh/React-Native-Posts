import React from "react";
import {View, Text, StyleSheet, Image, Button, ScrollView, Alert} from "react-native";
import {DATA} from "../data";
import {THEME} from "../theme";

export const PostScreen = ({route, navigation}) => {
    const {postId} = route.params;
    const post = DATA.find(p => p.id === postId);
    const removeHandler = () => {
        Alert.alert(
            "Удаление поста",
            "Вы точно хотите удалить пост?",
            [
                {
                    text: "Отменить",
                    style: "cancel",
                },
                {
                    text: "Удалить",
                    onPress: () => {},
                    style: "destructive",
                },
            ],
            {cancelable: true}
        );
    }
    return (
        <ScrollView style={styles.image}>
            <Image source={{uri: post.img}} style={styles.image}/>
            <View style={styles.textWrap}>
                <Text style={styles.title}>{post.text.repeat(10)}</Text>
            </View>
            <Button title="Удалить пост" color={THEME.DANGER_COLOR} onPress={removeHandler}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height:200
    },
    textWrap: {
        padding: 10
    },
    title: {
        fontFamily: 'open-regular'
    }
});