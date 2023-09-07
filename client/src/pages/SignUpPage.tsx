 
import { Alert, Button, Container, Grid, Paper, Stack, Typography, } from '@mui/material';
import React from 'react';
import { Fragment } from 'react';
import StringValueField from '../components/forms/StringValueField';
import { useAuthContext } from '../hooks/contextHooks/useAuthContext';
import { useAuthForms } from '../hooks/formHooks/useAuthForms';

interface IAuthForm {
    name:string;
    setName:Function;
    password:string;
    setPassword: Function
}

export const SignUpForm = ({name,setName,password,setPassword}:IAuthForm) => {
    //Hooks & Contexts
    const {signUpUser,error,message} = useAuthForms();

    //Submit
    const submit = async  () => {

        await signUpUser(name,password);
        
    }
    
    //Render
    return (
        <Fragment>
            <Stack spacing={2} alignContent={"center"}>
                <Typography variant='h5' color={'primary'}> Sign Up </Typography>
                <Stack spacing={2} direction={'row'}>
                    <StringValueField label={'Enter Email'} data={name} setter={setName} />
                    <StringValueField label={'Enter Password'} data={password} setter={setPassword} />
                </Stack>
                <Button sx={{ alignItems: "center", maxWidth: 300 }} variant='outlined' onClick={async () => submit()}> Sign Up </Button>
                {error && <Alert sx={{ mb:2 }} severity="error"> {message}</Alert>}
            </Stack>
        </Fragment>

    );
}


export default function SignUpPage() {
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={12} lg={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <SignUpForm name={username} setName={setUsername} password={password} setPassword={setPassword} />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
