"use client";
import * as React from "react";

import HomePage from "./home";
import Logged from "./logged";
import { useAuthContext } from "@/context/state";
import { Team, ContextType } from "@/context/context";
import { toast } from "react-toastify";

export default function Home() {
  const [isloggedIn, SetIsLoggedIn] = React.useState<Boolean>(false);
  const context = useAuthContext();

  const { team, setTeam } : ContextType = context;

  React.useEffect(() => {
    async function fetchUsr() {
      if (typeof window !== "undefined") {
        if (localStorage.getItem("_id") && localStorage.getItem("_user")) {
    
            const _n_t_: Team = Object(localStorage.getItem("_user"));
            setTeam(_n_t_);
            if (team?.id) {
              toast.success(`✅ Loaded Team as 👤 - ${team?.team}`);
              SetIsLoggedIn(true);
            } else {
              toast.error("❌ Failed to load team");
            }
          } else {
            toast.info("⏹ Please Login!");
          }
        }
    }
    fetchUsr();
  }, [team]);

  return <div>{isloggedIn ? <Logged /> : <HomePage />}</div>;
}
