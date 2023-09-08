import React, { createContext, useState } from "react";
import { LogoutUser } from '../services/UserService'
import Cookies from "universal-cookie";
const cookies = new Cookies();
const UserContext = createContext({ email: '', auth: false });
const UserProvider = ({ children }) => {
    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState({ email: '', auth: false });

    // Login updates the user data with a name parameter
    const loginContext = (email, token) => {
        cookies.set('jwt', token);
        cookies.set('email', email);
        setUser((user) => ({
            email: email,
            auth: true,
        }));

    };

    // Logout updates the user data to default
    const logout = () => {
        cookies.remove('email');
        LogoutUser();

        setUser((user) => ({
            email: '',
            auth: false,
        }));
    };

    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
}
export { UserContext, UserProvider }