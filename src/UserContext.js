import React from "react";

const UserContext = React.createContext({user: {userId: 0, username: "Guest", getToken: function() {
            return localStorage.getItem('token') === null;
        }
    }});

export {
    UserContext
};