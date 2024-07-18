"use client";
// REACT
import * as React from "react";

// UUID
import { v4 } from "uuid";

// FLOWBITE
import { TextInput, Label, Select, Button } from "flowbite-react";


export default function Home() {
    interface RegistrationData {
        teamId: string | undefined;
        members: {
            member1: string | undefined,
            member2: string | undefined
        };
        team: string | undefined;
        category: string | undefined,
        school: string | undefined
    }

    const initialState: RegistrationData = {
        teamId: v4(),
        members: {
            member1: "",
            member2: ""
        },
        team: "Team 1",
        category: "Interschool (Junior)",
        school: "Jalpaiguri Zilla School"

    }
    const [data, setData] = React.useState<RegistrationData>(initialState)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target;
        if (id === 'member1' || id === 'member2') {
            setData(prevState => ({
                ...prevState,
                members: {
                    ...prevState.members,
                    [id]: value
                }
            }));
        } else {
            setData(prevState => ({
                ...prevState,
                [id]: value
            }));
        }
        console.log(JSON.stringify(data));
    }


    function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        const { id, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [id]: value
        }));
        console.log(JSON.stringify(data));

    }

    return (
        <form className="flex w-full h-full flex-col gap-4 text-center justify-evenly items-center p-4">
            <h1 className="dark:text-[silver] text-3xl font-medium">REGISTRATION</h1>
            <div>
                <div className="mb-2 block w-[20vw]">
                    <Label htmlFor="teamID" value="Team ID (password)" />
                </div>
                <TextInput disabled id="teamId" type="text" placeholder="Team ID" value={data?.teamId} required />
            </div>
            <div>
                <div className="mb-2 block w-[20vw]">
                    <Label htmlFor="member1" value="Name of the first member" />
                </div>
                <TextInput id="member1" type="text" placeholder="Name" value={data?.members.member1} onChange={handleChange} required />
            </div>
            <div>
                <div className="mb-2 block w-[20vw]">
                    <Label htmlFor="member2" value="Name of the second member" />
                </div>
                <TextInput id="member2" type="text" placeholder="Name" value={data?.members.member2} onChange={handleChange} required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="category" value="Select your category" />
                </div>
                <Select className="w-[20vw]" id="category" value={data?.category} onChange={handleSelect} required>
                    <option>Interschool (Junior)</option>
                    <option>Interschool (Senior)</option>
                    <option>Intraschool (Senior)</option>
                </Select>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="team" value="Select your team" />
                </div>
                <Select className="w-[20vw]" id="team" value={data?.team} onChange={handleSelect} required>
                    <option>Team 1</option>
                    <option>Team 2</option>
                    <option>Team 3</option>
                    <option>Team 4</option>
                    <option>Team 5</option>
                    <option>Team 6</option>
                    <option>Team 7</option>
                    <option>Team 8</option>
                </Select>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="school" value="Select your school" />
                </div>
                <Select className="w-[20vw]" id="school" value={data?.school} onChange={handleSelect} required>
                    <option>Jalpaiguri Zilla School</option>
                    <option>Fanindra Deb Institution</option>
                    <option>Sonaulla Higher Secondary School</option>
                    <option>Ashalata Basu Vidyalaya</option>
                    <option>Sunitibala Sadar Girls High School</option>
                    <option>Jalpaiguri Govt. Girls' High School</option>
                    <option>Central Girls High School</option>
                    <option>Kadamtala Girls' High School</option>
                </Select>
            </div>
            <Button className="w-[20vw]">Register</Button>
        </form>
    );
}
