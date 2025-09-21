import { useQuery } from "@tanstack/react-query"
import { Navigate, useLocation, useParams } from "react-router-dom"
import { getTaskById } from "../../api/TaskAPI"
import EditTaskModal from "./EditTaskModal"

export const EditTaskData = () => {
    
    const params = useParams()
    const projectId = params.projectId!
    
    const location = useLocation()
    const queryParamas= new URLSearchParams(location.search)
    const taskId = queryParamas.get('editTask')!
    
    const { data, isError } = useQuery({
        queryKey: ['task', taskId],
        queryFn: ()=> getTaskById({projectId, taskId}),
        enabled: !!taskId //el doble !! es para obtener un valor true si es que existe o un valor false si no existe
        
    })

    if(isError) return <Navigate to={'/404'}/>
    if(data) return <EditTaskModal data={data} taskId={taskId} />
}
