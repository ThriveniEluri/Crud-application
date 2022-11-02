import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { addUsers } from '../reducx/action';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 100,
        "& > *": {
            margin: theme.spacing(1),
            width: '45ch',
        },
    },
}));

const AddUser=()=> {
    const classes = useStyles();
    let dispatch =useDispatch();
    let history = useHistory();
    const [state, setState] = useState({
        name: "",
        email: "",
        contact: "",
        address: "",
    });

    const[error,setError]=useState('');

    const { name, email, contact, address } = state;
    const handleInputChange =(e) => {
        let {name,value} = e.target;
        setState({...state,[name]:value})

    };
    const handleSubmit= (e) =>{
        e.preventDefault();
        if(!name || !email ||!contact ||!address){
            setError("Please fill all the required fields");
        }
        else{
            dispatch(addUsers(state));
            history.push("/");
            setError("Input field is empty")

        }

    }
    return (
        <div>
            <Button color="secondary"  variant='contained' onClick= {()=>history.push("/")}> Go Back </Button>
            {error && <h3 style = {{color: 'red'}}>{error}</h3>} 
            <h2>Add User</h2>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField required id="standard-required" label="Name" value={name} name ="name" type="text" onChange = {handleInputChange} /><br/>
                <TextField required id="standard-required" label="Email" value={email} name ="email" type="email"  onChange = {handleInputChange} /><br/> 
                <TextField required id="standard-required" label="Contact" value={contact} name ="contact" type="number" onChange = {handleInputChange} /><br/>
                <TextField required id="standard-required" label="Address" value={address} name ="address" type="text" onChange = {handleInputChange} /><br/> 
                <Button color="primary"  variant='contained' type='submit' onChange = {handleInputChange} > Submit </Button>

            </form>
        </div>
    )
}

export default AddUser;