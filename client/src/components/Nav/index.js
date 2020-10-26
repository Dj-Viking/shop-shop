import React from "react";

import { useStoreContext } from '../../utils/GlobalState.js';
import { UPDATE_CURRENT_CATEGORY } from '../../utils/actions.js';

import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {
  //retrieve the global state object and dispatch method to update state
  const [state, dispatch] = useStoreContext();
  const { categories } = state;

  console.log(categories);

  const setCurrentCategoryBlank = () => {
    dispatch
    (
      {
        type: UPDATE_CURRENT_CATEGORY,
        currentCategory: ''
      }
    );
  }

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link 
          onClick={setCurrentCategoryBlank}
          to="/"
        >
          <span 
            role="img" 
            aria-label="shopping bag"
          >
            🛍️
          </span>
          -Shop-Shop
        </Link>
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
