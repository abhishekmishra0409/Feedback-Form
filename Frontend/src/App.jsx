import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import StudentFeedback from './pages/StudentFeedback.jsx';
import TeacherFeedback from './pages/TeacherFeedback.jsx';
import AlumniFeedback from './pages/AlumniFeedback.jsx';
import FeedbackForm from './pages/FeedbackForm.jsx';
import Login from './pages/Login.jsx';
import Admin from './pages/Admin.jsx'
import Student from './pages/GetStudent.jsx'
import Alumni from './pages/GetAlumni.jsx';
import Faculty from './pages/GetFaculty.jsx';
import FetchApi from "./pages/FetchApi.jsx"

function App() {

  return (
    <>
      <BrowserRouter>
       <Routes>
       <Route exact path='/fetch' element = {<FetchApi/>}  />
         <Route exact path='/' element = {<FeedbackForm/>}  />
         <Route exact path='/student' element={<StudentFeedback />} />
         <Route exact path='/teacher' element = {<TeacherFeedback />} />
         <Route exact path='/alumni' element = {<AlumniFeedback/>} />
         <Route exact path='/login' element = {<Login/>} />
         <Route exact path='/admin' element = {<Admin/>} >
          <Route index element = {<Student/>}/>
          <Route path='facultyFeedback' element = {<Faculty/>}/>
          <Route path='alumniFeedback' element = {<Alumni/>}/>
         </Route>
       </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
