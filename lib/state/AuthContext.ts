"use client"

import { createContext, Dispatch, SetStateAction } from 'react';
import type { User } from '../auth';

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
