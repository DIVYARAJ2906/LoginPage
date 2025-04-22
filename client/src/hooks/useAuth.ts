import { useMutation } from "@tanstack/react-query"
import { loginUser, registerUser } from "../api/authApi"
import { AuthResponse, LoginCredentials, RegisterCredentials } from "../types/types"

interface UseLoginOptions {
  onSuccess?: (data: AuthResponse) => void;
  onError?: (error: Error) => void;
}

interface UseRegisterOptions {
  onSuccess?: (data: AuthResponse) => void;
  onError?: (error: Error) => void;
}

export const useLogin = (options?: UseLoginOptions) => {
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await loginUser(credentials)

      if (!response.success) {
        throw new Error(response.message || "Login failed")
      }

      return response as AuthResponse
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  })
}

export const useRegister = (options?: UseRegisterOptions) => {
  return useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      const response = await registerUser(credentials)

      if (!response.success) {
        throw new Error(response.message || "Registration failed")
      }

      return response as AuthResponse
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  })
}
