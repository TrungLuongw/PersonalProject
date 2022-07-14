import './category.scss';
import { useState, useEffect } from 'react';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import * as categoryService from '../../services/categoryService';
const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [choosen, setChoosen] = useState('');
    useEffect(() => {
        async function fetchPost() {
            const res = await categoryService.get();
            if (res.isSuccess) {
                setCategories(res.data);
            }
        }
        fetchPost();
    }, []);

    const handleDetail = (e) => {
        console.log(e);
        setChoosen(e);
    };
    return (
        <div className="category-container">
            <div className="category-header">
                <h3>Categories</h3>
            </div>
            <div className="category-body">
                <ul className="category-list">
                    {categories.map((category) => (
                        <Link
                            to={`/?category=${category.name}`}
                            className="category-link"
                            key={category._id}
                        >
                            <li
                                className={`category-item ${
                                    category.name === choosen ? 'category-active' : ''
                                }`}
                                name={category.name}
                                onClick={() => handleDetail(category.name)}
                            >
                                {category.name}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default memo(Categories);
