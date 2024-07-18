import { Footer, FooterBrand, FooterCopyright, FooterDivider } from "flowbite-react";

export default function AppFooter() {
  return (
    <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <FooterBrand
            href="/"
            src="/icon.png"
            alt="quizdom"
            name="Quizdom"
          />
        </div>
        <FooterDivider />
        <FooterCopyright by="Quizdom" year={2024} />
      </div>
    </Footer>
  );
}
