import { useState } from 'react';
import Navbar from '../small pages/Navbar';
import Footer from '../small pages/Footer';
import { message } from 'antd';

const TeacherFeedback = () => {
  const [formData, setFormData] = useState({
    department: '',
    session: '',
    questionRating: Array(10).fill(0),
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
      const updatedRatings = [...prevData.questionRating];
      updatedRatings[index] = rating;
      return { ...prevData, questionRating: updatedRatings };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.session ||
      !formData.department ||
      !formData.questionRating
    ) {
      message.error('Please fill in all the required fields and provide ratings for all questions.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/faculty/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session: formData.session,
          department: formData.department,
          questionRating: formData.questionRating,
        }),
      });

      const data = await response.json();

      if (data.error) {
        message.error('Error: Enrollment number has already been used.');
      } else {
        message.success('Feedback Submitted successfully!');
        // Reset the form after successful submission
        setFormData({
          ...formData,
          department: '',
          questionRating: Array(10).fill(0),
        });
      }
    } catch (error) {
      console.error('Error in submitting feedback:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <h3 className='mainHead'>Teacher Feedback</h3>

      <div className='mdiv'>
        <div className='upper' style={{ height: '200px' }}>
          <div className='first'>
            <h3>Enter Details carefully</h3>

            <div className='d-1'>
              <label> Department:</label>
              <select name="department" value={formData.department} onChange={handleInputChange}>
                <option value="">Select Department</option>
                <option value="CS">CS</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="CE">CE</option>
                <option value="ME">ME</option>
                <option value="EX">EX</option>
                <option value="MCSE">MCSE</option>
                <option value="PowerSystems">PowerSystems</option>
                <option value="VLSI">VLSI</option>
                <option value="MD">MD</option>
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
              </select>

              <label>
                Session:
              </label>
              <select
                name='session'
                value={formData.session}
                onChange={handleInputChange}
              >
                <option value=''> Select Session </option>
                <option value='2015-2016'>2015-2016</option>
                <option value='2016-2017'>2016-2017</option>
                <option value='2017-2018'>2017-2018</option>
                <option value='2018-2019'>2018-2019</option>
                <option value='2019-2020'>2019-2020</option>
                <option value='2020-2021'>2020-2021</option>
                <option value='2021-2022'>2021-2022</option>
                <option value='2022-2023'>2022-2023</option>
                <option value='2023-2024'>2023-2024</option>
                <option value='2024-2025'>2024-2025</option>
                <option value='2025-2026'>2025-2026</option>
                <option value='2026-2027'>2026-2027</option>
                <option value='2027-2028'>2027-2028</option>
                <option value='2028-2029'>2028-2029</option>
                <option value='2029-2030'>2029-2030</option>
                <option value='2030-2031'>2030-2031</option>
                <option value='2031-2032'>2031-2032</option>
              </select>

            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className='botom'>
          <div className='t-left'>
            <h2 className='tableHead'>Questions for Ratings</h2>
            <ul>
              <li className='firstLi'>The vision and mission of the institution are well known to faculty.</li>
              <li>The course contents fulfill the needs of students & industries. </li>
              <li>Syllabus is suitable for/relevant to the course.</li>
              <li>
                Faculty has the freedom to adopt/adapt new techniques/strategies of testing and assessment of students
              </li>
              <li>The administration is teacher friendly.</li>
              <li>
                The institute Encourage the faculty members for research work.
              </li>
              <li>
                The institute Encourage the faculty members to attend FDP/ Conference/ Seminar to upgrade their knowledge.
              </li>
              <li>
                The institute has safe transport facilities.
              </li>
              <li>The environment of institute is free from faculty member caste discrimination.</li>
              <li>The environment of institute is free from gender discrimination.</li>
            </ul>
          </div>
          <div className='t-right'>
            <p className="tableHead">Rate according to question</p>
            <div className='tab'>
              <ul>
                {[...Array(10).keys()].map((index) => (
                  <li key={index} className='firstLi'>
                    <div className='rating-container'>
                      {["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"].map((rating, ratingNo) => (
                        <label key={rating}>
                          {rating}
                          <input
                            className={'InputRating'}
                            type="radio"
                            value={ratingNo + 1}
                            onChange={() => handleRatingChange(index, ratingNo + 1)}
                            checked={formData.questionRating[index] === ratingNo + 1}
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

        <div className='btn'>
          <button type='submit' onClick={handleSubmit}>
            Submit Feedback
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeacherFeedback;
