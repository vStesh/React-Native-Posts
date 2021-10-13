import React from "react";
import {DATA} from "../data";
import {PostList} from "../components/PostList";
import {useSelector} from "react-redux";

export const BookedScreen = ({navigation}) => {
    const openPostHandler = (post) => {
        let iconName = post.booked ? 'ios-star' : 'ios-star-outline' ;
        navigation.navigate('Post', {
            postId: post.id,
            title: `Пост от ${new Date(post.date).toLocaleDateString()}`,
            iconName
        });
    }

    const bookedPosts = useSelector(state => state.post.bookedPosts);
    return (
        <PostList data={bookedPosts} onOpen={openPostHandler}/>
    );
}
