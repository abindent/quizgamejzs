'use client';

// REACT ESSENTIALS
import React, { useState, useContext, ReactNode } from "react";

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


    // UPDATE USER WITH JWT
    const login = async (_id: string | null, password: string | null) => {
        const _req = await fetch(`${host}/api/auth/login?id=${_id}&password=${password}`, {
            method: "GET",
            mode: "no-cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        })
        if (_req.ok) {
            const _response = await _req.json();
            createCookiesToLocalStorage("_id", JSON.stringify(_response.id));
            createCookiesToLocalStorage("_user", JSON.stringify(_response));
            setTeam(_response);
            return _response;
        } else {
            throw new Error(`${_req.status} : ${_req.statusText}`);
        }
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

    const getSetTeam = async (_id: string | null, _usr: Team | null) => {
        if (_usr) {
            setTeam(_usr)
        }
        else {
            const response = await fetchTeam(_id);
            setTeam(response)
        }
        return Boolean(team);
    }

    return (
        <AuthContext.Provider value={{ team, login, fetchTeam, getSetTeam }}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuthContext = () => useContext(AuthContext);