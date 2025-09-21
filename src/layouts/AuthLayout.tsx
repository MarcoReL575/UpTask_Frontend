import { Link, Outlet } from "react-router-dom"
import { Logo } from "../components/Logo"
import { Bounce, ToastContainer } from "react-toastify"

export const AuthLayout = () => {
  return (
    <>
        <div className="bg-olivine-950 min-h-screen">
            <div className="py-10 lg:py-20 mx-auto w-[450px]">
                <Link to='/auth/login'>
                    <Logo />
                </Link>

                <div className="mt-10">
                    <Outlet />
                </div>
            </div>
        </div>
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
