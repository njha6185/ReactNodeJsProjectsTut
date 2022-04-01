import React, { } from 'react';
import Movies from '../src/components/movies.jsx';
import HomeNavBar from './components/homeNavBar.jsx';
import { Route ,Routes, Navigate, Link} from 'react-router-dom';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './componentsR/notFound';
import App from './App.js';
import LoginForm from './components/loginForm.jsx';
import RegisterForm from './components/registerForm';
import NewMovies from './components/newMovies.jsx';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import BackendTest from './components/backendTest';
import jwtDecode from 'jwt-decode';
import Logout from './components/logout';
import ProtectedRoute from './components/common/protectedRoute';

class AppM extends React.Component {
    state={};
    componentDidMount(){
        try{
            const jwt=localStorage.get('token');
            const user=jwtDecode(jwt);
            this.setState({user});
        }catch(ex){}
    }

    render() { 

        const Wrapper = (props) => {
            const params = useParams();
            //console.log('WRAPPER PARAMS: ', params);
            return (
              <NewMovies
                {...{ ...props, match: { params } }}
              />
            );
          };

        return (
            <div>
                <HomeNavBar user={this.state.user} />
                <main className="container">
                    {/* {<Movies />} */}
                    <Routes>
                        <Route path="/register" element={<RegisterForm />}></Route>
                        <Route path="/login" element={<LoginForm />}></Route>
                        <Route path="/logout" element={<Logout />}></Route>
                        <Route path="/customers" element={<Customers />}></Route>
                        <ProtectedRoute path="/movies/:movieID" 
                        component={Wrapper} 
                        >                                                
                        </ProtectedRoute>
                        <Route path="/backend" element={<BackendTest />}></Route>
                        <Route path="/movies" 
                        render={props=> <Movies {...props} user={this.state.user} />}></Route>
                        <Route path="/counter" element={<App />}></Route>
                        <Route path="/rentals" element={<Rentals />}></Route>
                        <Route path="/notFound" element={<NotFound />}></Route>
                        <Route path="/home" element={<Movies />}></Route>
                        <Route path="/" exact element={<Navigate replace to="/home" />}></Route> 
                        <Route path="*" element={<Navigate replace to="/notFound" />}></Route>                        
                    </Routes>
                </main>
            </div>            
        );
    }
}
 
export default AppM;