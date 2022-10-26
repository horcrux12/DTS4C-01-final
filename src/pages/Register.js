import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { initialFormValue, requiredValidation, initialValidationFunc, emailValidation, minMaxValidation } from '../utils/validation';
import logo from '../assets/images/logo-news.png'
import { useNavigate } from 'react-router-dom';
import { signingUp } from '../utils/firebase/register'
import { listener } from '../utils/firebase/listener';

const initialFormData = {
    email : {
        ...initialFormValue, 
        name: "email",
        title: "Email",
        validationFunc: [
            {
                initialValidationFunc,
                action: requiredValidation,
            },
            {
                initialValidationFunc,
                action: emailValidation,
            }
        ]
    },
    password : {
        ...initialFormValue, 
        name: "password",
        title: "Password",
        validationFunc: [
            {
                initialValidationFunc,
                action: requiredValidation,
            }
        ]
    }
}

const Register = () => {
    const [formData, setFormData] = useState(initialFormData)
    const [visibility, setVisibility] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        let validationRes;
        formData[e.target.name].validationFunc.every(el => {
            validationRes = el.action(e.target.value, formData[e.target.name].name, el.parameters)
            if (!validationRes.isValid) {
                return false;
            }else {
                return true;
            }
        });
        setFormData({
            ...formData,
            [e.target.name] : {
                ...formData[e.target.name],
                value: e.target.value,
                validation : validationRes
            }
        })
    }

    const handleSubmit = async () => {
        let tempFormData = formData;
        let arrIsValid = [];
        for (let [k,v] of Object.entries(tempFormData) ) {
            let tempResult;
            let resValid = v.validationFunc.every((el) => {
                tempResult = el.action(v.value, v.name, el.parameters)
                if(!tempResult.isValid){
                    return false;
                }else {
                    return true;
                }
            });

            arrIsValid.push(resValid);

            tempFormData[k] = {
                ...tempFormData[k],
                validation : tempResult
            }
        }

        setFormData({...tempFormData});
        if (!arrIsValid.includes(false)) {
            const response = await signingUp(formData.email.value, formData.password.value);
            if(response.error){
                setErrorMessage(response.data.message);
            }else{
                setErrorMessage("");
                navigate('/');
            }
        }
    }

    useEffect(() => {
        listener((val) => {
            if(val){
                navigate("/");
            }
        });
    },[]);

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: "98vh",
            width: '100%',
            bgcolor: 'secondary.main',
            transition: 'easeInOut',
            transitionDelay: 0.2
        }}
        >
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    height: [480, 420],
                    width: ['100%', 420],
                }}
            >
                <Stack height='100%' direction='column' spacing={3}>
                    <Stack width='100%' direction='column' textAlign='center' alignItems='center' spacing={1}>
                        <img src={logo} alt='logo' width={60}/>
                        <Typography variant='h4'> REGISTER </Typography>
                    </Stack>
                    <Stack width='100%' spacing={2}>
                        <FormControl fullWidth error={formData.email.validation.isValid ? false : true}>
                            <InputLabel>Email</InputLabel>
                            <OutlinedInput
                                type='email'
                                value={formData.email.value}
                                name={formData.email.name}
                                onChange={handleOnChange}
                                label={formData.email.name}
                            />
                            {formData.email.validation.isValid ? null : (
                                <FormHelperText>{formData.email.validation.message}</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={formData.password.validation.isValid ? false : true}>
                            <InputLabel>Password</InputLabel>
                            <OutlinedInput
                                type={visibility ? 'text' : 'password'}
                                value={formData.password.value}
                                name={formData.password.name}
                                onChange={handleOnChange}
                                label={formData.password.name}
                                
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton
                                            onClick={() => {setVisibility(!visibility)}}
                                        >
                                            {visibility ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {formData.password.validation.isValid ? null : (
                                <FormHelperText>{formData.password.validation.message}</FormHelperText>
                            )}
                        </FormControl>
                        {(errorMessage)? <Typography variant='caption' color='red'>{errorMessage}</Typography>:null}
                        <Button variant='contained' onClick={handleSubmit}>Register</Button>
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    );
}

export default Register;
