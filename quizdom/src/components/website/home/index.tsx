"use client";
// REACT
import * as React from "react";

// UUID
import { v4 } from "uuid";

// FLOWBITE
import { TextInput, Label, Select, Button } from "flowbite-react";


export default function Home() {
    interface RegistrationData {
        password: string | undefined;
        members: {
            member1: string | undefined,
            member2: string | undefined,
            member3: string | undefined,
            member4: string | undefined,
            phone1: string | undefined,
            phone2: string | undefined,
            phone3: string | undefined,
            phone4: string | undefined,
        };
        team: string | undefined;
        category: string | undefined,
        school: string | undefined
    }

    const initialState: RegistrationData = {
        password: v4(),
        members: {
            member1: "",
            member2: "",
            member3: "",
            member4: "",
            phone1: "",
            phone2: "",
            phone3: "",
            phone4: ""
        },
        team: "Team 1",
        category: "Interschool (Junior)",
        school: "Jalpaiguri Zilla School"

    }
    const [data, setData] = React.useState<RegistrationData>(initialState)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target;
        if (id === 'member1' || id === 'member2' || id === "member3" || id === "member4" || id === "phone1" || id === "phone2" || id === "phone3" || id === "phone4") {
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
    }


    function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        const { id, value } = e.currentTarget;
        setData(prevState => ({
            ...prevState,
            [id]: value
        }));

    }

    return (
        <form className="flex w-full h-full flex-col gap-7 justify-evenly items-center p-4">
            <h1 className="dark:text-[rgb(102,82,82)] text-3xl font-medium">REGISTRATION</h1>
            <div>
                <div className="mb-2 block w-[35vw]">
                    <Label htmlFor="password" value="Team Password" />
                </div>
                <TextInput disabled id="password" type="text" value={data?.password} required />
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
                <div className="mb-2 block w-[35vw]">
                    <Label htmlFor="phone1" value="Phone no. of the 1st member" />
                </div>
                <TextInput id="phone1" type="text" placeholder="Enter the phone no. of 1st member" value={data?.members.phone1} onChange={handleChange} required />
            </div>
            <div>
                <div className="mb-2 block w-[35vw]">
                    <Label htmlFor="phone2" value="Phone no. of the 2nd member" />
                </div>
                <TextInput id="phone2" type="text" placeholder="Enter the phone no. of 2nd member" value={data?.members.phone2} onChange={handleChange} required />
            </div>
            <div>
                <div className="mb-2 block w-[35vw]">
                    <Label htmlFor="phone3" value="Phone no. of the 3rd member" />
                </div>
                <TextInput id="phone3" type="text" placeholder="Enter the phone no. of 3rd member" value={data?.members.phone3} onChange={handleChange} required />
            </div>
            <div>
                <div className="mb-2 block w-[35vw]">
                    <Label htmlFor="phone4" value="Phone no. of the 4th member" />
                </div>
                <TextInput id="phone4" type="text" placeholder="Enter the phone no. of 4th member" value={data?.members.phone4} onChange={handleChange} required />
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
                <div className="mb-2 block">
                    <Label htmlFor="school" value="Select your school" />
                </div>
                <Select className="w-[35vw]" id="school" value={data?.school} onChange={handleSelect} required>
                    <option value={"Jalpaiguri Zilla School"}>Jalpaiguri Zilla School</option>
                    <option value={"Fanindra Deb Institution"}>Fanindra Deb Institution</option>
                    <option value={"Sonaulla Higher Secondary School"}>Sonaulla Higher Secondary School</option>
                    <option value={"Ashalata Basu Vidyalaya"}>Ashalata Basu Vidyalaya</option>
                    <option value={"Sunitibala Sadar Girls High School"}>Sunitibala Sadar Girls High School</option>
                    <option value={"Jalpaiguri Govt. Girls' High School"}>Jalpaiguri Govt. Girls' High School</option>
                    <option value={"Central Girls High School"}>Central Girls High School</option>
                    <option value={"Kadamtala Girls' High School"}>Kadamtala Girls' High School</option>
                </Select>
            </div>
            <Button className="w-[35vw]">Register</Button>
        </form>
    );
}
