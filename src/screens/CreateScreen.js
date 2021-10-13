import React, {useState} from "react";
import {View, Text, StyleSheet, TextInput, Image, Button, ScrollView, TouchableWithoutFeedback, Keyboard} from "react-native";
import {THEME} from "../theme";
import {useDispatch} from "react-redux";
import {addPost} from "../store/actions/post";

export const CreateScreen = ({navigation}) => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const img = 'https://static.coindesk.com/wp-content/uploads/2019/01/shutterstock_1012724596-860x430.jpg';

    const saveHandler = () => {
        const post = {
            date: new Date(),
            text: text,
            img: img,
            booked: false
        };
        dispatch(addPost(post));
        navigation.navigate('Main');
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
                    <Image
                        style={{width: '100%', height: 200, marginBottom: 10}}
                        source={{uri: img}} />
                    <Button title="Создать пост" color={THEME.MAIN_COLOR} onPress={saveHandler}/>
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