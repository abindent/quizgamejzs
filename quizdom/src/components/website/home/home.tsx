// REACT
import * as React from "react";

// UUID
import { v4 } from "uuid";

// FLOWBITE
import { Button, Clipboard, Label, Tabs, TextInput, Select } from "flowbite-react";


export default function Home() {
    interface Member {
        name: string | undefined;
        class: string | undefined

    }
    interface RegistrationData {
        password: string;
        members: {
            member1: Member,
            member2: Member,
            member3: Member,
            member4: Member
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
            member1: {
                name: "",
                class: "IX"
            },
            member2: {
                name: "",
                class: "IX"
            },
            member3: {
                name: "",
                class: "IX"
            },
            member4: {
                name: "",
                class: "IX"
            },
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
        const { id, name, value } = e.target;
        const [memberKey, field] = name.split('.');
        if (memberKey.includes("member") && memberKey && field) {
            setData(prevState => ({
                ...prevState,
                members: {
                    ...prevState.members,
                    [memberKey]: {
                        ...prevState.members[memberKey as keyof typeof prevState.members],
                        [field]: value,
                    },
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
        const { id, name, value } = e.currentTarget;
        const [memberKey, field] = name.split('.');
        if (memberKey.includes("member") && memberKey && field) {
            setData(prevState => ({
                ...prevState,
                members: {
                    ...prevState.members,
                    [memberKey]: {
                        ...prevState.members[memberKey as keyof typeof prevState.members],
                        [field]: value,
                    },
                }
            }));
        }

        else {
            setData(prevState => ({
                ...prevState,
                [id]: value
            }));
        }

    }

    function valiDateButton(type: string): boolean {
        if (type === "R") {
            return (
                Object.values(data.members).every((member) => (member?.name?.length ?? 0) < 6 && (member?.class?.length ?? 0) < 6) ||
                [data.school].some(field => (field?.length ?? 0) < 6)
            );
        } else {
            return [loginData._id, loginData._t_password].some(field => (field?.length ?? 0) < 6);
        }
    }

    const DataVerified = valiDateButton("R")
    const LoginVerified = valiDateButton("L")


    React.useEffect(() => {
        console.log(data)
    })

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
                            <Label htmlFor="_M1N" value="Name of the 1st member" />
                        </div>
                        <TextInput id="_M1N" name="member1.name" type="text" placeholder="Enter the name of 1st member " value={data?.members.member1.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="_M1C" value="Select your category" />
                        </div>
                        <Select className="w-[35vw]" id="_M1C" name="member1.class" value={data?.members.member1.class} onChange={handleSelect} required>
                            <option value={"IX"}>IX</option>
                            <option value={"X"}>X</option>
                            <option value={"XI"}>XI</option>
                            <option value={"XII"}>XII</option>
                        </Select>
                    </div>
                    <div>
                        <div className="mb-2 block w-[35vw]">
                            <Label htmlFor="_M2N" value="Name of the 2nd member" />
                        </div>
                        <TextInput id="_M2N" name="member2.name" type="text" placeholder="Enter the name of 2nd member " value={data?.members.member2.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="_M2C" value="Select your category" />
                        </div>
                        <Select id="_M2C" className="w-[35vw]" name="member2.class" value={data?.members.member2.class} onChange={handleSelect} required>
                            <option value={"IX"}>IX</option>
                            <option value={"X"}>X</option>
                            <option value={"XI"}>XI</option>
                            <option value={"XII"}>XII</option>
                        </Select>
                    </div>
                    <div>
                        <div className="mb-2 block w-[35vw]">
                            <Label htmlFor="_M3N" value="Name of the 3rd member" />
                        </div>
                        <TextInput id="_M3N" name="member3.name" type="text" placeholder="Enter the name of 3rd member " value={data?.members.member3.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="_M3C" value="Select your category" />
                        </div>
                        <Select className="w-[35vw]" id="_M3C" name="member3.class" value={data?.members.member3.class} onChange={handleSelect} required>
                            <option value={"IX"}>IX</option>
                            <option value={"X"}>X</option>
                            <option value={"XI"}>XI</option>
                            <option value={"XII"}>XII</option>
                        </Select>
                    </div>
                    <div>
                        <div className="mb-2 block w-[35vw]">
                            <Label htmlFor="_M4N" value="Name of the 4th member" />
                        </div>
                        <TextInput id="_M4N" name="member4.name" type="text" placeholder="Enter the name of 4th member " value={data?.members.member4.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="_M4C" value="Select your category" />
                        </div>
                        <Select className="w-[35vw]" id="_M4C" name="member4.class" value={data?.members.member4.class} onChange={handleSelect} required>
                            <option value={"IX"}>IX</option>
                            <option value={"X"}>X</option>
                            <option value={"XI"}>XI</option>
                            <option value={"XII"}>XII</option>
                        </Select>
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
                    <Button className="w-[35vw] mb-3" disabled={DataVerified}>Register</Button>
                </form>
            </Tabs.Item>
            <Tabs.Item color="black" title="Login">
                <form className="flex w-full h-full flex-col gap-7 justify-evenly items-center p-4 mb-32">
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

                    <Button className="w-[35vw]" disabled={LoginVerified}>Login</Button>
                </form>
            </Tabs.Item>
        </Tabs>
    );
}
