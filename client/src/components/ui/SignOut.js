import {   SignOutButton
} from "@clerk/clerk-react";
import './auth.css'
function SignOut () {
  return (
    <SignOutButton>

    <button className='auth-btn sign-out'>
      Sign out
    </button>
    </SignOutButton>
  );
}

export default SignOut;