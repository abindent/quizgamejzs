import { useEffect } from "react";
// NEXTJS
import { usePathname } from "next/navigation";
import Link from "next/link";


// CONTEXT
import { useAuthContext } from "@/context/state";
import { Team, ContextType } from "@/context/context";

// FLOWBITE
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  DarkThemeToggle,
} from "flowbite-react";

export default function AppBar() {
  const path = usePathname();

  const { team, getSetTeam }: ContextType = useAuthContext();

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
      className="dark:bg-gradient-to-r dark:from-indigo-500 dark:via-purple-600 dark:to-pink-500"
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
        <NavbarLink href="/register" active={Boolean(path.match("/register"))}>
         Register
        </NavbarLink>
      </NavbarCollapse>
      <DarkThemeToggle className="dark:text-gray-600" />
    </Navbar>
  );
}
