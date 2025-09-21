import { useForm } from "react-hook-form";
import type { UserLoginForm } from "../../types";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authenticateUser } from "../../api/AuthAPI";
import { toast } from "react-toastify";


export default function LoginView() {

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
  const navigate = useNavigate()
  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error)=> {
        toast.error(error.message)
    },
    onSuccess: ()=> {
        navigate('/')
    }
  })

  const handleLogin = (formData: UserLoginForm) => mutate(formData)

  return (
    <section className="w-md bg-white p-10 rounded-lg">
        <h1 className="text-5xl font-black">Iniciar sesión</h1>
        <p className="text-2xl font-light mt-5">
            Comineza a planear tus proyectos{''} y
            <span className=" text-olivine-400 font-bold"> iniciando sesión en este formulario</span>
        </p>
        <form
            onSubmit={handleSubmit(handleLogin)}
            className="space-y-8 mt-5"
            noValidate
        >
            <div className="flex flex-col gap-5">
            <label
                className="font-normal text-2xl"
            >Email</label>

            <input
                id="email"
                type="email"
                placeholder="Email de Registro"
                className="w-full p-3  border-gray-300 border"
                {...register("email", {
                required: "El Email es obligatorio",
                pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "E-mail no válido",
                },
                })}
            />
            {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
            </div>

            <div className="flex flex-col gap-5">
            <label
                className="font-normal text-2xl"
            >Password</label>

            <input
                type="password"
                placeholder="Password de Registro"
                className="w-full p-3  border-gray-300 border"
                {...register("password", {
                required: "El Password es obligatorio",
                })}
            />
            {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
            </div>

            <input
                type="submit"
                value='Iniciar Sesión'
                className="bg-olivine-600 hover:bg-olivine-700 w-full p-3  text-white font-black  text-xl cursor-pointer rounded"
            />
        </form>

        <nav className="mt-10 flex flex-col space-y-2 text-center"> 
            <div>
                <span>¿No tienes Cuenta? {' '}</span>
                <Link to={'/auth/register'} className="hover:underline text-olivine-500"> 
                    Crear una aquí
                </Link>
            </div>
            <div>
                <span>¿Olvidaste tu contraseña? {' '} </span>
                <Link  to='/auth/forgot-password' className="hover:underline text-olivine-500">
                    Reestablecer aquí
                </Link>
            </div>
        </nav>
    </section>

  )
}