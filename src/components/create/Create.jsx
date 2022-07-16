import { Grid } from '@mui/material';
import SideBar from '../sidebar/Sidebar';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import './create.scss';
import { useRef, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_IMAGE } from '../../contants/initValue';
import * as postService from '../../services/postService';
import * as categoryService from '../../services/categoryService';
import { cutString } from '../../contants/helper';
import { accountData } from '../../context/DataProvider';
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
    title: '',
    description: '',
    avatar: '',
    username: '',
    category: '',
    author: '',
    createdAt: Date.now(),
    updatedAt: Date.now(),
};
const Create = () => {
    //init value
    const url = useRef('http://localhost:3000/default.jpg');

    //hook
    const [avatar, setAvatar] = useState(url.current);
    const [file, setFile] = useState(null);
    const [post, setPost] = useState(initPostEmpty);
    const [categories, setCategories] = useState([]);
    const { account } = useContext(accountData);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await categoryService.get();
                if (response.isSuccess) {
                    setCategories(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    useEffect(() => {
        async function upload() {
            if (file) {
                try {
                    const data = new FormData();
                    data.append('file', file);
                    const response = await postService.upload(data);
                    if (response.isSuccess) {
                        setPost({
                            ...post,
                            avatar: response.data.filename,
                        });
                        setAvatar(API_IMAGE + response.data.filename);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        upload();
    }, [file]);
    //handle
    const handleInputChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value,
            author: account.name,
            username: account.username,
        });
        console.log(post);
    };
    const handleCreatePost = async (e) => {
        try {
            const response = await postService.publicPost(post);
            if (response.isSuccess) {
                navigate('/');
            }
        } catch (error) {}
    };
    return (
        <Grid container spacing={8} className="create-container">
            <Grid item lg={2} sm={2} xs={2} className="Sidebar">
                <SideBar child={<ReturnButton />} />
            </Grid>
            <Grid item lg={10} sm={10} xs={10} style={{ position: 'relative' }}>
                <div className="create-image-container">
                    <img src={avatar} alt="blog" className="create-image" />
                </div>
                <div className="create-group-button">
                    <div className="create-file-container">
                        <label htmlFor="inputFile" className="create-file-label">
                            <ControlPointIcon className="create-file-icon" /> Choose image
                        </label>
                        <input
                            onChange={(e) => setFile(e.target.files[0])}
                            type="file"
                            id="inputFile"
                            style={{ display: 'none' }}
                        />
                        <p className="create-file-name">{cutString(post.avatar, 9)}</p>
                    </div>
                    <div className="create-category">
                        <select
                            name="category"
                            className="create-category-select"
                            onChange={(e) => handleInputChange(e)}
                        >
                            {categories.map((category) => (
                                <option
                                    value={category.name}
                                    key={category._id}
                                    className="create-category-option"
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className="create-public" onClick={(e) => handleCreatePost(e)}>
                        Public
                    </button>
                </div>
                <div className="create-input-container">
                    <label className="create-input-label">Title</label>
                    <input
                        className="create-input-title"
                        type="text"
                        name="title"
                        id="title"
                        placeholder="your title"
                        value={post.title}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <label className="create-input-label">Description</label>
                    <textarea
                        className="create-input-title"
                        cols={120}
                        rows={16}
                        placeholder="Type your content"
                        value={post.description}
                        name="description"
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
            </Grid>
        </Grid>
    );
};
export default Create;
