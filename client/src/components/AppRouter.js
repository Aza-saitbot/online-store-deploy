import React, {useContext} from "react";
import {authRoutes, publicRoutes} from "../routes";
import {Route,Switch,Redirect} from "react-router-dom";
import {SHOP_ROUTE} from "../utilits/consts";
import {Context} from "../index";

const AppRouter = () => {
    const {user}=useContext(Context)
    console.log(user)

    return (
        <Switch>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={SHOP_ROUTE}/>
        </Switch>

    )
};

export default AppRouter;
