import Navbar from '../small pages/Navbar'
import Footer from '../small pages/Footer'
import { useState } from 'react'
import './submit.css'
import axios from 'axios'
import { message } from 'antd'


const StudentFeedback = () => {
        const [formData, setFormData] = useState({
        session: '',
        course: '',
        branch: '',
        semester: '',
        year: '',
        questionRatings: Array(12).fill(0),
        });

        const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value
        });
        };
         

        const handleDropdownChange = (e) => {
          const { name, value } = e.target;
          setFormData((prevData) => ({ ...prevData, [name]: value }));
      };
  
      const handleRatingChange = (index, rating) => {
          setFormData((prevData) => {
              const updatedRatings = [...prevData.questionRatings];
              updatedRatings[index] = rating;
              return { ...prevData, questionRatings: updatedRatings };
          });
      };

      
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (
          !formData.session ||
          !formData.course ||
          !formData.branch ||
          !formData.semester ||
          !formData.year ||
          !formData.questionRatings
        ) {
          message.error('Please fill in all the required fields and provide ratings for all questions.');
          return;
        }
        try {
          const response = await axios.post('http://localhost:3000/student/feedback', {
            session: formData.session,
            program: formData.course,
            branch: formData.branch,
            semester: formData.semester,
            year: formData.year,
            questionRating: formData.questionRatings,
          });
      
          // Assuming the response contains the JSON data
          const data = response.data;
      
          if (data.error) {
            message.error(data.error);
          } else {
            message.success('Feedback Submitted successfully!');
            setFormData({
              ...formData,
              session:"",
              course:"",
              branch: '',
              semester: '',
              year: '',
              questionRatings: Array(12).fill(0),
            });
          }
        } catch (error) {
          message.error('Error in submitting feedback. Please try again later.');
        }
      };
      
  return (
    <div>
      <Navbar/>
        <h3 className="mainHead">Academic Performance & Ambiance of Institute</h3>
    <div className='mdiv'>
        <div className='upper'>
    <div className='first'>
    <h3>Enter your details carefully</h3>
  

  <div className='d-1'>
  <label>
        Session:
        </label>
        <select name="session" value={formData.session} onChange={handleInputChange}>
            <option value=""> Select Session </option>
            <option value="2015-2016">2015-2016</option>
            <option value="2016-2017">2016-2017</option>
            <option value="2017-2018">2017-2018</option>
            <option value="2018-2019">2018-2019</option>
            <option value="2019-2020">2019-2020</option>
            <option value="2020-2021">2020-2021</option>
            <option value="2021-2022">2021-2022</option>
            <option value="2022-2023">2022-2023</option>
            <option value="2023-2024">2023-2024</option>
            <option value="2024-2025">2024-2025</option>
            <option value="2025-2026">2025-2026</option>  
            <option value="2026-2027">2026-2027</option>
            <option value="2027-2028">2027-2028</option>
            <option value="2028-2029">2028-2029</option>
            <option value="2029-2030">2029-2030</option>
            <option value="2030-2031">2030-2031</option>
            <option value="2031-2032">2031-2032</option>
        </select>
      
      <label>
        Course:
        </label>
        <select name="course" value={formData.course} onChange={handleInputChange}>
          <option value="">Select Course</option>
          <option value="btech">B.Tech</option>
          <option value="mtech">M.Tech</option>
        </select>
  </div>

  <div className='d-1'>
  <label>
            Branch:
            </label>
            <select name="branch" value={formData.branch} onChange={handleInputChange}>
              <option value="">Select Branch</option>
            {formData.course === 'btech' && (
              <>
              <option value="cse">CSE</option>
              <option value="ece">ECE</option>
              </>
                  )}
                   { formData.course ==='mtech' && (
                <>
              <option value="cse">ITE</option>
              <option value="ece">MEE</option>
              </>
              )}
            </select>
         
      <label>
        Semester:
        </label>
        <select name="semester" value={formData.semester} onChange={handleInputChange}>
          <option value="">Select Semester</option>
          <option value="1">1st Semester</option>
          <option value="2">2nd Semester</option>
          <option value="3">3rd Semester</option>
          <option value="4">4th Semester</option>
          <option value="5">5th Semester</option>
          <option value="6">6th Semester</option>
          <option value="7">7th Semester</option>
          <option value="8">8th Semester</option>
        </select>
      
  </div>

     
      
     
      <label className='l-1'>
          Year:
        <select className="s-2" name="year" value={formData.year} onChange={handleInputChange}>
          <option value="">Select Year</option>
          <option value="1">1st year</option>
          <option value="2">2nd year</option>
          <option value="3">3rd year</option>
          <option value="4">4th year</option>
           </select>
          </label>
      

    </div>
    </div>
    {/*  Questions  */}
    <div className="botom">
    <div className="b-left">
                            <h2 className="tableHead">Questions for Ratings</h2>
                            <ul>
                                <li className='firstLi'>Faculty take classes as per schedule on regular basis.</li>
                                <li>Faculty has the knowledge of subject in depth and able to explain difficult concept. </li>
                                <li>Faculty has completed the syllabus of the subject.</li>
                                <li>Faculty is able to maintain the discipline in class.</li>
                                <li>Conduction of classes are effective and interesting.</li>
                                <li>Faculty encourage participation of students in the class.</li>
                                <li>Faculty behavior is polite. </li>
                                <li>Students can easily communicate with faculty.</li>
                                <li>Practical classes held as per the schedule</li>
                                <li>Faculty conduct practical classes regularly.</li>
                                <li>Faculty explain experiments and clarifies the doubt. </li>
                                <li>Faculty has practical knowledge in depth.</li>
                            </ul>
                        </div>
    <div className='b-right'>
                            <h2 className="tableHead">Rate According to Question</h2>
                            <div className='tab'>
                                <ul>
                                    {[...Array(12).keys()].map((index) => (
                                        <li key={index} className="firstLi">
                                            <div className="rating-container">
                                                {["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"].map((rating) => (
                                                    <label key={rating}>
                                                        {rating}
                                                        <input className={'InputRating'}
                                                            type="radio"
                                                            value={rating}
                                                            onChange={() => handleRatingChange(index, rating)}
                                                            checked={formData.questionRatings[index] === rating}
                                                        />
                                                    </label>
                                                ))}
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                            </div>

                        </div>
                    </div>
                    <div className="btn">
                    <button type="submit" onClick={handleSubmit}>
                        Submit Feedback
                    </button>
                </div>
</div>
      <Footer />
    </div>
  )
}

export default StudentFeedback
