import { useEffect } from "react";
// NEXTJS
import { usePathname } from "next/navigation";
import Link from "next/link";

// CONTEXT
import { useAuthContext } from "@/context/auth/state";
import { Team, ContextType } from "@/context/auth/context";

// TOAST
import { toast } from "react-toastify";

// FLOWBITE
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  DarkThemeToggle,
  Button,
} from "flowbite-react";

export default function AppBar() {
  const path = usePathname();

  const { team, isAuthenticated, getSetTeam }: ContextType = useAuthContext();

  const handleLogOut = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem("_id");
    localStorage.removeItem("_user");
    toast.success("Successfully logged out.")
    setTimeout(() => {
      window.location.reload();
    }, 2000)


  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!team.id && localStorage.getItem("_user")) {
        const _usr = JSON.parse(localStorage.getItem("_user") as string);
        const _team: Team = {
          id: _usr.id,
          team: _usr.team,
          category: _usr.category,
          member: _usr.members[0],
          role: _usr.role,
          school: _usr.school,
        };
        getSetTeam(_team);
      }
    }
  }, [team]);

  return (
    <Navbar
      className="dark:bg-gradient-to-r dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400"
      fluid
      rounded
    >
      <NavbarBrand as={Link} href="/">
        <img
          src="/icon.png"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Quizdom
        </span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="/" active={Boolean(path.endsWith("/"))}>
          Home
        </NavbarLink>
        <NavbarLink href="/about" active={Boolean(path.match("/about"))}>
          About
        </NavbarLink>
        <NavbarLink href="/quiz" active={Boolean(path.match("/quiz"))}>
          QNA
        </NavbarLink>
        {!isAuthenticated && (
          <>
            <NavbarLink
              href="/login"
              active={Boolean(path.match("/login"))}
            >
              Login
            </NavbarLink>
            <NavbarLink
              href="/register"
              active={Boolean(path.match("/register"))}
            >
              Register
            </NavbarLink></>
        )}
        {isAuthenticated && (
          <Button onClick={handleLogOut} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer" >Log Out</Button>
        )}
      </NavbarCollapse>
      <DarkThemeToggle className="dark:text-gray-600" />
    </Navbar>
  );
}
