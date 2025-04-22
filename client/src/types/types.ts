
export interface LoginCredentials {
    email: string
    password: string
  }
  
  export interface RegisterCredentials {
    email: string
    password: string
  }

  
export interface AuthResponse {
    success: boolean;
    message?: string;
    token?: string;
    user?: {
      id: string;
      email: string;
      name?: string;
    };
  }