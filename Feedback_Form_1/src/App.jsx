import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FeedbackFrom1 from "./pages/FeedbackFrom1.jsx";



function App() {

  return (
    <>
      {/*<BrowserRouter>*/}
      {/*  <Routes>*/}
      {/*    <Route exact index element = {<FeedbackFrom1/>}  />*/}
      {/*    <Route exact path='/' element = {<FeedbackFrom1/>}  />*/}
      {/*    <Route exact path='/fhg5471hg651hj/all-feedback' element = {<FeedbackFrom1/>} />*/}
      {/*    <Route exact path='/login' element = {<FeedbackFrom1/>} />*/}
      {/*  </Routes>*/}
      {/*</BrowserRouter>*/}

      <FeedbackFrom1/>
    </>
  )
}

export default App
