import {useState} from 'react'
import Navbar from '../small pages/Navbar'
import Footer from '../small pages/Footer'
import { message } from 'antd'

const AlumniFeedback = () => {

  const [formData, setFormData] = useState({
        name: '',
        enrollment: '',
        passout: '',
        course: '',
        branch: '',
        currentStatus:'',
        mail:'',
        description:'',
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
          !formData.name ||
          !formData.enrollment ||
          !formData.passout ||
          !formData.course ||
          !formData.branch ||
          !formData.currentStatus ||
          !formData.mail ||
          !formData.description ||
          !formData.questionRatings

      ) {
        message.error('Please fill in all the required fields and provide ratings for all questions.');
          return;
      }

      try {
          const response = await fetch('http://localhost:3000/alumni/feedback', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  name: formData.name,
                  enrollment: formData.enrollment,
                  passout: formData.passout,
                  course: formData.course,
                  branch: formData.branch,
                  currentStatus: formData.currentStatus,
                  mail: formData.mail, 
                  description: formData.description, 
                  questionRatings: formData.questionRatings
              }),
          });

          const data = await response.json();

          if (data.error) {
            message.error('Error: Enrollment number has already been used.');
          } else {
            message.success('Feedback Submitted successfully!');
              // Reset the form after successful submission
              setFormData({
                  name: '',
                  enrollment: '',
                  passout: '',
                  course: '',
                  branch: '',
                  currentStatus: '',
                  mail: '',
                  description: '',
                  questionRatings: Array(9).fill(0)
              });
          }
      } catch (error) {
          console.error('Error in submitting feedback:', error);
      }
  };



  return (
    <div>
      <Navbar />
      <h3 className="mainHead">Alumni Feedback Form</h3>
    <div className='mdiv'>
        <div className='upper' style={{height:'100%'}}>
    <div className='first'>
    <h3>(Enter your details carefully)</h3>

      <label>
        Name:
         <input placeholder='Enter Your Name' name="name" value={formData.name} onChange={handleInputChange}/>
      </label>
      <br />
      <label>
        Enrollment:
        <input name="enrollment" type='text' placeholder='(i.e) 0822IT21XXXX' value={formData.enrollment} onChange={handleInputChange} />
        
      </label>
      <br />
     
          <label>
            Passout Year:
          <input name='passout' type='text' placeholder='(i.e) 2018, 2021, 2022 ..' value={formData.passout} onChange={handleInputChange} />
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
        

      <label> Current Status:
      <select name="currentStatus" value={formData.currentStatus} onChange={handleInputChange}>
      <option value="">Select Your Current Status</option>
      <option value="higher_studies">Higher Studies</option> 
      <option value="govt_sector">Govt. Sector</option> 
      <option value="private_sector">Private Sector</option> 
      <option value="bussiness">Bussiness</option> 
        
      </select>
      </label>
      <br />
      <label>
        Official Mail id:
        <input name="mail" type='email' placeholder='xyz@taskus.ac.in' value={formData.mail} onChange={handleInputChange} />
          
      </label>
      <br />
      <label>
          Job Description:
        <input name="description" type='text' placeholder='company name / bussiness name/ college name/ govt. post name' value={formData.description} onChange={handleInputChange} />
          
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

export default AlumniFeedback
