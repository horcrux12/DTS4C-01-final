import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { listener } from '../utils/firebase/listener';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = () => {
    // const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        listener((val) => {
            if(!val){
                navigate("/login");
            }
        });
    });
    return (
        <Box>
            <Navbar/>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "79vh",
                }}
            >
                <Outlet/>
            </Box>
            <Footer/>
        </Box>
    );
}

export default Layout;
