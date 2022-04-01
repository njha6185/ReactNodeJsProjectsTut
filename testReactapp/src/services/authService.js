import http from "./httpService"
import {apiurl} from "../config.json"
const tokenKey ='token';

http.setJWT(getJWT());

 export async function login(email,password) {
      
        const {data:jwt}=await http.post(apiurl,{
             email,
             password
         })
         localStorage.setItem(tokenKey,jwt)
 }

 export function loginWithJWT(JWT) {
     localStorage.setItem(tokenKey,jwt)
}

 export function logout(){
    localStorage.removeItem(tokenKey);
 }

 export function getJWT(){
    localStorage.getItem(tokenKey);
 }

 export default {
     login,
     logout,
     loginWithJWT,
     getJWT
 }
 