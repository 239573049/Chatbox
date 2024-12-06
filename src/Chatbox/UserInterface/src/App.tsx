import './App.css'
import GlobalLayout from './_layout/GlobalLayout'
import { RouterProvider } from 'react-router-dom'
import router from './router'

function App() {

  return (
    <GlobalLayout>
      <RouterProvider router={router} />
    </GlobalLayout>
  )
}

export default App
