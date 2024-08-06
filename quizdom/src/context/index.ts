"use client";
// REACT ESSENTIALS
import React, { useState, useContext } from "react";
// IMPORTING CONTEXT
import AuthContext from "./context";

// OTHER IMPORTS
import { v4 } from "uuid";

export function AuthState(props) {
    // VARIABLE SETTINGS
    const host = process.env.NEXT_PUBLIC_BACKENED_API_URI;
    const [user, setUser] = useState(null);

    // FUNCTION TO SAVE DATA TO BOTH LOCALSTORAGE & COOKIE
    const createCookiesToLocalStorage = (name: string, val: string) => {
        localStorage.setItem(name, val);
    };

    // INITIATING USER TO GET JWT
    const register = async (credentials: object) => {
        const req = await fetch(host + "/api/auth/create", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...credentials }),
        });

        const response = await req.json();

        if (response.jwt) {
            setUser(response.user);
            createCookiesToLocalStorage("_id", JSON.stringify(response.id));
        }
        return response;
    };

    // UPDATE USER WITH JWT
    const login = async (jwt: string) => {
        const req = await fetch(
            host + "/api/auth/login",
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Headers": "Accept, Authorization, Content-Type",
                    Accept: "*/*",
                },
                body: JSON.stringify({ "_id": jwt })
            }
        );
        const response = await req.json();
        const _N_user = response;
        createCookiesToLocalStorage("_id", JSON.stringify(_N_user));
        setUser(response);
    };

    // GETTING USER AGAIN WITH THE JWT
    const getSetUser = async (jwt: string, _usr: string) => {
        if (jwt) {
            setUser(JSON.parse(_usr));
        } else {
            await login(jwt);
        }
    };

    // CREATING NEW USER ALONG WITH PROFILE
    const createUser = async (details) => {
        const { first_name, last_name, username, email, password } = details;
        const uid = v4();
        const req = await fetch(host + "/api/auth/local/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name,
                last_name,
                username,
                email,
                password,
                uid,
            }),
        });
        const response = await req.json();

        if (response.jwt) {
            getSetUser(response.jwt);
            createCookiesToLocalStorage("jwt", response.jwt);
        }

        return response;
    };

    // UPDATE USER
    const updateUser = async (id, jwt, details) => {
        const data = JSON.stringify(details);
        const req = await fetch(host + `/api/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: data,
        });
        const response = await req.json();
        if (response.id) {
            setUser(response);
            createCookiesToLocalStorage("user", JSON.stringify(response));
        }
        return response;
    };

    // CHANGE USER PASSWORD
    const changePassword = async (jwt, details) => {
        const req = await fetch(host + "/api/auth/change-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify(details),
        });

        const response = await req.json();
        return response;
    };

    // RESET PASSWORD
    const resetPassword = async (_email) => {
        const req = await fetch(host + "/api/auth/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: _email }),
        });

        const response = await req.json();
        return response;
    };

    // SET PASSWORD
    const setPassword = async (passData) => {
        const req = await fetch(host + "/api/auth/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(passData),
        });

        const response = await req.json();
        return response;
    };

    // CREATING USER PROFILE
    const createProfile = async (jwt) => {
        const req = await fetch(host + "/api/profiles/me/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ data: {} }),
        });

        const response = await req.json();
        await fetchToSetUser(jwt);
        return response;
    };

    // UPDATE USER PROFILE
    const updateProfile = async (jwt, id, data) => {
        const req = await fetch(host + `/api/profiles/${id}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ data }),
        });

        const response = await req.json();
        await fetchToSetUser(jwt);
        return response;
    };

    return (
        <AuthContext.Provider
      value= {{
        user,
            setUser,
            initiateUser,
            fetchToSetUser,
            getSetUser,
            createUser,
            updateUser,
            changePassword,
            resetPassword,
            setPassword,
            createProfile,
            updateProfile,
      }
}
    >
    { props.children }
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);