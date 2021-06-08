
import './App.css';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Inventory from './Components/Inventory/Inventory';
import Review from './Components/Review/Review';
import NotFound from './Components/NotFound/NotFound';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Login from './Components/Login/Login';
import Shipment from './Components/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext()

function App() {
const [loggedInUser, setLoggedInUser] =  useState({})

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]} >
      <h1> email:{loggedInUser.email}</h1>
      
      
      <Router>
      <Header></Header>
        <Switch>
          <Route path ="/shop">
            <Shop></Shop>
          </Route>
          <PrivateRoute path ="/inventory">
             <Inventory></Inventory>
          </PrivateRoute>
          <Route path ="/review">
           <Review></Review>
          </Route>
          <Route path ="/login">
            <Login/>
          </Route>
          <PrivateRoute path ="/shipment">
           <Shipment></Shipment>
          </PrivateRoute>
          <Route exact path ="/">
            <Shop></Shop>
          </Route>
          <Route path='/product/:productKey'>
            <ProductDetails></ProductDetails>
          </Route>
          <Route path ="*">
            <NotFound></NotFound>
          </Route>

        </Switch>
      </Router>
      
      
    </UserContext.Provider>
  );
}

export default App ;
