import './App.scss';
import { Routes, Route, BrowserRouter, Navigate, Outlet } from 'react-router-dom';
import Account from './components/account/account';
import { useEffect, useState } from 'react';
import Home from './components/home/Home';
import Create from './components/create/Create';
import Detail from './components/detail/Detail';
import Update from './components/create/Update';
const PrivateRoute = ({ login }) => {
    if (login) {
        return (
            <>
                <Outlet />
            </>
        );
    } else {
        return <Navigate replace to="/login" />;
    }
};
function App() {
    const [login, setLogin] = useState(false);
    useEffect(() => {});
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {/* <Route path="/" element={<Intro />} /> */}
                    <Route path="/login" element={<Account setLogin={setLogin} />} />
                    <Route path="/" element={<PrivateRoute login={login} />}>
                        <Route path="/" element={<Home />} />
                    </Route>
                    <Route path="/create" element={<PrivateRoute login={login} />}>
                        <Route path="/create" element={<Create />} />
                    </Route>
                    <Route path="/detail/:id" element={<PrivateRoute login={login} />}>
                        <Route path="/detail/:id" element={<Detail />} />
                    </Route>
                    <Route path="/update/:id" element={<PrivateRoute login={login} />}>
                        <Route path="/update/:id" element={<Update />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
