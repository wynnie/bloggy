import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
    //context comes from react, automatically passed to childern. Should not be abused, in fact don't use
    //except when working with react-router. Defining contextTypes tells react that we want access to parents context
    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(formprops) {
        //the formprops coming in is from the form, not the object props
        //createPost returns a promise. then gets called when resolved
        this.props.createPost(formprops)
            .then(() => {
                //blog post has been created
                this.context.router.push('/');
            });
    }
    render() {
        const { fields: {title, categories, content}, handleSubmit } = this.props;
        //ES6, same as const handleSubmit = this.props.handleSubmit; const title = this.props.fields.title; 
        //The above props are coming from redux-form. Below it is destructured by ... into keys and values
        return (
            //binding inline
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create A New Post</h3>
                <div className={`form-group ${title.touched && title.invalid ? 'has-danger' :''}`}>
                    <label>Title</label>
                    <input type="text" className="form-control" {...title} />
                    <div className="text-help">
                        {title.touched ? title.error : ''}
                    </div>
                </div>
                <div className={`form-group ${title.touched && title.invalid ? 'has-danger' :''}`}>
                    <label>Categories</label>
                    <input type="text" className="form-control" {...categories} />
                    <div className="text-help">
                        {categories.touched ? categories.error : ''}
                    </div>
                </div>
                <div className={`form-group ${title.touched && title.invalid ? 'has-danger' :''}`}>
                    <label>Content</label>
                    <textarea className="form-control" {...content} />
                    <div className="text-help">
                        {content.touched ? content.error : ''}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};
    //the fields in error should match the form fields for redux-form to flag it
    if (!values.title) {
        errors.title = 'Enter a title!!';
    }
    if (!values.categories) {
        errors.categories= 'Enter a category!!';
    }
    if (!values.content) {
        errors.content= 'Enter some content!!';
    }
    return errors;
}


//connect : first arg mapStateToProps, 2nd is mapDispatchToProps
//reduxForm : first arg is form config, 2nd mapStateToProps, 3rd is mapDispatchToProps
//and mapDispatchtoProps can be shortened
export default reduxForm({
    form: 'PostsNewForm',
    fields: ['title','categories','content'],
    validate
},null, { createPost })(PostsNew);

//user types something in. record it on app state

