import { BaseStyles, ThemeProvider } from '@primer/react'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider colorMode='auto'>
            <BaseStyles>
                <App />
            </BaseStyles>
        </ThemeProvider>
    </StrictMode>
);