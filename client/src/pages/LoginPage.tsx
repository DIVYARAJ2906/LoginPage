"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useLogin, useRegister } from "../hooks/useAuth"
import { RegisterFormData, LoginFormData, registerSchema, loginSchema } from "../zod/schema"

const LoginPage = () => {
  const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(null)
  const [isRegister, setIsRegister] = useState(false)

  const {
    register: registerLoginForm,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const {
    register: registerRegisterForm,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { mutate: login, isPending: isLoginPending } = useLogin({
    onError: (error: Error) => {
      setMessage({ text: error.message, type: 'error' })
    },
    onSuccess: () => {
      setMessage({ text: "Login successful!", type: 'success' })
    }
  })

  const { mutate: registerUser, isPending: isRegisterPending } = useRegister({
    onError: (error: Error) => {
      setMessage({ text: error.message, type: 'error' })
    },
    onSuccess: () => {
      setIsRegister(false)
      setMessage({ text: "Registration successful! Please login.", type: 'success' })
    },
  })

  const onLoginSubmit = (data: LoginFormData) => {
    setMessage(null)
    login(data)
  }

  const onRegisterSubmit = (data: RegisterFormData) => {
    setMessage(null)
    registerUser(data)
  }

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1 className="login-title">{isRegister ? "Create Account" : "Welcome back!"}</h1>

        {!isRegister ? (
          <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="login-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="email"
                {...registerLoginForm("email")}
                className={`form-input ${loginErrors.email ? "error" : ""}`}
              />
              {loginErrors.email && <p className="error-message">{loginErrors.email.message}</p>}
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                {...registerLoginForm("password")}
                className={`form-input ${loginErrors.password ? "error" : ""}`}
              />
              {loginErrors.password && <p className="error-message">{loginErrors.password.message}</p>}
            </div>

            {message && (
              <p className={message.type === 'error' ? "api-error-message" : "api-success-message"}>
                {message.text}
              </p>
            )}

            <button type="submit" className="login-button" disabled={isLoginPending}>
              {isLoginPending ? "Logging in..." : "Login"}
            </button>

            <p className="toggle-form">
              Don't have an account?{" "}
              <button type="button" onClick={() => setIsRegister(true)} className="toggle-button">
                Register
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit(onRegisterSubmit)} className="login-form">
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                {...registerRegisterForm("email")}
                className={`form-input ${registerErrors.email ? "error" : ""}`}
              />
              {registerErrors.email && <p className="error-message">{registerErrors.email.message}</p>}
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                {...registerRegisterForm("password")}
                className={`form-input ${registerErrors.password ? "error" : ""}`}
              />
              {registerErrors.password && <p className="error-message">{registerErrors.password.message}</p>}
            </div>

            {message && (
              <p className={message.type === 'error' ? "api-error-message" : "api-success-message"}>
                {message.text}
              </p>
            )}

            <button type="submit" className="login-button" disabled={isRegisterPending}>
              {isRegisterPending ? "Registering..." : "Register"}
            </button>

            <p className="toggle-form">
              Already have an account?{" "}
              <button type="button" onClick={() => setIsRegister(false)} className="toggle-button">
                Login
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

export default LoginPage
