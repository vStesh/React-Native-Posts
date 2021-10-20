import React from "react";
import {View, StyleSheet, Image, TouchableOpacity} from "react-native";
import { AntDesign } from '@expo/vector-icons';

export const PhotoDetail = ({route, navigation}) => {

    return (
        <View style={styles.wrapper} >
            <Image style={styles.img} source={{uri: route.params.post.img}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    img: {
        width: '100%',
        height: '100%'
    }
});