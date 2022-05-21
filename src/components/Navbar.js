import React, { useEffect } from 'react'
import {
    AppBar, 
    Box,
    Toolbar,
    Typography,
    IconButton,
    MenuIcon,
    Button
} from '@mui/material';

export default function Navbar({ SignOut }) {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Auth Firebase
                </Typography>
                {
                    sessionStorage.getItem('Auth Token') === null 
                        ? <Button color="inherit" onClick={() => window.location("/")}>Login</Button>
                        : <Button color="inherit" onClick={() => SignOut()}>Logout</Button>
                }
                </Toolbar>
            </AppBar>
        </Box>
    )
}