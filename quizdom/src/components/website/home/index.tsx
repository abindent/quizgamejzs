"use client";
import * as React from "react";

import HomePage from "./home";
import Logged from "./logged"
import { useAuthContext } from "@/context/state";
import {Team} from "@/context/context";
import { toast } from "react-toastify";


export default function Home() {

    const [isloggedIn, SetIsLoggedIn] = React.useState<Boolean>(false);
    const context = useAuthContext();

    const [_team, SetTeam] = React.useState<Team>();
    const { team, fetchTeam } = context;

    React.useEffect(() => {
        async function fetchUsr() {
            if (typeof window !== "undefined") {
                if (localStorage.getItem("_id")) {
                    if (!team) {
                       const _response = await fetchTeam(localStorage.getItem("_id") as string);
                       SetTeam(_response);
                       toast.success(`✅Loaded Team as 👤 - ${_team?.team}`)
                    }
                    SetIsLoggedIn(true);
                }
            }
        }
        fetchUsr();

    }, [])

    async function fetchId(_id: string | null | undefined) { };
    return (
        <div>
            {isloggedIn ? <Logged /> : <HomePage />}
        </div>
    )
}
