import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

import Home from './components/Home'
import Login from './components/ui/auth/Login'
import Signup from './components/ui/auth/Signup'
import Profile from './components/Profile'
import ProtectedRoute from './components/ui/admin/ProtectedRoute'
import AdminQuiz from './components/ui/admin/AdminQuiz'
import PostQuiz from './components/ui/admin/PostQuiz'
import EditPostQuiz from './components/ui/admin/EditPostQuiz'
import SearchUser from './components/SearchUser'
import Browseruser from './components/Browseuser'
import Userprofile from './components/Userprofile'
import Similar from './components/Similar'
import About from './components/About'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Terms from './components/Terms'
import Privacy from './components/Privacy'
import Viewchoice from './components/Viewchoice'



const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path:'/about',
    element:<About/>
  },
  {
    path:'/contact',
    element:<Contact/>
  },
  {
    path:'/terms',
    element:<Terms/>
  },
  {
    path:'/privacy',
    element:<Privacy/>
  },
  {
    path:'/faq',
    element:<Faq/>
  },  
  {
    path:'/viewchoice/:id',
    element:<Viewchoice/>
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path:'/similar',
    element:<Similar/>
  },
  {
    path:'/userprofile/:id',
    element:<Userprofile/>
  },
  {
    path: '/searchuser',
    element: <SearchUser/>
  },
  {
    path:"/browseuser",
    element:<Browseruser/>
  },
  {
    path:"/admin/quiz",
    element:<ProtectedRoute><AdminQuiz/></ProtectedRoute>
  },
  {
    path:"/admin/quiz/create",
    element:<ProtectedRoute><PostQuiz/></ProtectedRoute>
  },
  {
    path:"/admin/quiz/:id",
    element:<ProtectedRoute><EditPostQuiz/></ProtectedRoute>
  }

])

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
