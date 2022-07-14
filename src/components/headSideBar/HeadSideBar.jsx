import './Head.scss';
import ForumIcon from '@mui/icons-material/Forum';
const HeadSideBar = () => {
    return (
        <div className="head-sidebar">
            <ForumIcon className="head-sidebar-icon" />
            <h2 className="head-sidebar-title">Blog</h2>
        </div>
    );
};

export default HeadSideBar;
