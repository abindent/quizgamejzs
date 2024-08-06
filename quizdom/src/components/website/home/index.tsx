"use client";
// REACT
import * as React from "react";

// UUID
import { v4 } from "uuid";

// FLOWBITE
import { Button, Clipboard, Label, Tabs, TextInput, Select } from "flowbite-react";


export default function Home() {
    interface RegistrationData {
        password: string;
        members: {
            member1: string | undefined,
            member2: string | undefined,
            member3: string | undefined,
            member4: string | undefined
        };
        team: string | undefined;
        category: string | undefined,
        school: string | undefined
    }

    interface LoginData {
        _id: string | undefined;
        _t_password: string | undefined
    }

    const initialState: RegistrationData = {
        password: v4(),
        members: {
            member1: "",
            member2: "",
            member3: "",
            member4: ""
        },
        team: "Team 1",
        category: "Interschool (Junior)",
        school: "Jalpaiguri Zilla School"

    }

    const loginInitialState: LoginData = {
        _id: "",
        _t_password: ""
    }
    const [data, setData] = React.useState<RegistrationData>(initialState)
    const [loginData, setLoginData] = React.useState<LoginData>(loginInitialState)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target;
        if (id.includes("member")) {
            setData(prevState => ({
                ...prevState,
                members: {
                    ...prevState.members,
                    [id]: value
                }
            }));
        }

        else if (id === "_id" || id === "_t_password") {
            setLoginData(prevState => ({
                ...prevState,
                [id]: value
            }))
        }
        else {
            setData(prevState => ({
                ...prevState,
                [id]: value
            }));
        }
    }


    function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        const { id, value } = e.currentTarget;
        setData(prevState => ({
            ...prevState,
            [id]: value
        }));

    }


    return (
        <Tabs aria-label="Default tabs" variant="fullWidth">
            <Tabs.Item active title="Regsiter">
                <form className="flex w-full h-full flex-col gap-7 justify-evenly items-center p-4">
                    <h1 className="dark:text-[rgb(102,82,82)] text-3xl font-medium">REGISTRATION</h1>
                    <div>
                        <div className="relative">
                            <div className="mb-2 block w-[35vw]">
                                <Label htmlFor="password" value="Team Password" />
                            </div>
                            <TextInput disabled id="password" type="text" value={data?.password} required />
                            <Clipboard.WithIcon className="top-3/4" valueToCopy={data?.password} />
                        </div>
                    </div>
                    <div>
                        <div className="mb-2 block w-[35vw]">
                            <Label htmlFor="member1" value="Name of the 1st member" />
                        </div>
                        <TextInput id="member1" type="text" placeholder="Enter the name of 1st member " value={data?.members.member1} onChange={handleChange} required />
                    </div>
                    <div>
                        <div className="mb-2 block w-[35vw]">
                            <Label htmlFor="member2" value="Name of the 2nd member" />
                        </div>
                        <TextInput id="member2" type="text" placeholder="Enter the name of 2nd member " value={data?.members.member2} onChange={handleChange} required />
                    </div>
                    <div>
                        <div className="mb-2 block w-[35vw]">
                            <Label htmlFor="member3" value="Name of the 3rd member" />
                        </div>
                        <TextInput id="member3" type="text" placeholder="Enter the name of 3rd member " value={data?.members.member3} onChange={handleChange} required />
                    </div>
                    <div>
                        <div className="mb-2 block w-[35vw]">
                            <Label htmlFor="member4" value="Name of the 4th member" />
                        </div>
                        <TextInput id="member4" type="text" placeholder="Enter the name of 4th member " value={data?.members.member4} onChange={handleChange} required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="category" value="Select your category" />
                        </div>
                        <Select className="w-[35vw]" id="category" value={data?.category} onChange={handleSelect} required>
                            <option value={"Interschool (Junior)"}>Interschool (Junior)</option>
                            <option value={"Interschool (Senior)"}>Interschool (Senior)</option>
                            <option value={"Intraschool (Senior)"}>Intraschool (Senior)</option>
                        </Select>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="team" value="Select your team" />
                        </div>
                        <Select className="w-[35vw]" id="team" value={data?.team} onChange={handleSelect} required>
                            <option value={"Team 1"}>Team 1</option>
                            <option value={"Team 2"}>Team 2</option>
                            <option value={"Team 3"}>Team 3</option>
                            <option value={"Team 4"}>Team 4</option>
                            <option value={"Team 5"}>Team 5</option>
                            <option value={"Team 6"}>Team 6</option>
                            <option value={"Team 7"}>Team 7</option>
                            <option value={"Team 8"}>Team 8</option>
                        </Select>
                    </div>
                    <div>
                        <div className="w-[35vw] mb-2 block">
                            <Label htmlFor="school" value="Select your school" />
                        </div>
                        <TextInput id="school" type="text" placeholder="Enter your school's name" value={data.school} onChange={handleChange} required />
                    </div>
                    <Button className="w-[35vw]" disabled>Register</Button>
                </form>
            </Tabs.Item>
            <Tabs.Item color="black" title="Login">
                <form className="flex w-full h-full flex-col gap-7 justify-evenly items-center p-4">
                    <h1 className="dark:text-[rgb(102,82,82)] text-3xl font-medium">LOGIN</h1>
                    <div>
                        <div className="mb-2 block w-[35vw]">
                            <Label htmlFor="_id" value="Enter Team ID" />
                        </div>
                        <TextInput id="_id" type="text" placeholder="Enter your team ID" value={loginData._id} onChange={handleChange} required />
                    </div>
                    <div>
                        <div className="mb-2 block w-[35vw]">
                            <Label htmlFor="_t_password" value="Enter password" />
                        </div>
                        <TextInput id="_t_password" type="password" placeholder="Enter your password" value={loginData._t_password} onChange={handleChange} required />
                    </div>

                    <Button className="w-[35vw]" disabled>Login</Button>
                </form>
            </Tabs.Item>
        </Tabs>
    );
}
