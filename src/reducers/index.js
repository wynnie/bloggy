import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    posts:PostsReducer,
    //The form key has to be form and not anything else for redux-form
    form: formReducer
});

export default rootReducer;
