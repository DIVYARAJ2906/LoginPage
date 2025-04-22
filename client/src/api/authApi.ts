import { API_BASE_URL } from "../config"
import { LoginCredentials, RegisterCredentials } from "../types/types"

export const loginUser = async (credentials: LoginCredentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Login failed")
    }

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error("An unexpected error occurred")
  }
}

export const registerUser = async (credentials: RegisterCredentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Registration failed")
    }

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error("An unexpected error occurred")
  }
}
