import './Head.scss';
import ForumIcon from '@mui/icons-material/Forum';
import { useNavigate } from 'react-router-dom';
const HeadSideBar = () => {
    const navigate = useNavigate();
    const returnHomepage = () => {
        navigate('/');
    };
    return (
        <div className="head-sidebar" onClick={() => returnHomepage()}>
            <ForumIcon className="head-sidebar-icon" />
            <h2 className="head-sidebar-title">Blog</h2>
        </div>
    );
};

export default HeadSideBar;
