import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {
    componentWillMount() {
        //this.props.params.id comes from react-router, the id of the post
        this.props.fetchPost(this.props.params.id);
    }
    static contextTypes = {
        router: PropTypes.object
    };
    onDeleteClick() {
        //deletePost will return a promise. therefore you can chain a then()
        this.props.deletePost(this.props.params.id)
        .then(() => {
            //blog post has been deleted
            this.context.router.push('/');
        });
    }
    render() {
        const { post } = this.props;
        if (!post) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <Link to="/">Back to Index</Link>
                <button 
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}>
                    Delete Post 
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { post: state.posts.post}
}

export default connect(mapStateToProps,{ fetchPost, deletePost })(PostsShow);
