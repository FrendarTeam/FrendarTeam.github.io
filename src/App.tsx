import React from 'react';
import logo from './logo.svg';
import './App.css';
import Auth from 'Pages/Auth';
import { Route, Routes } from 'react-router-dom';
import Main from 'Pages/Main';

function App() {
    return (
        <Routes>
            <Route path="/">
                <Route path="auth" element={<Auth />} />
                <Route path="main" element={<Main />} />
            </Route>
        </Routes>
    );
}

export default App;
