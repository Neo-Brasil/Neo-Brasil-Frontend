import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom'
import RoutesApp from './routes'

export default function App() {
    return (
        <Router>
            <ToastContainer autoClose={2500} theme="colored"/>
            <RoutesApp />
        </Router>
    )
}