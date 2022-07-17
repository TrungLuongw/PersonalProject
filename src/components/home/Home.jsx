import './home.scss';
import { Grid } from '@mui/material';
import SideBar from '../sidebar/Sidebar';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Posts from '../post/Posts';
import Categories from '../category/Categories';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { accountData } from '../../context/DataProvider';
import { useContext } from 'react';
const Home = () => {
    const { account } = useContext(accountData);

    return (
        <Grid container spacing={8} className="home-container">
            <Grid item lg={2} sm={2} xs={0} className="Sidebar">
                <SideBar child={<Categories />} />
            </Grid>
            <Grid
                item
                lg={10}
                sm={10}
                xs={12}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Posts />
                <div className="home-user-container">
                    <AccountCircleIcon style={{ width: 40, height: 40 }} />
                    <h4>{account.name}</h4>
                </div>
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
