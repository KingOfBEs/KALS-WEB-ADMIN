import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid2"
import { useForm } from "react-hook-form"
import { z } from "zod"
import FormProvider from "../../components/hook-form/FormProvider"
import RHFTextField from "../../components/hook-form/RHFTextField"
import { useAuth } from "../../contexts/useAuth"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const LoginSchema = z.object( {
    usernameOrPhoneNumber: z.string().min( 1 ),
    password: z.string().min( 1 )
} )
export type LoginValues = z.infer<typeof LoginSchema>
interface Props { }
const LoginPage = ( props: Props ) =>
{
    const navigate = useNavigate();
    const { login, isLoggedIn } = useAuth();
    const methods = useForm<LoginValues>( {
        resolver: zodResolver( LoginSchema ),
        defaultValues: {
            usernameOrPhoneNumber: '',
            password: ''
        }
    } );
    const {
        handleSubmit
    } = methods;
    const handleLogin = async ( data: LoginValues ) =>
    {
        login( data )
    }
    useEffect( () =>
    {
        if ( isLoggedIn() ) navigate( '/admin' )
    }, [] )
    return (
        <Container maxWidth="lg">
            <Box sx={ { height: '100vh' } }>
                <Grid container spacing={ 2 }>
                    <Grid size={ 6 } sx={ { display: "flex", height: '100vh' } } justifyContent={ "center" } alignItems={ "center" } alignContent={ "center" }>
                        <img width={ '100%' } src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/250px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg" alt="ronaldo" />
                    </Grid>
                    <Grid size={ 6 } sx={ { display: "flex", height: '100vh' } } justifyContent={ "center" } alignItems={ "center" } alignContent={ "center" }>
                        <FormProvider onSubmit={ handleSubmit( handleLogin ) } methods={ methods } >
                            <Box sx={ {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 4,
                                margin: 'auto',
                                width: 500,
                                justifyContent: 'center',
                                alignItems: 'center',
                            } }
                            >
                                <Typography variant='h3'>Login</Typography>
                                <RHFTextField sx={ { width: '100%' } } name='usernameOrPhoneNumber' label='Username' required />
                                <RHFTextField name='password' label='Password' type='password' required />
                                <Button fullWidth type='submit' variant='contained' color='primary' sx={ { borderRadius: 0, py: 2 } }>Login</Button>
                            </Box>
                        </FormProvider>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default LoginPage