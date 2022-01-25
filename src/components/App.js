import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import BoardPage from './views/BoardPage/BoardPage';
import { useDispatch, useSelector } from 'react-redux';
import ArticlePage from './views/ArticlePage/ArticlePage';
// import RegisterPage from './views/RegisterPage/RegisterPage';
import UserPage from 'components/views/UserPage/UserPage';
import { userActions } from 'slice/userSlice';
import '../App.css';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.loginUserCheck());
    }, [dispatch]);

    const { id, status } = useSelector((state) => ({
        id: state.userReducers.id,
        status: state.userReducers.status,
    }));
    return (
        <div>
            <Switch>
                <Route exact path="/" component={status == 'login' ? BoardPage : UserPage} />
                <Route exact path="/article/:articleId" component={ArticlePage} />

                {/* <Route exact path="/register" component={id == 'none' || status == 'none' ? UserPage : RegisterPage} /> */}
                {/* <Route exact path="/edit/:boardId" component={id == 'none' || status == 'none' ? UserPage : RegisterPage} /> */}
            </Switch>
        </div>
    );
}

export default App;
