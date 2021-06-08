import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import Logo from '../../images/logo.png'
import "./Header.css"

const Header = () => {

    const [loggedInUser, setLoggedInUser] =useContext(UserContext)
    return (
        <div className ='header'>
            <div className ='logo'>
                <img src={Logo} alt="" />
            </div>
            <div>
                <nav className='main-menu'>
                    <Link to="/shop">Shop</Link>
                    <Link to="/review"> Review Order</Link>
                    <Link to="/inventory">Manage Inventory</Link>
                    <p>{loggedInUser.displayName}</p>
                </nav>

            </div>
        </div>
    );
};

export default Header;