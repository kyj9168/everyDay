import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import BoardPage from './views/BoardPage';
import { useDispatch, useSelector } from 'react-redux';
import ArticlePage from './views/ArticlePage';
import RegisterPage from './views/RegisterPage';
import UserPage from 'components/views/UserPage';
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
                <Route exact path="/article/:articleId" component={status == 'login' ? ArticlePage : UserPage} />
                <Route exact path="/register" component={status == 'login' ? RegisterPage : UserPage} />
                {/* <Route exact path="/edit/:boardId" component={id == 'none' || status == 'none' ? UserPage : RegisterPage} /> */}
            </Switch>
        </div>
    );
}

export default App;
