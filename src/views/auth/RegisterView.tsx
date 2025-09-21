import { useForm } from "react-hook-form";
import type { UserRegistrationForm } from "../../types";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "../../api/AuthAPI";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function RegisterView() {
  
  const initialValues: UserRegistrationForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error)=> {
        toast.error(error.message)
    },
    onSuccess: (data)=> {
        toast.success(data)
        reset()
    }
  })

  const password = watch('password');

  const handleRegister = (formData: UserRegistrationForm) => mutate(formData)

  return (
    <>
        <section className="w-lg p-10  bg-white mt-10 rounded-lg">
            <h1 className="text-5xl font-black">Crear Cuenta</h1>
            <p className="text-2xl font-light mt-5">
                Llena el formulario para {''}
                <span className=" text-olivine-400 font-bold"> crear tu cuenta</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-8 mt-5"
                noValidate
            >
                <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="email"
                >Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email de Registro"
                    className="w-full p-3  border-gray-300 border"
                    {...register("email", {
                    required: "El Email de registro es obligatorio",
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
                >Nombre</label>
                <input
                    type="name"
                    placeholder="Nombre de Registro"
                    className="w-full p-3  border-gray-300 border"
                    {...register("name", {
                    required: "El Nombre de usuario es obligatorio",
                    })}
                />
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
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
                    minLength: {
                        value: 8,
                        message: 'El Password debe ser mínimo de 8 caracteres'
                    }
                    })}
                />
                {errors.password && (
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
                </div>

                <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                >Repetir Password</label>

                <input
                    id="password_confirmation"
                    type="password"
                    placeholder="Repite Password de Registro"
                    className="w-full p-3  border-gray-300 border"
                    {...register("password_confirmation", {
                    required: "Repetir Password es obligatorio",
                    validate: value => value === password || 'Los Passwords no son iguales'
                    })}
                />

                {errors.password_confirmation && (
                    <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                )}
                </div>

                <input
                    type="submit"
                    value='Registrarme'
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
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover= {false}
            theme="light"
            transition={Bounce}
        />
    </>
  )
}