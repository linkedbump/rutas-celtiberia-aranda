export interface UserRegistration {
  email: string;
  password: string;
  displayName?: string;
}

export interface RegistrationResponse {
  success: boolean;
  user?: any;
  message?: string;
} 