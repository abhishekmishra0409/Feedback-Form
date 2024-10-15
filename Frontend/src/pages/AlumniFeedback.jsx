import { useState } from 'react'
import Navbar from '../small pages/Navbar'
import Footer from '../small pages/Footer'
import { message } from 'antd'

const AlumniFeedback = () => {

  const [formData, setFormData] = useState({
    name: '',
    enrollment: '',
    passout: '',
    program: '',
    branch: '',
    currentStatus: '',
    mail: '',
    description: '',
    questionRatings: Array(7).fill(0),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
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
      !formData.program ||
      !formData.branch ||
      !formData.currentStatus ||
      !formData.mail ||
      !formData.description ||
      !formData.questionRatings

    ) {
      // console.log(formData);
      message.error('Please fill in all the required fields and provide ratings for all questions.');
      return;
    }

    try {
      const response = await fetch('https://feedback-form-5vjm.onrender.com/alumni/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          enrollment: formData.enrollment,
          passout: formData.passout,
          course: formData.program,
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
          program: '',
          branch: '',
          currentStatus: '',
          mail: '',
          description: '',
          questionRatings: Array(7).fill(0)
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
        <div className='upper' style={{ height: '100%' }}>
          <div className='first'>
            <h3>(Enter your details carefully)</h3>

            <label>
              Name:
              <input placeholder='Enter Your Name' name="name" value={formData.name} onChange={handleInputChange} />
            </label>
            <br />
            <label>
              Enrollment:
              <input name="enrollment" type='text' placeholder='(i.e) 0822IT21XXXX' value={formData.enrollment} onChange={handleInputChange} />

            </label>
            <br />

            <label>
              Passout Year:
              <select className="s-2" name="passout" value={formData.passout} onChange={handleInputChange}>
                <option value=""> Passout Year </option>
                <option value="2008">2008</option>
                <option value="2009">2009</option>
                <option value="2010">2010</option>
                <option value="2011">2011</option>
                <option value="2012">2012</option>
                <option value="2013">2013</option>
                <option value="2014">2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
                <option value="2031">2031</option>
                <option value="2032">2032</option>
              </select>
            </label>
            <br />


            <label>
              Course:
              <select name="program" className="s-2" value={formData.program} onChange={handleInputChange}>
                <option value="">Select Course</option>
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech/ME">M.Tech</option>
                <option value="MBA">MBA</option>
              </select>
            </label>
            <br />
            <label>
              Branch:
              <select name="branch" className="s-2" value={formData.branch} onChange={handleInputChange}>
                <option value="">Select Branch</option>
                {formData.program === 'B.Tech' && (
                  <>
                    <option value="CS">CS</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="CE">CE</option>
                    <option value="ME">ME</option>
                    <option value="EX">EX</option>
                  </>
                )}
                {formData.program === 'M.Tech/ME' && (
                  <>
                    <option value="MCSE">MCSE</option>
                    <option value="PowerSystems">PowerSystems</option>
                    <option value="VLSI">VLSI</option>
                    <option value="MD">MD</option>
                  </>
                )}
                {formData.program === 'MBA' && (
                  <>
                    <option value="1-year">1-year</option>
                    <option value="Marketing/Finance">Marketing/Finance</option>
                    <option value="Marketing/HR">Marketing/HR</option>
                    <option value="Marketing/IT">Marketing/IT</option>
                    <option value="Finance/IT">Finance/IT</option>
                    <option value="Finance/HR">Finance/HR</option>
                    <option value="HR/IT">HR/IT</option>
                    <option value="HR/Production&Operation">HR/Production&Operation</option>
                    <option value="Marketing/Production&Operation">Marketing/Production&Operation</option>
                    <option value="Finance/Production&Operation">Finance/Production&Operation</option>
                    <option value="IT/Production&Operation">IT/Production&Operation</option>
                  </>
                )}
              </select>
            </label>
            <br />


            <label> Current Status:
              <select className="s-2" name="currentStatus" value={formData.currentStatus} onChange={handleInputChange}>
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
          <div className="t-left">
            <h2 className="tableHead">Questions for Feedback</h2>
            <ul>
              <li className='firstLi'>Institute communication through mails/calls/SMS to alumni.</li>
              <li>The curriculum and syllabus content were appropriate for placement / higher education.</li>
              <li>Institute has good library, sports, laboratories, Canteen, and Classroom facilities. </li>
              <li>The extracurricular activities conducted at SVCE to develop the personality.</li>
              <li>Trainings/ workshop/ expert talk conducted in the institute.</li>
              <li>Carrier counseling session conducted in institute</li>
              <li>Institute provided the good placement facilities.</li>
            </ul>
          </div>
          <div className='t-right'>
            <p className="tableHead">Rate according to question</p>
            <div className='tab'>
              <ul>
                {[...Array(7).keys()].map((index) => (
                  <li key={index} className="firstLi">
                    <div className="rating-container">
                      {/* {["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] */}
                      {["Strongly Agree", "Agree","Average", "Disagree", "Strongly Disagree"].map((rating, ratingNo) => (
                        <label key={rating}>
                          {rating}
                          <input
                            className={'InputRating'}
                            type="radio"
                            value={ratingNo + 1}
                            onChange={() => handleRatingChange(index, ratingNo + 1)}
                            checked={formData.questionRatings[index] === ratingNo + 1}
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
