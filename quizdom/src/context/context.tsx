"use client";

import {Context, createContext} from "react";

// TYPES
interface Member {
    name: string | undefined | null
    class: string | undefined
}

interface Team {
    id: string | undefined | null;
    team: string | undefined | null;
    category: string | undefined | null;
    school: string | undefined | null;
    role: string | null;
    member: {
        member1: Member,
        member2: Member,
        member3: Member,
        member4: Member
    }
}

interface ContextType {
    team: Team,
    register: (credentials: object) => Promise<any>,
    login: (_id: string) => Promise<any>,
    fetchTeam: (_id: string) => Promise<any>
}



// Define the shape of the context data

const AuthContext : Context<ContextType> = createContext<ContextType>({} as ContextType);

export type {Team};
export default AuthContext;

