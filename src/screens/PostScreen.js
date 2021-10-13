import React from "react";
import {View, Text, StyleSheet, Image, Button, ScrollView, Alert} from "react-native";
import {THEME} from "../theme";
import {useDispatch, useSelector} from "react-redux";
import {removePost} from "../store/actions/post";


export const PostScreen = ({route, navigation}) => {
    const dispatch = useDispatch();
    const {postId} = route.params;
    const post = useSelector(state => state.post.allPosts.find(p => p.id === postId));
    const removeHandler = () => {
        // const removePost = () => {
        //
        //
        //     console.log('Пост удален');
        // }

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
                    onPress: () => {
                        navigation.navigate('Main');
                        dispatch(removePost(postId));
                    },
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