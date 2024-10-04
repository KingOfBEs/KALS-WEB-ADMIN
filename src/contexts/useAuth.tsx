import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authApi } from "../apis/auth.api";
import { LoginValues } from "../pages/login/LoginPage";
import { UserProfile } from "../types/auth.type";
import request from "../utils/axios";

type AuthContextType = {
    user: UserProfile | null;
    login: ( loginValues: LoginValues ) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
}

const AuthContext = createContext<AuthContextType>( {} as AuthContextType );

interface AuthProviderProps
{
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ( { children }: AuthProviderProps ) =>
{
    const navigate = useNavigate();
    const [ user, setUser ] = useState<UserProfile | null>( null );
    const [ token, setToken ] = useState<string | null>( null );
    const [ isReady, setIsReady ] = useState<boolean>( false );
    useEffect( () =>
    {
        const token = localStorage.getItem( 'accessToken' );
        const user = localStorage.getItem( 'user' );
        if ( !token || !user )
        {
            navigate( '/login' );
        }

        if ( token )
        {
            setToken( token );
        }
        if ( user )
        {
            setUser( JSON.parse( user ) )
        }
        setIsReady( true );
    }, [] )

    useEffect( () =>
    {
        if ( token )
        {
            request.defaults.headers.Authorization = `Bearer ${ token }`;
        } else
        {
            delete request.defaults.headers.Authorization;
        }
    }, [ token ] );
    const login = async ( loginValues: LoginValues ) =>
    {
        await authApi.login( loginValues )
            .then( res =>
            {
                if ( res.status === 200 )
                {
                    setToken( res.data.token );
                    localStorage.setItem( 'accessToken', res.data.token );
                    localStorage.setItem( 'refreshToken', res.data.refreshToken );
                    const authUser = {
                        username: res.data.username,
                        fullName: res.data.fullName,
                        phoneNumber: res.data.phoneNumber
                    }
                    localStorage.setItem( 'user', JSON.stringify( authUser ) );
                    setUser( authUser );
                    toast.success( 'Login successfully' );
                    navigate( '/admin' );
                }
            } )
    }
    const logout = () =>
    {
        setToken( null );
        localStorage.removeItem( 'accessToken' );
        localStorage.removeItem( 'refreshToken' );
        localStorage.removeItem( 'user' );
        toast.success( 'Logout successfully' );
        navigate( '/login' );
    }
    const isLoggedIn = (): boolean => !!token;
    return (
        <AuthContext.Provider value={ { user, login, logout, isLoggedIn } }>
            { isReady && children }
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext( AuthContext );

