import { Link } from "react-router-dom"


export const NotFound = () => {
  return (
    <>
      <h1 className="font-black text-center text-4xl text-white">Página no encontrada</h1>  
      <p className="mt-10 text-white text-center">
        Tal vez quieras volver a {' '}
        <Link className="text-olivine-500" to={'/'}>Proyectos</Link>
      </p>
    </>
  )
}
