import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BoardPage from './views/BoardPage/BoardPage';
import { useDispatch, useSelector } from 'react-redux';
import ArticlePage from './views/ArticlePage/ArticlePage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import UserPage from 'components/views/UserPage/UserPage';
import '../App.css';

function App() {
    const { id, status, token, check } = useSelector((state) => ({
        id: state.userReducers.id,
        status: state.userReducers.status,
        token: state.userReducers.token,
        check: state.userReducers.check,
    }));

    return (
        <div>
            <Switch>
                <Route exact path="/" component={id == 'none' || status == 'none' ? UserPage : BoardPage} />
                {/* <Route exact path="/article/:articleId" component={id == 'none' || status == 'none' ? UserPage : BoardPage} /> */}
                {/* <Route exact path="/register" component={id == 'none' || status == 'none' ? UserPage : RegisterPage} /> */}
                {/* <Route exact path="/edit/:articleId" component={id == 'none' || status == 'none' ? UserPage : RegisterPage} /> */}
            </Switch>
        </div>
    );
}

export default App;
