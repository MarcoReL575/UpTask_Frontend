import { useState } from "react"
import NewPasswordToken from "../../components/auth/NewPasswordToken"
import NewPasswordForm from "../../components/auth/NewPasswordForm"
import type { ConfirmTken } from "../../types"

export const NewPasswordView = () => {
  const [token, setToken] = useState<ConfirmTken['token']>('')
  const [isValidToken, setIsValidToken] = useState(false)

  return (
    <section className="w-lg p-10  bg-white mt-10 rounded-lg">
      <h1 className="text-5xl font-black">Restablecer Password</h1>
      <p className="text-2xl font-light mt-5">
          Ingresa el código que recibiste{''} y
          <span className=" text-olivine-400 font-bold"> por email</span>
      </p>
      { !isValidToken ? 
        <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken} /> 
        : <NewPasswordForm token={token} />
      }
    </section>
  )
}
