import React from 'react'
import Navbar from '../small pages/Navbar'
import Footer from '../small pages/Footer'
import { useState } from 'react'
import './submit.css'

const StudentFeedback = () => {
        const [formData, setFormData] = useState({
        session: '',
        course: '',
        branch: '',
        semester: '',
        year: '',
        questionRatings: Array(9).fill(0),
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
          alert('Please fill in all the required fields and provide ratings for all questions.');
          return;
      }

      try {
          const response = await fetch('', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  session: formData.session,
                  course: formData.course,
                  branch: formData.branch,
                  semester: formData.semester,
                  year: formData.year, 
                  questionRatings: formData.questionRatings,
              }),
          });

          const data = await response.json();

          if (data.error) {
              alert('Error: Enrollment number has already been used.');
          } else {
              alert('Feedback Submitted successfully!');
              // Reset the form after successful submission
              setFormData({
                  branch: '',
                  semester: '',
                  yearOfAdmission: '',
                  emailId: '',
                  questionRatings: Array(9).fill(0),
              });
          }
      } catch (error) {
          console.error('Error in submitting feedback:', error);
      }
  };
  return (
    <div>
      <Navbar/>
        <h3 className="mainHead">Academic Performance & Ambiance of Institute</h3>
    <div className='mdiv'>
        <div className='upper'>
    <div className='first'>
    <h3>(Enter your details carefully)</h3>

      <label>
        Session:
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
      </label>
      <br />
      <label>
        Course:
        <select name="course" value={formData.course} onChange={handleInputChange}>
          <option value="">Select Course</option>
          <option value="btech">B.Tech</option>
          <option value="mtech">M.Tech</option>
        </select>
      </label>
      <br />
      {formData.course === 'btech' && (
        <>
          <label>
            Branch:
            <select name="branch" value={formData.branch} onChange={handleInputChange}>
              <option value="">Select Branch</option>
              <option value="cse">CSE</option>
              <option value="ece">ECE</option>
            </select>
          </label>
          <br />
        </>
      )}
        
      { formData.course ==='mtech' && (
        <>

        <label>
            Branch:
            <select name="branch" value={formData.branch} onChange={handleInputChange}>
              <option value="">Select Branch</option>
              <option value="cse">ITE</option>
              <option value="ece">MEE</option>
            </select>
          </label>
        </>
          )
      } 
          
        

      <label>
        Semester:
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
      </label>
      <br />
      <label>
          Year:
        <select name="year" value={formData.year} onChange={handleInputChange}>
          <option value="">Select Year</option>
          <option value="1">1st year</option>
          <option value="2">2nd year</option>
          <option value="3">3rd year</option>
          <option value="4">4th year</option>
           </select>
      </label>
      <br />

    </div>
    </div>
    {/*  Questions  */}
    <div className="botom">
    <div className="b-left">
                            <h2 className="tableHead">Questions for Ratings</h2>
                            <ul>
                                <li className='firstLi'>Course Outcomes were clearly identified</li>
                                <li>Relevance of the textbook to this course </li>
                                <li>Were the lecture/lab well organized and presented at a reasonable pace</li>
                                <li>Did the problem worked out in the classroom/Online class help you to understand how to solve question on your own</li>
                                <li>Are the assignment/lab experiment procedure clearly explained</li>
                                <li>The learning resourse in the course help you to achive the course outcomes (Lecture notes,PPTs,Online meterial etc.)</li>
                                <li>The Quality of teaching in the course help you to achive the course outcomes</li>
                                <li>Are you motivated to achive the cou rse outcomes.(Having the desire or drive to learn, to complete task and to willing strive for goals)</li>
                                <li>Your overall satisfaction about the course</li>
                            </ul>
                        </div>
    <div className='b-right'>
                            <h2 className="tableHead">Rate 1 To 5 according to questions</h2>
                            <div className='tab'>
                                <ul>
                                    {[...Array(9).keys()].map((index) => (
                                        <li key={index} className="firstLi">
                                            <div className="rating-container">
                                                {[1, 2, 3, 4, 5].map((rating) => (
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
