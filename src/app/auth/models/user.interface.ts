export interface AppUser {
    uid: string;
    email: string;
    name: string;
    createdAt: Date;
    avatar: string;
    photoURL?: string; // URL de la foto de Google
  }
  

export interface UserRegistration {
    email: string;
    name: string;
    password: string;
}

export interface RegistrationResponse {
    success: boolean;
    user: any;
    message?: string;
}