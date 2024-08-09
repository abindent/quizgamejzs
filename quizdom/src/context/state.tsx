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



    // UPDATE USER WITH JWT
    const login = async (_id: string | null, password: string | null) => {
        const _req = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": `${process.env.NEXT_PUBLIC_HOST_URI}`,
            },
            body: JSON.stringify({id: _id, password: password})
        })
        if (_req.ok) {
            const _response = await _req.json();
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
                "Access-Control-Allow-Origin": `${process.env.NEXT_PUBLIC_HOST_URI}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: _id }),
        });

        const response = await req.json();

        if (response._id) {
            setTeam(response);
        }
        return response;
    }

    const getSetTeam = (_usr: Team) => {
        setTeam(_usr);
    }

    return (
        <AuthContext.Provider value={{ team, setTeam, login, fetchTeam, getSetTeam }}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuthContext = () => useContext(AuthContext);