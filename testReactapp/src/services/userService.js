import http from "./httpService"
import {apiurl} from "../config.json"

 export function register(user) {
     return ( 
         http.post(apiurl,{
             email:user.usename,
             password:user.password,
             name:user.name
         })
      );
 }
 