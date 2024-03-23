import { useUser } from "@clerk/clerk-react";
import { createContext, useEffect, useState } from 'react';


const initialState = {
  userId: null,
};
export const UserContext = createContext(initialState);

export default function UserContextProvider ({ children }) {
  const [userId, setUserId] = useState(null);
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user, userId]);

  const ctxValue = {
    userId: userId,
  };

  return (
    <UserContext.Provider value={ctxValue}>
      {children}
    </UserContext.Provider>
  );
}