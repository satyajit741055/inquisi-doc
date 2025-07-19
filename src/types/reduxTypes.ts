
export interface AuthCredentials {
    email: string;
    password: string;
}

export interface RegisterData extends AuthCredentials {
    name: string;
}


export interface User {
  $id: string;
  name: string;
  email: string;
  // Add other Appwrite user properties as needed
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}