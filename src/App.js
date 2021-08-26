import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Review from "./components/Review/Review";
import NotFound from "./components/NotFound/NotFound";
import Inventory from "./components/Inventory/Inventory";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Login from "./components/Login/Login";
import Shipping from "./components/Shipping/Shipping";
import { createContext, useState } from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <div>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <p>Email: {loggedInUser.email}</p>
        <Router>
          <Header />
          <Switch>
            <Route path="/shop">
              <Shop />
            </Route>
            <Route exact="true" path="/">
              <Shop />
            </Route>
            <Route path="/review">
              <Review />
            </Route>
            <PrivateRoute path="/inventory">
              <Inventory />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>

            <PrivateRoute path="/shipping">
              <Shipping />
            </PrivateRoute>

            <Route path="/product/:productKey">
              <ProductDetail />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
