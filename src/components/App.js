import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BoardPage from 'components/views/BoardPage';
import ArticlePage from 'components/views/ArticlePage';
import RegisterPage from 'components/views/RegisterPage';
import UserPage from 'components/views/UserPage';
import EditPage from 'components/views/EditPage';
import { userActions } from 'slice/userSlice';
import '../App.scss';
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
        <Switch>
            <Route exact path="/" component={status == 'login' ? BoardPage : UserPage} />
            <Route exact path="/article/:articleId" component={status == 'login' ? ArticlePage : UserPage} />
            <Route exact path="/register" component={status == 'login' ? RegisterPage : UserPage} />
            <Route exact path="/edit/:editId" component={status == 'login' ? EditPage : UserPage} />
        </Switch>
    );
}

export default App;
