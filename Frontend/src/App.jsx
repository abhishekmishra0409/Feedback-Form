import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FeedbackFrom1 from "./pages/FeedbackFrom1.jsx";
import StudentFeedback from './pages/StudentFeedback.jsx';
import TeacherFeedback from './pages/TeacherFeedback.jsx';
import AlumniFeedback from './pages/AlumniFeedback.jsx';
import FeedbackForm from './pages/FeedbackForm.jsx';


function App() {

  return (
    <>
      <BrowserRouter>
       <Routes>
         {/* <Route exact index element = {<FeedbackFrom1/>}  /> */}
         <Route exact path='/' element = {<FeedbackForm/>}  />
         <Route exact path='/student' element={<StudentFeedback />} />
         <Route exact path='/teacher' element = {<TeacherFeedback />} />
         <Route exact path='/alumni' element = {<AlumniFeedback/>} />
       </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
