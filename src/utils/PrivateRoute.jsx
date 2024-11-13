import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem('token');
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/sign-in" />
                )
            }
        />
    );
};

export default PrivateRoute;