import './comment.scss';
import { useEffect, useState, useContext, useRef } from 'react';
import * as commentService from '../../services/commentService';
import { accountData } from '../../context/DataProvider';
import Comment from './Comment';
import { useParams } from 'react-router-dom';
const initCommentEmpty = {
    comment: '',
    postId: '',
    username: '',
    name: '',
    createdAt: '',
};
const Comments = () => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState(initCommentEmpty);
    const { account } = useContext(accountData);
    const { id } = useParams();
    const refreshComment = useRef('');
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await commentService.get(id);
                console.log(response);
                if (response.isSuccess) {
                    setComments(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        refreshComment.current = setInterval(fetchData, 10000);
        return () => {
            if (refreshComment.current) {
                clearInterval(refreshComment.current);
            }
        };
    }, []);
    useEffect(() => {
        handleToggle();
    }, []);
    const handleToggle = async () => {
        try {
            const response = await commentService.get(id);
            console.log(response);
            if (response.isSuccess) {
                setComments(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleInputChange = (e) => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value,
            username: account.username,
            name: account.name,
            postId: id,
        });
    };
    const handlePostComment = async () => {
        if (comment.comment) {
            try {
                const res = await commentService.post(comment);
                if (res.isSuccess) {
                    handleToggle();
                    setComment(initCommentEmpty);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            window.alert('comment empty !');
        }
    };
    return (
        <div className="comments-container">
            <div className="comments-create">
                <h4>Comments as {account.name}</h4>
                <div className="comments-create-content">
                    <textarea
                        className="comments-description"
                        name="comment"
                        value={comment.comment}
                        cols="140"
                        rows="6"
                        placeholder="what are your thoughts ?"
                        onChange={(e) => handleInputChange(e)}
                    />
                    <button onClick={(e) => handlePostComment()} className="btn btn-comment">
                        Comment
                    </button>
                </div>
            </div>
            <div>
                {comments.map((item) => (
                    <Comment handleToggle={handleToggle} comment={item} key={item._id} />
                ))}
            </div>
        </div>
    );
};

export default Comments;
