import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from "./App"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css'
//import ChangeProject from './components/changesProject';
import AppM from './AppM';
import {BrowserRouter} from 'react-router-dom'




ReactDOM.render(
  <React.StrictMode>
    {/* <ChangeProject /> */}
    {/* <App /> */}
     <BrowserRouter > <AppM /> </ BrowserRouter>
    {/* <Counters /> */}
    {/* <Movies/> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
