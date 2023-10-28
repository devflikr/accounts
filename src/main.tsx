import React from 'react';
import App from './App.tsx';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './styles/index.scss';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
        <Toaster
            position="bottom-center"
            toastOptions={{
                className: "bg-[#000d] text-white",
            }}
        />
    </React.StrictMode>,
);
