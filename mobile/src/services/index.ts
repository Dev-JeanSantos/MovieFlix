import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const  api = axios.create({
    baseURL: 'https://djs-movieflix.herokuapp.com/',
});

export const TOKEN = 'Basic bW92aWVmbGl4Om1vdmllZmxpeDEyMw==';

export async function userToken(){
    const token = await AsyncStorage.getItem('@token')
    return token;
}


//Chamadas ao Backend 
export async function getMovies(){

    const authToken = await userToken(); 
    const res = api.get(
        `/movies`,{
            headers:{
                'Authorization': `Bearer ${authToken}`,
            },
        });
    return res;
}

export async function getMoviesByGenre(){

    const authToken = await userToken(); 
    const res = api.get(`/movies`,{
            headers:{
                'Authorization': `Bearer ${authToken}`,
            },
        });
    return res;
}

export async function getMoviesById(id: number){

    const authToken = await userToken(); 
    const res = api.get(
        `/movies/${id}`,{
            headers:{
                'Authorization': `Bearer ${authToken}`,
            },
        });
    return res;
}

export async function saveAvaliation(data: object){
    const authToken = await userToken(); 
    
    const res = api.post(`/reviews`, data,{
            headers:{
                'Authorization': `Bearer ${authToken}`,
            },
        });
    return res;
}
export async function getGenres(){

    const authToken = await userToken(); 
    const res = api.get(
        `/genres`,{
            headers:{
                'Authorization': `Bearer ${authToken}`,
            },
        });
    return res;
}