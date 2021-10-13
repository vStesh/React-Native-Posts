import React, {useEffect, useState} from "react";
import {View, StyleSheet, Image, Button, Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const PhotoPicker = ({onPick}) => {
    const [image, setImage] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
                setHasPermission(status === 'granted');
            }
        })();
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
                setHasPermission(status === 'granted');
            }
        })();


    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const takePhoto = async () => {
        let img = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });
        setImage(img.uri);
        onPick(img.uri);
    }

    return (
        <View style={styles.wrapper}>
            <Button title="Сделать фото" onPress={takePhoto} />
            {image && <Image source={{uri: image}} style={styles.image}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 10
    }
});