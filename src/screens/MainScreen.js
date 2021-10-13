import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {PostList} from "../components/PostList";
import {loadPosts} from "../store/actions/post";

export const MainScreen = ({route, navigation}) => {
    const dispatch = useDispatch();

    const openPostHandler = (post) => {
        navigation.navigate('Post', {
            postId: post.id,
            title: `Пост от ${new Date(post.date).toLocaleDateString()}`
        });
    }


    useEffect(() => {
       dispatch(loadPosts());
    }, []);

    const allPosts = useSelector(state => state.post.allPosts);

    return (
        <PostList data={allPosts} onOpen={openPostHandler} />
    );
}
