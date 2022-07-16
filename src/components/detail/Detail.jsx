import { Grid } from '@mui/material';
import SideBar from '../sidebar/Sidebar';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './detail.scss';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import * as postService from '../../services/postService';
import { accountData } from '../../context/DataProvider';
import { API_IMAGE } from '../../contants/initValue';
import Comments from '../comment/Comments';
const ReturnButton = () => {
    const navigate = useNavigate();
    const handleReturn = () => {
        navigate('/');
    };
    return (
        <div className="return-button-container" onClick={() => handleReturn()}>
            <KeyboardReturnIcon className="return-button-icon" />
            Home
        </div>
    );
};
const initPostEmpty = {
    _id: '',
    title: '',
    description: '',
    avatar: '',
    username: '',
    category: '',
    createdAt: Date.now(),
    updatedAt: Date.now(),
};
const Detail = () => {
    const url = useRef('http://localhost:3000/default.jpg');
    const { id } = useParams();
    const [post, setPost] = useState(initPostEmpty);
    const { account } = useContext(accountData);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            const res = await postService.getPost(id);
            if (res.isSuccess) {
                setPost(res.data);
            }
        }
        fetchData();
    }, []);
    const handleRemovePost = async () => {
        try {
            const res = await postService.removePost(id);
            if (res.isSuccess) {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            window.alert(error.msg || error.message);
        }
    };
    const handleEditPost = () => {
        navigate(`/update/${id}`);
    };
    return (
        <Grid container spacing={8} className="detail-container">
            <Grid item lg={2} sm={2} xs={2} className="Sidebar">
                <SideBar child={<ReturnButton />} />
            </Grid>
            <Grid item lg={10} sm={10} xs={10} style={{ position: 'relative' }}>
                <div className="detail-image-container">
                    <img
                        src={post.avatar ? API_IMAGE + post.avatar : url.current}
                        alt="blog"
                        className="detail-image"
                    />
                </div>
                <div className="detail-group-button">
                    <p className="detail-author">Author: {post.author}</p>
                    <p className="detail-dateTime">{new Date(post.createdAt).toDateString()}</p>
                    {account.username === post.username && (
                        <div className="detail-author-toolbox">
                            <button
                                className="btn detail-btn-edit"
                                onClick={() => handleEditPost()}
                            >
                                <EditIcon />
                                Edit
                            </button>
                            <button
                                onClick={() => handleRemovePost()}
                                className="btn detail-btn-remove"
                            >
                                <DeleteIcon />
                                Delete
                            </button>
                        </div>
                    )}
                </div>
                <div className="detail-input-container">
                    <h1 className="detail-input-title">{post.title}</h1>
                    <label className="detail-input-label">Description</label>
                    <p className="detail-input-description">{post.description}</p>
                </div>
                <Comments postId={post._id} />
            </Grid>
        </Grid>
    );
};
export default Detail;
