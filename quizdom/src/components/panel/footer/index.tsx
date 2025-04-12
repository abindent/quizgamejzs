// // FONTAWESOME ICONS
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faDiscord, faGithub, faInstagram, faLinkedin, faPinterest } from "@fortawesome/free-brands-svg-icons";

// FLOWBITE
import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterLink,
  FooterLinkGroup,
  FooterIcon
} from "flowbite-react";
import { FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";
 
export default function AppFooter() {
  const date = new Date();

  return (
    <Footer container className="bg-gray-50 rounded-none border-t border-gray-200">
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between md:flex-row md:items-start">
          {/* Brand Section */}
          <div className="mb-6 md:mb-0">
            <FooterBrand
              href="/"
              src="/icon.png"
              alt="Quizdom Logo"
              name="Quizdom"
              className="!text-2xl font-bold text-gray-800"
            />
          </div>

          {/* Navigation Links */}
          <FooterLinkGroup className="flex flex-col items-center md:flex-row md:space-x-8">
            <FooterLink
              href="/"
              className="text-gray-600 hover:text-primary-700 transition-colors text-lg"
            >
              Home
            </FooterLink>
            <FooterLink
              href="/about"
              className="text-gray-600 hover:text-primary-700 transition-colors text-lg"
            >
              About
            </FooterLink>
            <FooterLink
              href="/quiz"
              className="text-gray-600 hover:text-primary-700 transition-colors text-lg"
            >
              Q&A
            </FooterLink>
          </FooterLinkGroup>
        </div>

        <FooterDivider className="my-6" />

        <FooterCopyright
          by="Quizdom"
          year={date.getFullYear()}
          href="/"
          className="text-gray-600 text-center w-full"
        />
      </div>
    </Footer>
  );
}