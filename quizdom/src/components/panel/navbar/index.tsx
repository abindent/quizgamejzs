// NEXTJS
import { usePathname } from "next/navigation";
import Link from "next/link";
// FLOWBITE
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle, DarkThemeToggle } from "flowbite-react";

export default function AppBar() {
    const path = usePathname();
    return (
        <Navbar className="dark:bg-gradient-to-r dark:from-indigo-500 dark:via-purple-600 dark:to-pink-500" fluid rounded>
            <NavbarBrand as={Link} href="/">
                <img src="/icon.png" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Quizdom</span>
            </NavbarBrand>
            <NavbarToggle />
            <NavbarCollapse>
                <NavbarLink href="/" active={Boolean(path.endsWith("/"))}>
                    Home
                </NavbarLink>
                <NavbarLink href="/quiz/question" active={Boolean(path.match("/quiz/question"))}>Questions</NavbarLink>
                <NavbarLink href="/quiz/answer" active={Boolean(path.match("/quiz/answer"))}>Answers</NavbarLink>
                <NavbarLink href="/admin/stats" active={Boolean(path.match("/admin/stats"))}>Statistics</NavbarLink>
            </NavbarCollapse>
            <DarkThemeToggle className="dark:text-gray-600" />
        </Navbar>
    );
}
