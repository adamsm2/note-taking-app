import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import {OidcConfig} from "./components/OidcConfig";
import {AuthProvider} from 'react-oidc-context'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider {...OidcConfig}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </AuthProvider>
)
