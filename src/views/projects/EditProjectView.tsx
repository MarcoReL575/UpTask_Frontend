import { Navigate, useParams } from "react-router-dom"
import { getProjectById } from "../../api/ProjectAPI"
import { useQuery } from "@tanstack/react-query"
import { EditProjectForm } from "../../components/projects/EditProjectForm"

export const EditProjectView = () => {
  const params = useParams()
  const projectID = params.projectId!
  const { data, isLoading, isError } = useQuery({
    queryKey: ['editProject', projectID],
    queryFn: () => getProjectById(projectID),
    retry: false
  })
  if(isLoading) return 'Cargando...'
  if(isError) return <Navigate to='/404' />
  if (data) return (<EditProjectForm data={data} projectID={projectID}/>
)
}
