"use client";
// REACT
import * as React from "react";

// NEXTJS
import { redirect } from "next/navigation";

// FLOWBITE
import { Button, Clipboard, Label, TextInput, Select } from "flowbite-react";

// CONTEXT
import { useAuthContext } from "@/context/state";

// UUID
import { v4 } from "uuid";

// TOAST
import { toast } from "react-toastify";

export default function Home() {
  // TYPES
  interface Member {
    name: string | undefined | null;
    class: string | undefined;
  }

  interface Team {
    password: string | undefined | null;
    team: string | undefined | null;
    category: string | undefined | null;
    school: string | undefined | null;
    role: string | null;
    members: {
      member1: Member;
      member2: Member;
      member3: Member;
      member4: Member;
    };
  }
  const InitialState: Team = {
    team: "",
    password: v4(),
    category: "Intraschool (Junior)",
    members: {
      member1: { name: "", class: "IX" },
      member2: { name: "", class: "IX" },
      member3: { name: "", class: "IX" },
      member4: { name: "", class: "IX" },
    },
    role: "Team",
    school: "",
  };

  // USESTATE DEFINITION
  const [data, setData] = React.useState<Team>(InitialState);
  const [loading, setLoading] = React.useState<Boolean>(false);

  // INPUT AND SELECT CHANGE HANDLER
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, name, value } = e.target;
    const [memberKey, field] = name.split(".");
    if (memberKey.includes("member") && memberKey && field) {
      setData((prevState) => ({
        ...prevState,
        members: {
          ...prevState.members,
          [memberKey]: {
            ...prevState.members[memberKey as keyof typeof prevState.members],
            [field]: value,
          },
        },
      }));
    } else {
      setData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  }
  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const { id, name, value } = e.currentTarget;
    const [memberKey, field] = name.split(".");
    if (memberKey.includes("member") && memberKey && field) {
      setData((prevState) => ({
        ...prevState,
        members: {
          ...prevState.members,
          [memberKey]: {
            ...prevState.members[memberKey as keyof typeof prevState.members],
            [field]: value,
          },
        },
      }));
    } else {
      setData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  }

  // BUTTON VALIDATION
  function valiDateButton(): boolean {
    if (loading) {
      return Boolean(loading);
    } else {
      return (
        Object.values(data.members).every(
          (member) =>
            (member?.name?.length ?? 0) < 6 && (member?.class?.length ?? 0) < 1
        ) || [data.school].some((field) => (field?.length ?? 0) < 6)
      );
    }
  }

  const verified = valiDateButton();

  // CONTEXT AND AUH
  const { register } = useAuthContext();

  async function handleRegister(e: React.SyntheticEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading(true);

    await register(data)
      .then((res) => {
        if (res.id) {
          toast.success("Successfully created account.");
          setLoading(false);
          setTimeout(() => {
            toast.info("Log in to your account.");
            redirect("/");
          }, 3000);
        } else {
          toast.error("Failed to login.");
          setLoading(false);
        }
      })
      .catch(() => {
        toast.error("Failed to login.");
        setLoading(false);
      });
  }

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("_user")) {
        toast.info("You are authenticated.");
        redirect("/");
      }
    }
  });

  return (
    <form className="flex w-full h-full flex-col gap-7 justify-evenly items-center p-4">
      <h1 className="dark:text-[rgb(102,82,82)] text-3xl font-medium">
        REGISTRATION
      </h1>
      <div>
        <div className="relative">
          <div className="mb-2 block w-[35vw]">
            <Label htmlFor="password" value="Team Password" />
          </div>
          <TextInput
            disabled
            id="password"
            type="text"
            value={data?.password as string}
            required
          />
          <Clipboard.WithIcon
            className="top-3/4"
            valueToCopy={data?.password as string}
          />
        </div>
      </div>
      <div>
        <div className="mb-2 block w-[35vw]">
          <Label htmlFor="_M1N" value="Name of the 1st member" />
        </div>
        <TextInput
          id="_M1N"
          name="member1.name"
          type="text"
          placeholder="Enter the name of 1st member "
          value={data?.members.member1.name as string}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="_M1C" value="Select your category" />
        </div>
        <Select
          className="w-[35vw]"
          id="_M1C"
          name="member1.class"
          value={data?.members.member1.class}
          onChange={handleSelect}
          required
        >
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
        <TextInput
          id="_M2N"
          name="member2.name"
          type="text"
          placeholder="Enter the name of 2nd member "
          value={data?.members.member2.name as string}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="_M2C" value="Select your category" />
        </div>
        <Select
          id="_M2C"
          className="w-[35vw]"
          name="member2.class"
          value={data?.members.member2.class}
          onChange={handleSelect}
          required
        >
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
        <TextInput
          id="_M3N"
          name="member3.name"
          type="text"
          placeholder="Enter the name of 3rd member "
          value={data?.members.member3.name as string}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="_M3C" value="Select your category" />
        </div>
        <Select
          className="w-[35vw]"
          id="_M3C"
          name="member3.class"
          value={data?.members.member3.class}
          onChange={handleSelect}
          required
        >
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
        <TextInput
          id="_M4N"
          name="member4.name"
          type="text"
          placeholder="Enter the name of 4th member "
          value={data?.members.member4.name as string}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="_M4C" value="Select your category" />
        </div>
        <Select
          className="w-[35vw]"
          id="_M4C"
          name="member4.class"
          value={data?.members.member4.class}
          onChange={handleSelect}
          required
        >
          <option value={"IX"}>IX</option>
          <option value={"X"}>X</option>
          <option value={"XI"}>XI</option>
          <option value={"XII"}>XII</option>
        </Select>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="category" value="Write down your category" />
        </div>
        <Select
          className="w-[35vw]"
          id="category"
          value={data?.category as string}
          onChange={handleSelect}
          required
        >
          <option value={"Interschool (Junior)"}>Intraschool (Junior)</option>
          <option value={"Interschool (Senior)"}>Intraschool (Senior)</option>
          <option value={"Intraschool (Senior)"}>Interschool (Senior)</option>
        </Select>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="team" value="Enter your team name " />
        </div>
        <TextInput
          className="w-[35vw]"
          id="team"
          placeholder="Enter your team name"
          value={data?.team as string}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <div className="w-[35vw] mb-2 block">
          <Label htmlFor="school" value="Select your school" />
        </div>
        <TextInput
          id="school"
          type="text"
          placeholder="Enter your school's name"
          value={data?.school as string}
          onChange={handleChange}
          required
        />
      </div>
      <Button
        className="w-[35vw] mb-3"
        onClick={handleRegister}
        disabled={verified}
      >
        Register
      </Button>
    </form>
  );
}
