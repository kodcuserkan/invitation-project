export type PermissionType = 'readPosts' | 'writePosts' | 'readMessages' | 'writeMessages' | 'readProfile' | 'writeProfile';

export interface Permissions {
  readPosts: boolean;
  writePosts: boolean;
  readMessages: boolean;
  writeMessages: boolean;
  readProfile: boolean;
  writeProfile: boolean;
}

export interface UserType {
  id: string;
  userName: string;
  password?: string;
  email: string;
  firstName: string;
  lastName: string;
  permissions: Permissions;
  isAdmin: boolean;
  invitedBy?: string[];
  invitedUsers?: string[];
}

export interface AuthContextData {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

export interface IAuthState {
  expiresAt: number;
}

export interface ILogin {
  authResponse: IAuthState;
  isLogin: () => boolean;
  isValidate : () => boolean;
  setAuthResponse: (authResponse: IAuthState) => void;
}

interface SignInResponse {
  user_id: string;
  username: string;
  email: string;
  phone: string;
  additional_info: string;
  sessions: string[];
  token: string;
}

interface VerifyProps {
  phone: string;
  username: string;
  redirectUri: string;
}

interface VerifyResponse {
  user_id: string;
  username: string;
  email: string;
  jwt_token: string;
  expires_in: number;
}
