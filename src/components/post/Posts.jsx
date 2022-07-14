import { Grid } from '@mui/material';
import './post.scss';
import Post from './Post';
import { useState } from 'react';
import { useEffect } from 'react';
import * as postService from '../../services/postService';
import { useSearchParams, Link } from 'react-router-dom';
const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    useEffect(() => {
        async function fetchPost() {
            const res = await postService.getPosts(category || '');
            console.log(res);
            if (res.isSuccess) {
                setPosts(res.data);
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
            columnSpacing={4}
            rowSpacing={4}
            marginTop={4}
        >
            <h3>{error}</h3>
            {posts.map((post) => (
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
