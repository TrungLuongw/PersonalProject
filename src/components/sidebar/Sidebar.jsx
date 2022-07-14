import HeadSideBar from '../headSideBar/HeadSideBar';
import { Outlet } from 'react-router-dom';
import './sidebar.scss';
const SideBar = ({ child }) => {
    return (
        <div className="SideBar-container">
            <HeadSideBar />
            <Outlet />
            {child}
        </div>
    );
};
export default SideBar;
