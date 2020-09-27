import axios from 'axios';


const instance=axios.create({
    baseURL:'https://food-builder-bc122.firebaseio.com/'
});


instance.interceptors.request.use(request=>{
    return request;
},err=>{
    return Promise.reject(err);
});

instance.interceptors.response.use(response=>{
    return response;
},err=>{
    return Promise.reject(err);
});


export default instance;