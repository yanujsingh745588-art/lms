import {Route,Routes,useMatch} from 'react-router-dom'
import Home from './pages/student/Home'
import CourseList from './pages/student/CourseList'
import CourseDetail from './pages/student/CourseDetail'
import MyEnrollments from './pages/student/MyEnrollments'
import Players from './pages/student/Players'
import Loading from './components/student/Loading'
import Educator from './pages/educator/Educator'
import AddCourse from './pages/educator/AddCourse'
import DashBoard from './pages/educator/DashBoard'
import MyCourse from './pages/educator/MyCourse'
import StudentsEnrolled from './pages/educator/StudentsEnrolled'
import Navbar from './components/student/Navbar'
import "quill/dist/quill.snow.css"

const App=() => {
  const isEducatorRoute = useMatch('/educator/*')
  return (
    <div className='text-default min-h-screen bg-white'>
      {!isEducatorRoute && <Navbar/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/course-list' element={<CourseList/>}/>
        <Route path='/course-list/:input' element={<CourseList/>}/>
        <Route path='/course/:id' element={<CourseDetail/>}/>
        <Route path='/my-enrollments' element={<MyEnrollments/>}/>
        <Route path='/players/:courseId' element={<Players/>}/>
        <Route path='/loading/:path' element={<Loading/>}/>
        <Route path='/educator' element={<Educator/>}>
            <Route path='/educator' element={<DashBoard/>}/>
            <Route path='add-course' element={<AddCourse/>}/>
            <Route path='my-course' element={<MyCourse/>}/>
            <Route path='student-enrolled' element={<StudentsEnrolled/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App