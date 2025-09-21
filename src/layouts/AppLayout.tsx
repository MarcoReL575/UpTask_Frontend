import { Link, Navigate, Outlet } from "react-router-dom"
import { Bounce, ToastContainer} from 'react-toastify';
import { Logo } from "../components/Logo"
import { NavMenu } from "../components/NavMenu"
import { useAuth } from "../hooks/useAuth";

export const AppLayout = () => {

    const { data, isError, isLoading } = useAuth()

    if(isLoading) return 'Cargando...'
    if(isError) {
        return <Navigate to='/auth/login'  />
    }

  if (data) return (
    <>
        <header className="bg-olivine-800 py-5 px-10 text-white">
            <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center pr-10">
                <Link 
                    to='/'
                    className="w-64 "
                >
                    <Logo />
                </Link>
                <NavMenu 
                    name={data.name}
                />
            </div>
        </header>

        <section className="max-w-screen-2xl mx-auto mt-10 p-5">
            <Outlet />
        </section>
        
        <footer className="py-5">
            <p className="text-center">
                Todos los derechos reservados, Marco Reyes {new Date().getFullYear()}
            </p>
        </footer>
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
