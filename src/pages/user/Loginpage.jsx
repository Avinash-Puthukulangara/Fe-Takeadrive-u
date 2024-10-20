import React from 'react'
import { useForm } from 'react-hook-form'

export const Loginpage = () => {
    const { register, handleSubmit } = useForm()

    const onSubmit = (data) => {
      console.log(data)
    }

  return (
    <div>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Email" {...register("email")}/>
          <input type="password" placeholder="Password" {...register("password")}/>
          <button type="submit">Login</button>
        </form>
      <a href="/sign-up">Don't have an account? Sign up</a>
    </div>
  )
}
