import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { accountData } from '../../context/DataProvider';
import { useContext } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import * as commentService from '../../services/commentService';
const Comment = ({ comment, setToggle, toggle }) => {
    const { account } = useContext(accountData);
    const handleRemoveComment = async () => {
        try {
            const res = await commentService.remove(comment._id);
            if (res.isSuccess) {
                setToggle(!toggle);
            }
        } catch (error) {
            console.log(error);
            window.alert(error.msg || error.message);
        }
    };
    return (
        <div className="comment-container">
            <AccountCircleIcon className="comment-user-icon" />
            <div className="comment-group">
                <label className="comment-author">
                    {comment.name} <p>{new Date(comment.createdAt).toDateString()}</p>
                </label>
                <p className="comment-content">{comment.comment}</p>
            </div>
            {account.username === comment.username && (
                <button className="comment-btn-remove" onClick={() => handleRemoveComment()}>
                    <DeleteIcon />
                </button>
            )}
        </div>
    );
};

export default Comment;
