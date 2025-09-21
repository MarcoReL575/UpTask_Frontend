import { useForm } from "react-hook-form"
import type { NoteFormData } from "../../types"
import { ErrorMessage } from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "../../api/NoteApi"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"

export const AddNoteForm = () => {

    const params = useParams()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)

    const projectId = params.projectId!
    const taskId = queryParams.get('viewTask')!

    const initialValues: NoteFormData = {
        content: ''
    }

    const { register, handleSubmit, reset, formState:{ errors }} = useForm({defaultValues: initialValues})

    const queryClient = useQueryClient()
    const { mutate }= useMutation({
        mutationFn: createNote,
        onError: (error)=> {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
        }
    })

    const handleAddNote = (formData: NoteFormData)=> {
        mutate({ formData, projectId, taskId })
        reset()
    }

  return (
    <form
        onSubmit={handleSubmit(handleAddNote)}
        className="space-y-3"
        noValidate
    >
        <div className="flex flex-col gap-2">
            <label className="font-bold" htmlFor="content">Crear Nota</label>
            <input 
                id="content"
                type="text"
                placeholder="Contenido de la nota"
                className="w-full p-3 border border-gray-300"
                {...register('content', {
                    required: 'El contenido de la nota es obligatorio'
                })} 
            />
            { errors.content && (
                <ErrorMessage>{errors.content.message}</ErrorMessage>
            )}
        </div>
        <div className="flex items-center justify-center mt-5">
            <input 
                type="submit"
                value='Crear nota'
                className="bg-olivine-600 hover:bg-olivine-700 py-2 px-20 text-white font-bold cursor-pointer rounded" 
            />
        </div>
    </form>
  )
}
