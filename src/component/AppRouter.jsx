import React, { useContext } from "react";
import {Navigate, Route, Routes} from 'react-router-dom';
import { publicRoutes, privateRoutes} from "../router";
import { AuthContext } from "../context";
import Loader from "./UI/loader/Loader";

const AppRouter = () =>
{
    const {isAuth, isLoading} = useContext(AuthContext)

    if(isLoading){
      return <Loader/>
    }

    return(
        isAuth 
        ?
          <Routes>
            {privateRoutes.map(route => 
                <Route key={route.path} element={route.component} path={route.path} exact={route.exact}/>
            )}
            <Route path="*" element={<Navigate to="/about" />} />
          </Routes>
        :
         <Routes>
           {publicRoutes.map(route => 
               <Route key={route.path} element={route.component} path={route.path} exact={route.exact}/>
           )}
           <Route path="*" element={<Navigate to="/login" />} />
         </Routes>
        
    );
};

export default  AppRouter;