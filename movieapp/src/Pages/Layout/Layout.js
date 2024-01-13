import React from 'react'
import '../Layout/Layout.scss'
import { Outlet } from 'react-router-dom';
// import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

const Layout = () => {

    const isLog = localStorage.getItem('isLoggin');
    const isLoggin = JSON.parse(isLog);

    // const { isLoggin } = useSelector((state) => state.login);
    // console.log('login',isLoggin);
    return (
        <div>
            {
                isLoggin?
                    (<div className='layout-container'>
                        <div className='layout-header  w-100'>
                            <Header/>
                        </div>
                        <div>
                            <Outlet/>
                        </div>
                        {/* <div>
                            <Footer/>
                        </div> */}
                    </div>)
                    :
                    <Navigate to={'/wcBoard'} />
            }
        </div>
    )
}

export default Layout
