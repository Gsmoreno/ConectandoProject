import axios from 'axios';

const api = axios.create({
    baseURL:'http://localhost:5000/api',
<<<<<<< HEAD

    // headers: {authorization: 'Bearer ' + localStorage.getItem('token-conectando')},
    // responseType: 'json',
    // validateStatus: function (status) {
    //     return status >= 200 && status < 300; // default
    //   },

    responseType: 'json',
    validateStatus: function (status) {
        return status >= 200 && status < 300; // default
    },


=======
    // headers: {authorization: 'Bearer ' + localStorage.getItem('token-conectando')},
    // responseType: 'json',
    validateStatus: function (status) {
        return status >= 200 && status < 300; // default
    },
>>>>>>> fcd888da5bccbf5ac88bae5bdff43f38b75a1c21
})

export default api;