import * as types from './actionType';
import axios from 'axios';

const getusers = (users) => ({
    type: types.GET_USERS,
    payload: users,


});
const getUser =(user) => ({
    type: types.GET_SINGLE_USER,
    payload:user,

});
const usersAdded = (users) => ({
    type: types.ADD_USERS,
    payload: users,


});
const userUpdated = () => ({
    type:types.UPDATE_USER
})
const userDeleted = (users) => ({
    type: types.DELETE_USERS,
    payload: users,

});

export const loadusers = () => {
    return function (dispatch) {
        axios.get(`http://localhost:5000/user`)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(getusers(resp.data));
            })
            .catch((error) => console.log(error));


    };

};
export const deleteUsers = (id) => {
    return function (dispatch) {
        axios.delete(`http://localhost:5000/user/${id}`)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(userDeleted());
                dispatch(loadusers(id))
            })
            .catch((error) => console.log(error));


    };


};
export const addUsers = (user) => {
    return function (dispatch) {
        axios.post(`http://localhost:5000/user`,user)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(usersAdded());
                dispatch(loadusers())
            })
            .catch((error) => console.log(error));


    };
};

export const getSingleUser = (id) => {
    return function (dispatch) {
        axios.get(`http://localhost:5000/user/${id}`)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(getUser(resp.data));
                // dispatch(loadusers(id))
            })
            .catch((error) => console.log(error));


    };
};
export const updateUser = (user,id) => {
    return function (dispatch) {
        axios.put(`http://localhost:5000/user/${id}`,user)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(userUpdated());
                // dispatch(loadusers(id))
            })
            .catch((error) => console.log(error));


    };
};