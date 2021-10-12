import React from "react";
import {DATA} from "../data";
import {PostList} from "../components/PostList";

export const BookedScreen = ({navigation}) => {
    const openPostHandler = (post) => {
        let iconName = post.booked ? 'ios-star' : 'ios-star-outline' ;
        navigation.navigate('Post', {
            postId: post.id,
            title: `Пост от ${new Date(post.date).toLocaleDateString()}`,
            iconName
        });
    }
    return (
        <PostList data={DATA.filter(post => post.booked)} onOpen={openPostHandler}/>
    );
}
