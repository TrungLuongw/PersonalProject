import './post.scss';
import { cutString } from '../../contants/helper';
import { accountData } from '../../context/DataProvider';
import { useContext } from 'react';
import { API_IMAGE } from '../../contants/initValue';
const Post = ({ child }) => {
    const url = 'http://localhost:3000/default.jpg';
    return (
        <div className="post-item-container">
            <img
                src={child.avatar ? API_IMAGE + child.avatar : url}
                alt="post"
                className="post-item-avatar"
            />
            <div className="post-item-group">
                <h2 className="post-item-title">{cutString(child.title, 20)}</h2>
                <p className="post-item-description">{cutString(child.description, 100)}</p>
            </div>
        </div>
    );
};
export default Post;
