// REACT
import * as React from "react";

// FLOWBITE
import {
  Button,
  Label,
  TextInput,
} from "flowbite-react";

// CONTEXT
import { ContextType } from "@/context/context";
import { useAuthContext } from "@/context/state";
// TOAST
import { toast } from "react-toastify";

export default function Home() {
  interface LoginData {
    _id: string | null;
    _t_password: string | null;
  }

  const loginInitialState: LoginData = {
    _id: "",
    _t_password: "",
  };

  // USESTATE DEFINITION
  const [data, setData] = React.useState<LoginData>(loginInitialState);
  const [loading, setLoading] = React.useState<Boolean>(false);

  // INPUT AND SELECT CHANGE HANDLER
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }

  // BUTTON VALIDATION
  function valiDateButton(): boolean {
    if (loading) {
      return Boolean(loading);
    } else {
      return [data._id, data._t_password].some(
        (field) => (field?.length ?? 0) < 6
      );
    }
  }

  const verified = valiDateButton();

  // CONTEXT AND AUTH
  const context = useAuthContext();
  const { login } : ContextType = context;

  

  async function handleLogin(e: React.SyntheticEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading(true);
    await login(data._id, data._t_password)
      .then((res) => {
        if (res["id"]) {
          localStorage.setItem("_user", JSON.stringify(res));
          toast.success("Successfully logged in.");
          setLoading(false);
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

  return (
    <form className="flex w-full h-full flex-col gap-7 justify-evenly items-center p-4 mb-[13.45rem]">
      <h1 className="dark:text-[rgb(102,82,82)] text-3xl font-medium">LOGIN</h1>
      <div>
        <div className="mb-2 block w-[35vw]">
          <Label htmlFor="_id" value="Enter Team ID" />
        </div>
        <TextInput
          id="_id"
          type="text"
          placeholder="Enter your team ID"
          value={data._id as string}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <div className="mb-2 block w-[35vw]">
          <Label htmlFor="_t_password" value="Enter password" />
        </div>
        <TextInput
          id="_t_password"
          type="password"
          placeholder="Enter your password"
          value={data._t_password as string}
          onChange={handleChange}
          required
        />
      </div>

      <Button className="w-[35vw]" onClick={handleLogin} disabled={verified}>
        Login
      </Button>
    </form>
  );
}
