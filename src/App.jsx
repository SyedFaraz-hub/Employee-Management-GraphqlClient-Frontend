import { Switch, Route, Redirect } from "react-router-dom";
import Main from './components/layout/Main';
import PrivateRoute from "./utils/PrivateRoute";
import { Employees, SignIn } from "./pages";

function App() {
  return (
    <div className="App">
        <Switch>
          <Route path="/sign-in" exact component={SignIn} />
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>

          <Main>
            <PrivateRoute exact path="/dashboard" component={Employees} />
          </Main>
          </Switch>
    </div>
  );
}

export default App;
