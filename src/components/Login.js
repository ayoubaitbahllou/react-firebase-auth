import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { 
    Card,
    CardHeader,
    CardContent,
    Box,
    TextField,
    Button,
    FormGroup,
    IconButton
} from '@mui/material';

import { Google, Facebook } from '@mui/icons-material';

export default function Login({ login, LoginWithGoogle, LoginWithFacebook }) {
    let navigate = useNavigate();

    useEffect(() => {
      if(sessionStorage.getItem('Auth Token') !== null) {
        navigate("/dashboard")
      }
    }, []);

    const [emailInput, setEmailInput] = useState("");
    const [pwdInput, setPwdInput] = useState("");

    const LoginAction = () => {
        login(emailInput, pwdInput);
    }

    return (  
        <Card variant="outlined" className="center">
            <CardContent>
                <Box
                    component="form"
                    autoComplete="off"
                    className="m-auto">
                    <FormGroup className="f-grp">
                        <h2>Login</h2>
                    </FormGroup>
                    <FormGroup className="f-grp">
                        <TextField 
                            label="Email" 
                            variant="outlined" 
                            onChange={e => setEmailInput(e.target.value)} 
                            value={emailInput} />
                    </FormGroup>
                    <FormGroup className="f-grp">
                        <TextField 
                            type="password" 
                            label="Password" 
                            variant="outlined" 
                            onChange={e => setPwdInput(e.target.value)} 
                            value={pwdInput} />
                    </FormGroup>
                    <FormGroup className="f-grp" >
                        <Button 
                            variant="contained" 
                            style={{ "marginBottom": "10px" }}
                            onClick={LoginAction}>Log in</Button>
                        <Button 
                            variant="outlined" 
                            onClick={() => navigate('/register')}>Register</Button>
                        <p style={{ "marginBottom": "10px", "textAlign": "center" }} >Login with</p> 
                        <div style={{ "display": "flex", "justifyContent": "space-between" }}>
                            <Button variant="outlined" startIcon={<Google />} onClick={() => LoginWithGoogle()}>
                                Google
                            </Button>
                            <Button variant="outlined" startIcon={<Facebook />} onClick={() => LoginWithFacebook()}>
                                Facebook
                            </Button>
                        </div> 
                    </FormGroup>
                    
                </Box>  
            </CardContent>
        </Card>
    )
}