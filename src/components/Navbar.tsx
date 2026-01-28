"use client";

import { useState } from "react";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import {
  BookOpenIcon,
  HomeIcon,
  UserIcon,
  BarChart2Icon,
  GlobeIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface NavLink {
  href: string;
  label: string;
  icon?: React.ReactNode; // icon is optional
}

const Navbar = () => {
  const { isSignedIn } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Signed-in links with icons
  const authLinks: NavLink[] = [
    { href: "/", label: "Home", icon: <HomeIcon size={16} /> },
    { href: "/generate-program", label: "Generate", icon: <BookOpenIcon size={16} /> },
    { href: "/focus", label: "Focus", icon: <BarChart2Icon size={16} /> },
    { href: "/career-guide", label: "Career Guide", icon: <GlobeIcon size={16} /> },
    { href: "/profile", label: "Profile", icon: <UserIcon size={16} /> },
  ];

  // Guest links without icons
  const guestLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  // Determine which links to show
  const linksToShow = isSignedIn ? authLinks : guestLinks;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md shadow-sm py-3">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="p-1 bg-primary/10 rounded">
            <BookOpenIcon className="w-4 h-4 text-primary" />
          </div>
          <span className="text-lg font-bold font-mono">
            Edu<span className="text-primary">Mentor</span>
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-6 text-sm">
          {linksToShow.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              {link.icon && <span>{link.icon}</span>} {link.label}
            </Link>
          ))}
        </nav>

        {/* USER BUTTONS DESKTOP */}
        <div className="hidden md:flex items-center gap-2">
          {isSignedIn ? (
            <UserButton />
          ) : (
            <>
              <SignInButton>
                <Button
                  variant="outline"
                  className="border-primary/50 text-primary hover:text-white hover:bg-primary/10 text-sm"
                >
                  Sign In
                </Button>
              </SignInButton>

              <SignUpButton>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm">
                  Sign Up
                </Button>
              </SignUpButton>
            </>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-200 transition"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/90 backdrop-blur-md border-t border-gray-200 shadow-md">
          <div className="flex flex-col p-4 gap-3">
            {linksToShow.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-100 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon && <span>{link.icon}</span>} {link.label}
              </Link>
            ))}

            {/* MOBILE USER BUTTONS */}
            <div className="flex flex-col gap-2 mt-2">
              {isSignedIn ? (
                <UserButton />
              ) : (
                <div className="flex flex-col gap-2">
                  <SignInButton>
                    <Button
                      variant="outline"
                      className="border-primary/50 text-primary hover:text-white hover:bg-primary/10 w-full text-sm"
                    >
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full text-sm">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
