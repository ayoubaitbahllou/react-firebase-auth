import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { 
    Card,
    CardHeader,
    CardContent,
    Box,
    TextField,
    Button,
    FormGroup
} from '@mui/material';

export default function Register({ register }) {
    let navigate = useNavigate();

    useEffect(() => {
        if(sessionStorage.getItem('Auth Token') !== null) {
          navigate("/dashboard")
        }
    }, []);

    const [emailInput, setEmailInput] = useState("");
    const [pwdInput, setPwdInput] = useState("");

    const RegisterAction = () => {
        register(emailInput, pwdInput);
    }


    return (  
        <Card variant="outlined" className="center">
            <CardContent>
                <Box
                    component="form"
                    autoComplete="off"
                    className="m-auto">
                    <FormGroup className="f-grp">
                        <h2>Register</h2>
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
                    <FormGroup className="f-grp">
                        <Button 
                            variant="contained" 
                            style={{ "marginBottom": "10px" }}
                            onClick={RegisterAction}>Register</Button>
                        <Button 
                            variant="outlined" 
                            onClick={() => navigate("/")} >Log in</Button>
                    </FormGroup>
                </Box>  
            </CardContent>
        </Card>
    )
}