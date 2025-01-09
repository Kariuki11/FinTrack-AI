// import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';

import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs"


const Header = () => {
  return (
    <div>
        <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
    </div>
  )
}

export default Header

