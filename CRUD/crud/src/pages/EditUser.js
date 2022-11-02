import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { useHistory ,useParams} from 'react-router';
import { useDispatch,useSelector} from 'react-redux';
import { updateUser, getSingleUser } from '../reducx/action';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 100,
        "& > *": {
            margin: theme.spacing(1),
            width: '45ch',
        },
    },
}));

const EditUser=()=> {
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
    let {id} = useParams();
    const {user} =useSelector(state=>state.data);
    const { name, email, contact, address } = state;
    useEffect(()=>{
        dispatch(getSingleUser(id))
    },[]);
    useEffect(()=>{
        if(user) {
            setState({...user});
        }
    },[user]
    );
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
            dispatch(updateUser(state,id));
            history.push("/");
            setError("Input field is empty")

        }

    }
    return (
        <div>
            <Button color="secondary"  variant='contained' onClick= {()=>history.push("/")}> Go Back </Button>
            {error && <h3 style = {{color: 'red'}}>{error}</h3>} 
            <h2>Edit User</h2>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField required id="standard-required" label="Name" value={name || ""} name ="name" type="text" onChange = {handleInputChange} /><br/>
                <TextField required id="standard-required" label="Email" value={email || ""} name ="email" type="email"  onChange = {handleInputChange} /><br/> 
                <TextField required id="standard-required" label="Contact" value={contact || ""} name ="contact" type="number" onChange = {handleInputChange} /><br/>
                <TextField required id="standard-required" label="Address" value={address || ""} name ="address" type="text" onChange = {handleInputChange} /><br/> 
                <Button color="primary"  variant='contained' type='submit' onChange = {handleInputChange} > Update </Button>

            </form>
        </div>
    )
}

export default EditUser;