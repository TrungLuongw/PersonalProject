import { Grid } from '@mui/material';
import './post.scss';
import Post from './Post';
import { useState } from 'react';
import { useEffect } from 'react';
import * as postService from '../../services/postService';
import { useSearchParams, Link } from 'react-router-dom';
import Search from '../searchBar/Search';
const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [showPosts, setShowPosts] = useState([]);
    const [error, setError] = useState('');
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    useEffect(() => {
        async function fetchPost() {
            const res = await postService.getPosts(category || '');
            if (res.isSuccess) {
                setPosts(res.data);
                setShowPosts(res.data);
                setError('');
            }
            if (res.isFailure) {
                setError('No data availble...');
            }
        }
        fetchPost();
    }, [category]);
    return (
        <Grid
            container
            direction="row"
            alignItems="center"
            columnSpacing={2}
            rowSpacing={4}
            marginTop={1}
        >
            <Grid item lg={12} sm={12} xs={12}>
                <Search posts={posts} setShowPosts={setShowPosts} />
            </Grid>

            <Grid item lg={12} sm={12} xs={12}>
                <h3>{error}</h3>
            </Grid>

            {showPosts.map((post) => (
                <Grid item lg={4} sm={6} xs={12} key={post._id}>
                    <Link to={`/detail/${post._id}`} style={{ textDecoration: 'none' }}>
                        <Post child={post} />
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};
export default Posts;
