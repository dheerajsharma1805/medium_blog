import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import Appbar from './components/Appbar'
import Publish from './pages/Publish'

function App() {

  return (
    <>
    <BrowserRouter>
      <Appbar/>
      <Routes>
        <Route path='/signup' Component={SignUp}/>
        <Route path='/signin' Component={SignIn}/>
        <Route path='/blog/:id' Component={Blog}/>
        <Route path='/blogs' Component={Blogs}/>
        <Route path='/publish' Component={Publish}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
