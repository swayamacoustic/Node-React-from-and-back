import axios from 'axios';

import {
    LOGIN_USER,
    SIGNUP_USER

} from './types';

export function loginUser(dataToSubmit) {
    const request = axios.post('/api/users/login', dataToSubmit)
                    .then(response => response.data)

 return {
     type: LOGIN_USER,
     payload: request
 }
}

export function signupUser(dataToSubmit) {
    const request = axios.post('/api/users/signup', dataToSubmit)
                    .then(response => response.data)

 return {
     type: SIGNUP_USER,
     payload: request
 }
}