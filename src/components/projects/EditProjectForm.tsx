import { Link, useNavigate } from "react-router-dom"
import ProjectForm from "./ProjectForm"
import { useForm } from "react-hook-form"
import type { Project, ProjectFormData } from "../../types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProject } from "../../api/ProjectAPI"
import { toast } from "react-toastify"

type EditProjectFormProps = {
    data: ProjectFormData
    projectID: Project['_id']
}

export const EditProjectForm = ({data, projectID}: EditProjectFormProps) => {
       
    const navigate = useNavigate()
    
    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description
    }})

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            //queryClient para poder ver las actualizaciones
            queryClient.invalidateQueries({queryKey : ['projects']})
            queryClient.invalidateQueries({queryKey: ['editProject', projectID]})
            
            toast.success(data);
            navigate('/')
        }
    })

    const handleForm = (formData : ProjectFormData) => {
        const data = {
            formData,
            projectID
        }
        mutate(data)
    }

  return (
    <>
        <section className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-black">Editar Proyecto</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para editar tu proyecto</p>

            <nav className="my-5">
                <Link
                    to='/'
                    className="bg-olivine-400 hover:bg-olivine-500 px-10 py-3 text-xl text-white font-black cursor-pointer transition-colors"
                >Volver a Proyectos</Link>
            </nav>

            <form
                className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                onSubmit={handleSubmit(handleForm)}
                noValidate
            >

                <ProjectForm 
                    register={register}
                    errors={errors}
                />

                <div>
                    <input 
                        type="submit"
                        value='Guardar Cambios'
                        className="bg-olivine-600 hover:bg-olivine-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors" 
                    />
                </div>
            </form>
        </section>
</>
  )
}
