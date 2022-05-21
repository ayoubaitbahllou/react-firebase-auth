import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    CardContent, 
    Box,
    Card
} from '@mui/material';

export default function Dashboard() {
    let navigate = useNavigate();

    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        if (!authToken) {
            navigate('/')
        }
    }, [])

    return (
        <Card variant="outlined" className="center">
            <CardContent>
                <Box
                    component="form"
                    autoComplete="off"
                    className="m-auto">
                        You are connected !
                </Box>  
            </CardContent>
        </Card>
    )
}