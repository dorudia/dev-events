"use client";
import Image from "next/image";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icons/logo.png"
            alt="Logo"
            width={28}
            height={28}
            className="w-auto h-auto"
          />
          <p className="hidden md:inline">DevEvent</p>
        </Link>
        <div className="flex">
          <ul className="mr-4">
            {/* <Link href="/">Home</Link> */}

            <Link href="/events">Events</Link>

            <Link href="/event/create">Create Event</Link>
          </ul>
          <div>
            {/* <SignedOut>
              <SignInButton>
                <button className="bg-[#836be3] text-ceramic-white rounded-sm font-medium text-sm sm:text-base px-4 py-1 ml-3 sm:px-5 cursor-pointer">
                  Sign in
                </button>
              </SignInButton> */}
            {/* <SignUpButton>
                <button className="bg-[#836be3] text-ceramic-white rounded-sm font-medium text-sm sm:text-base px-4 py-1 ml-3 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton> */}
            {/* </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn> */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
