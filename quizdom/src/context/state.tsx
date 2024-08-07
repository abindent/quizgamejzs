'use client';

// REACT ESSENTIALS
import React, { useState, useContext, ReactNode } from "react";

// OTHER IMPORTS
import { v4 } from "uuid";

// CONTEXT
import AuthContext, { Team } from "./context";

// STATE
export function AuthState({ children }: { children: ReactNode }) {

    const initialState: Team = {
        id: "",
        team: "",
        category: "",
        school: "",
        role: "",
        member: {
            member1: {
                name: "",
                class: ""
            },
            member2: {
                name: "",
                class: ""
            },
            member3: {
                name: "",
                class: ""
            },
            member4: {
                name: "",
                class: ""
            }
        }
    };

    // VARIABLE SETTINGS
    const host = process.env.NEXT_PUBLIC_BACKEND_API_URI as string;
    const [team, setTeam] = useState<Team>(initialState);

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

        if (response._id) {
            setTeam(response);
            createCookiesToLocalStorage("_id", JSON.stringify(response.id));
        }
        return response;
    };

    // UPDATE USER WITH JWT
    const login = async (_id: string | null) => {
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
                body: JSON.stringify({ "_id": _id })
            }
        );
        const response = await req.json();
        const _N_team = response;
        createCookiesToLocalStorage("_id", JSON.stringify(_N_team));
        setTeam(response);
        return response.id;
    };

    const fetchTeam = async (_id: string | null) => {
        const req = await fetch(host + "/api/auth/team", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: _id }),
        });

        const response = await req.json();

        if (response._id) {
            setTeam(response);
            createCookiesToLocalStorage("_id", JSON.stringify(response.id));
        }
        return response;
    }

    return (
        <AuthContext.Provider value={{ team, register, login, fetchTeam }}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuthContext = () => useContext(AuthContext);