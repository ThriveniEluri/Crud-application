import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUsers,  loadusers } from '../reducx/action';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useHistory } from 'react-router';
const usebuttonStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}))

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);
const useStyles = makeStyles({
    table: {
        marginTop: 100,

        minWidth: 900,
    },
});

function Home(props) {
    const classes = useStyles();
    const buttonstyles = usebuttonStyles();
    let history = useHistory();
    let dispatch = useDispatch();
    const { users } = useSelector(state => state.data)
    useEffect(() => {
        dispatch(loadusers());
    }, []);
    const handleDelete = (id) => {
        if (window.confirm("Are you sure wanted to delete the user ?")) {
            dispatch(deleteUsers(id))
        }
    }

    const handleRoute = (users)=>{
      const d =   (props.location && props.location.state) || {};
      console.log("data from localtion state",d)

        console.log("users edit route")
            history.push({ pathname: `/edituser/${users.id}`,
            state: users})
    }


    return (
        <div>
            <div className={buttonstyles.root}>
                <Button color='primary' variant="contained" onClick={() => history.push('/adduser')}>Add User</Button>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Contact</StyledTableCell>
                            <StyledTableCell align="center">Address</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map((user) => (
                            <StyledTableRow key={user.id}>
                                <StyledTableCell component="th" scope="row">
                                    {user.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">{user.email}</StyledTableCell>
                                <StyledTableCell align="center">{user.contact}</StyledTableCell>
                                <StyledTableCell align="center">{user.address}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <div className={buttonstyles.root}>
                                        <ButtonGroup variant="contained" aria-label="contained primary button group">
                                            <Button style={{ marginRight: '5px' }} color="secondary" onClick={() => handleDelete(user.id)}>Delete</Button>
                                            <Button color="primary" onClick = {()=>history.push(`/editUser/${user.id}`)}>Edit</Button>

                                        </ButtonGroup>
                                    </div>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Home