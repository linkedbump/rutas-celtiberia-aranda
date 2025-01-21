export interface User {
                uid?: string;
                email: string;
                name: string;
                displayName: string;
                emailVerified: boolean;
                createdAt: Date;
                lastLogin?: Date;
                photoURL?: string;
                isActive?: boolean;
                role?: 'user' | 'admin';
                // agregar más campos según necesidades
              }
              
              // podemos crear una interfaz para el registro que solo incluya
              // los campos necesarios durante el proceso de registro
              export interface UserRegistration {
                email: string;
                name: string;
                password: string;
              }
              
              // Y otra para la respuesta del registro si es necesario
              export interface RegistrationResponse {
                success: boolean;
                user: any;
                message?: string;
              }