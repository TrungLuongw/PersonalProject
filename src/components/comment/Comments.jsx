import './comment.scss';
import { useEffect, useState, useContext } from 'react';
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
    const [error, setError] = useState('');
    const { account } = useContext(accountData);
    const { id } = useParams();
    const [toggle, setToggle] = useState(false);
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
        fetchData();
    }, [toggle]);

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
                    setToggle(!toggle);
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
                    <Comment setToggle={setToggle} toggle={toggle} comment={item} key={item._id} />
                ))}
            </div>
        </div>
    );
};

export default Comments;
