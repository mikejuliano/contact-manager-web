// LogoutButton.js

import React from 'react';
import {withRouter} from "react-router-dom";

export const LogoutButton = withRouter(({history, ...rest}) => {
    const {isAuthenticated, handleLogout} = rest;
    return isAuthenticated
      ? (
        <p>
          <button
            type="button"
            className="form-submit"
            onClick={ () => handleLogout(history) }>Logout
          </button>
        </p>
      )
      : <p>You are not logged in</p>;
  }
);