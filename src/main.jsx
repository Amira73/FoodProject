import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import './index.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from './Context/AuthContext.jsx';



const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
   <QueryClientProvider client={queryClient}>
  <StrictMode>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
  </StrictMode>
  </QueryClientProvider>
)
