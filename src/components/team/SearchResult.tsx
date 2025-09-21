import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { TeamMember } from "../../types"
import { addUSerToProject } from "../../api/TeamAPI"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"

type SearchResultProps ={
    user: TeamMember
    reset: ()=> void
}

export const SearchResult = ({user, reset}: SearchResultProps) => {

    const params = useParams()
    const projectId = params.projectId!

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: addUSerToProject,
        onError: (error)=> {
            toast.error(error.message)
        },
        onSuccess: (data)=> {
            toast.success(data)
            reset()
            queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]})
        }
    })

    const handleAddUserToProject= ()=> {
        const data = {
            projectId,
            id: user._id
        }
        mutate(data)
    }

  return (
    <>
        <p className="mt-10 text-center font-bold">Resultado: </p>
        <div className="flex justify-between items-center">
            <p>{user.name}</p>
            <button 
                className="bg-olivine-400 hover:bg-olivine-500 text-white px-10 py-3 font-bold cursor-pointer"
                onClick={handleAddUserToProject}   
            >Agregar al Proyecto</button>
        </div>  
    </>
  )
}
