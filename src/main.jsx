import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { RecipesProvider } from './Context/RecipeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecipesProvider>

    <App />
    </RecipesProvider>
  </StrictMode>,
)
