import {ADD_POST, LOAD_POSTS, REMOVE_POST, TOGGLE_BOOKED} from "../types";

const initialState = {
    allPosts: [],
    bookedPosts: []
};

export const postReducer = (state = initialState, action) => {
    let allPosts;
    switch(action.type) {
        case LOAD_POSTS: return {
            ...state,
            allPosts: action.payload,
            bookedPosts: action.payload.filter(p => p.booked)
        };
        case TOGGLE_BOOKED:
            allPosts = state.allPosts.map(post => {
                if(post.id === action.payload) {
                    post.booked = !post.booked;
                }
                return post;
            })
            return {
                ...state,
                allPosts: allPosts,
                bookedPosts: allPosts.filter(p => p.booked)
            };
        case REMOVE_POST:
            allPosts = state.allPosts.filter(post => post.id !== action.payload);
            return {
                ...state,
                allPosts,
                bookedPosts: allPosts.filter(p => p.booked)
            };
        case ADD_POST:
            return {
                ...state,
                allPosts: [{...action.payload}, ...state.allPosts]
            }
        default: return state;
    }
}