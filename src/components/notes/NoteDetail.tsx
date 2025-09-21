import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Note } from "../../types"
import { formatDate } from "../../utils/utils"
import { deleteNote } from "../../api/NoteApi"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { useMemo } from "react"

//:projectId/tasks/:taskId/notes/:noteId

type NoteDetailProps = {
    note: Note
}

export const NoteDetail = ({note}: NoteDetailProps) => {

    const{ data, isLoading } = useAuth()
    const canDelete = useMemo(()=> data?._id === note.createdBy._id,[data])

    const params = useParams()
    const projectId = params.projectId!

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error)=> {
            toast.error(error.message)
        },
        onSuccess: (data)=> {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
        }
    })

    const handleEliminarNote = (noteId: Note['_id'])=> {
        mutate({noteId, projectId, taskId})
    }

    if(isLoading) return 'Cargando...'
  return (
    <div className="py-2 flex justify-between items-center">
        <div className="w-full">
            <div className="flex justify-between w-full items-center">
                <p>
                    {note.content} 
                </p>
                { canDelete && (
                    <button 
                        className="p-1 bg-red-500 hover:bg-red-400 rounded text-sm text-white px-5 cursor-pointer transition-colors"
                        onClick={()=> handleEliminarNote(note._id)}
                    >Eliminar</button>
                )}
            </div>
            <p className="text-xs">por: <span className="font-bold">{note.createdBy.name}</span></p>
            <p className="text-xs text-slate-500">
                {formatDate(note.createdAt)}
            </p>

        </div>
        
    </div>
  )
}
