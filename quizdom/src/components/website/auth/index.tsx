"use client";
import * as React from "react";

import HomePage from "./home";
import Logged from "./logged";
import { useAuthContext } from "@/context/auth/state";
import { ContextType } from "@/context/auth/context";

export default function Home() {
  const context = useAuthContext();

  const { team } : ContextType = context;

  return <div>{team.id ? <Logged /> : <HomePage />}</div>;
}
