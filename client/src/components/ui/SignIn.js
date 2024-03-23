import {   SignInButton,} from "@clerk/clerk-react";
import './auth.css'

function SignIn () {
  return (
    <SignInButton>
    <button className='auth-btn sign-in'>
      Sign in
    </button>
    </SignInButton>
  );
}

export default SignIn;