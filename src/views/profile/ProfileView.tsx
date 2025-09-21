import ProfileForms from "../../components/profile/ProfileForms"
import { useAuth } from "../../hooks/useAuth"


export const ProfileView = () => {

    const {data, isLoading} = useAuth()

    if(isLoading) return 'Cargando...'
    if(data) return <ProfileForms data={data}/>
}
