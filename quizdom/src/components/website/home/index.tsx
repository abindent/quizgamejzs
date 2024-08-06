"use client";
import * as React from "react";

import HomePage from "./home";

export default function Home() {

    const [isloggedIn, SetIsLoggedIn] = React.useState<Boolean>(false);

    async function fetchId(_id: string | null | undefined) { };
    return (
        <div>
            <HomePage />
        </div>
    )
}
