"use client";

import Link from "next/link";
import NavbarIcons from "./navbar-icons";
import SidebarToggle from "./sidebar-toggle";
import Navbar from "./navbar";

const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 w-full border-b px-6 py-4 backdrop-blur-sm transition-all duration-300 sm:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <SidebarToggle />

        <Link
          href="/"
          className="hidden pl-30 text-xl font-light tracking-widest transition-colors sm:block md:p-0"
        >
          BeautyGlow
        </Link>

        <Navbar />
        <NavbarIcons />
      </div>
    </header>
  );
};

export default Header;
