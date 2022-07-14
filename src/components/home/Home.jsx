import './home.scss';
import { Grid } from '@mui/material';
import SideBar from '../sidebar/Sidebar';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Posts from '../post/Posts';
import Categories from '../category/Categories';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <Grid container spacing={8} className="home-container">
            <Grid item lg={2} sm={2} xs={2} className="Sidebar">
                <SideBar child={<Categories />} />
            </Grid>
            <Grid item lg={10} sm={10} xs={10} style={{ position: 'relative' }}>
                <Posts />
                <Link to={'/create'}>
                    <button className="btn-create">
                        <ControlPointIcon className="create-icon" />
                        New post
                    </button>
                </Link>
            </Grid>
        </Grid>
    );
};

export default Home;
