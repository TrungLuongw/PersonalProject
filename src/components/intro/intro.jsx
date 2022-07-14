import './intro.scss';
import { Link } from 'react-router-dom';

const Intro = () => {
    return (
        <div className="intro-container">
            <div className="intro-head">
                <h1>Blog app</h1>
                <div className="intro-group-button">
                    <button className="intro-profile-button">My profile</button>
                </div>
            </div>
            <div className="intro-body">
                <h1>Welcome to my blog</h1>
                <Link to="/login" className="intro-sign">
                    <button className="intro-start-button">Start using</button>
                </Link>
            </div>
        </div>
    );
};

export default Intro;
