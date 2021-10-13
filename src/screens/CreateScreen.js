import React, {useRef, useState} from "react";
import {View, Text, StyleSheet, TextInput, Image, Button, ScrollView, TouchableWithoutFeedback, Keyboard} from "react-native";
import {THEME} from "../theme";
import {useDispatch} from "react-redux";
import {addPost} from "../store/actions/post";
import {PhotoPicker} from "../components/PhotoPicker";

export const CreateScreen = ({navigation}) => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const imgRef = useRef();

    const saveHandler = () => {
        const post = {
            date: new Date(),
            text: text,
            img: imgRef.current,
            booked: false
        };
        dispatch(addPost(post));
        navigation.navigate('Main');
    }

    const photoPickHandler = uri => {
        imgRef.current = uri;
    }

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>Create screen</Text>
                    <TextInput
                        style={styles.textarea}
                        placeholder="Введите текст поста"
                        value={text}
                        onChangeText={setText}
                        multiline
                    />
                    <PhotoPicker onPick={photoPickHandler}/>
                    <Button
                        title="Создать пост"
                        color={THEME.MAIN_COLOR}
                        onPress={saveHandler}
                        disabled={!text && !imgRef.current}
                    />
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: 'open-regular',
        marginVertical: 10
    },
    textarea: {
        padding: 10,
        marginBottom: 10
    }
});