// import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';

import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"


const Header = () => {
  return (
    <div className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="container mx-auto px-3 py-4 flex items-center justify-between">
          <Link href="/">
            <Image 
              src={"/Logo.webp"}
              alt="Project"
              height={50}
              width={150}
              className="h-11 w-auto object-contain"
            />
          </Link>

            <div>
              <SignedIn>
                <Link href={"/dashboard"}>
                  <Button variant="outline">Login</Button>
                </Link>
              </SignedIn>

              <SignedOut>
                <SignInButton forceRedirectUrl="/dashboard">
                  <Button variant="outline">Login</Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
      </nav>
    </div>
  )
}

export default Header

