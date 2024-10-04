import { useEffect } from "react"
import { useAuth } from "../../contexts/useAuth"

type Props = {}

const Logout = ( props: Props ) =>
{
    const { logout } = useAuth()

    useEffect( () =>
    {
        logout();
    }, [] )
    return null
}

export default Logout