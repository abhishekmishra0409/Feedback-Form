import Navbar from '../small pages/Navbar'
import Footer from '../small pages/Footer'
import { useState } from 'react'
import './submit.css'
import axios from 'axios'
import { message } from 'antd'


const StudentFeedback = () => {
  const [formData, setFormData] = useState({
    session: '',
    program: '',
    branch: '',
    semester: '',
    year: '',
    subject: '',
    facultyName: '',
    questionRating: Array(12).fill(0),
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
      !formData.program ||
      !formData.branch ||
      !formData.semester ||
      !formData.year ||
      !formData.subject ||
      !formData.facultyName ||
      !formData.questionRating
    ) {
      message.error('Please fill in all the required fields and provide ratings for all questions.');
      return;
    }
    try {
      console.log(formData)
      const response = await axios.post('https://feedback-form-5vjm.onrender.com/student/feedback', {
        session: formData.session,
        program: formData.program,
        branch: formData.branch,
        semester: formData.semester,
        year: formData.year,
        subject: formData.subject,
        facultyName: formData.facultyName,
        questionRating: formData.questionRating,
      });
      console.log(response.data)
      // Assuming the response contains the JSON data
      const data = response.data;

      if (data.error) {
        message.error(data.error);
      } else {
        message.success('Feedback Submitted successfully!');
        setFormData({
          ...formData,
          session: "",
          program: "",
          branch: '',
          semester: '',
          year: '',
          subject: '',
          facultyName: '',
          questionRating: Array(12).fill(0),
        });
      }
    } catch (error) {
      message.error('Error in submitting feedback. Please try again later.');
    }
  };


  const subjectOptions = {
    'B.Tech': {
      'CS': {
        1: ['BT-101', 'BT-102', 'BT-103', 'BT-104', 'BT-105', 'BT-106(P)'],
        2: ['BT-201', 'BT-202', 'BT-203', 'BT-204', 'BT-205', 'BT-206(P)'],
        3: ['ES-301', 'CS-302', 'CS-303', 'CS-304', 'CS-305', 'CS-306(P)'],
        4: ['BT-401', 'CS-402', 'CS-403', 'CS-404', 'CS-405', 'CS-406(P)'],
        5: ['CS-501', 'CS-502', 'CS-503', 'CS-504', 'CS-505(P)', 'CS-506(P)'],
        6: ['CS-601', 'CS-602', 'CS-603', 'CS-604', 'CS-605(P)', 'CS-606(P)'],
        7: ['CS-701', 'CS-702', 'CS-703', 'CS-704(P)', 'CS-705(P)'],
        8: ['CS-801', 'CS-802', 'CS-803', 'CS-804(P)'],

        // Add subjects for other semesters
        // ...
      },
      'IT': {
        1: ['BT-101', 'BT-102', 'BT-103', 'BT-104', 'BT-105', 'BT-106(P)'],
        2: ['BT-201', 'BT-202', 'BT-203', 'BT-204', 'BT-205', 'BT-206(P)'],
        3: ['ES-301', 'IT-302', 'IT-303', 'IT-304', 'IT-305', 'IT-306(P)'],
        4: ['BT-401', 'IT-402', 'IT-403', 'IT-404', 'IT-405', 'IT-406(P)', 'IT-407(P)'],
        5: ['IT-501', 'IT-502', 'IT-503', 'IT-504', 'IT-505(P)', 'IT-506(P)'],
        6: ['IT-601', 'IT-602', 'IT-603', 'IT-604', 'IT-605(P)', 'IT-606(P)'],
        7: ['IT-701', 'IT-702', 'IT-703', 'IT-704(P)', 'IT-705(P)'],
        8: ['IT-801', 'IT-802', 'IT-803', 'IT-804(P)'],
      },
      'ECE': {
        1: ['BT-201', 'BT-102', 'BT-203', 'BT-204', 'BT-205', 'BT-206(P)'],
        2: ['BT-101', 'BT-202', 'BT-103', 'BT-104', 'BT-105', 'BT-106(P)'],
        3: ['BT-301', 'EC-302', 'EC-303', 'EC-304', 'EC-305', 'EC-306(P)'],
        4: ['ES-401', 'EC-402', 'EC-403', 'EC-404', 'EC-405', 'EC-406(P)'],
        5: ['EC-501', 'EC-502', 'EC-503', 'EC-504', 'EC-505(P)', 'EC-506(P)'],
        6: ['EC-601', 'EC-602', 'EC-603', 'EC-604', 'EC-605(P)', 'EC-606(P)'],
        7: ['EC-701', 'EC-702', 'EC-703', 'EC-704(P)', 'EC-705(P)'],
        8: ['EC-801', 'EC-802', 'EC-803', 'EC-804(P)'],
        // Add subjects for other semesters
        // ...
      },
      'CE': {
        1: ['BT-201', 'BT-102', 'BT-203', 'BT-204', 'BT-205', 'BT-206(P)'],
        2: ['BT-101', 'BT-202', 'BT-103', 'BT-104', 'BT-105', 'BT-106(P)'],
        3: ['BT-301', 'CE-302', 'CE-303', 'CE-304', 'CE-305', 'CE-306(P)'],
        4: ['ES-401', 'CE-402', 'CE-403', 'CE-404', 'CE-405', 'CE-406(P)'],
        5: ['CE-501', 'CE-502', 'CE-503', 'CE-504', 'CE-505(P)', 'CE-506(P)'],
        6: ['CE-601', 'CE-602', 'CE-603', 'CE-604', 'CE-605(P)', 'CE-606(P)'],
        7: ['CE-701', 'CE-702', 'CE-703', 'CE-704(P)', 'CE-705(P)'],
        8: ['CE-801', 'CE-802', 'CE-803', 'CE-804(P)'],
        // Add subjects for other semesters
        // ...
      },
      'ME': {
        1: ['BT-201', 'BT-102', 'BT-203', 'BT-204', 'BT-205', 'BT-206(P)'],
        2: ['BT-101', 'BT-202', 'BT-103', 'BT-104', 'BT-105', 'BT-106(P)'],
        3: ['BT-301', 'ME-302', 'ME-303', 'ME-304', 'ME-305', 'ME-306(P)'],
        4: ['ES-401', 'ME-402', 'ME-403', 'ME-404', 'ME-405', 'ME-406(P)'],
        5: ['ME-501', 'ME-502', 'ME-503', 'ME-504', 'ME-505(P)', 'ME-506(P)'],
        6: ['ME-601', 'ME-602', 'ME-603', 'ME-604', 'ME-605(P)', 'ME-606(P)'],
        7: ['ME-701', 'ME-702', 'ME-703', 'ME-704(P)', 'ME-705(P)'],
        8: ['ME-801', 'ME-802', 'ME-803', 'ME-804(P)'],
        // Add subjects for other semesters
        // ...
      },
      'EX': {
        1: ['BT-101', 'BT-102', 'BT-103', 'BT-104', 'BT-105', 'BT-106(P)'],
        2: ['BT-201', 'BT-202', 'BT-203', 'BT-204', 'BT-205', 'BT-206(P)'],
        3: ['ES-301', 'EX-302', 'EX-303', 'EX-304', 'EX-305', 'EX-306(P)'],
        4: ['BT-401', 'EX-402', 'EX-403', 'EX-404', 'EX-405', 'EX-406(P)'],
        5: ['EX-501', 'EX-502', 'EX-503', 'EX-504', 'EX-505(P)', 'EX-506(P)'],
        6: ['EX-601', 'EX-602', 'EX-603', 'EX-604', 'EX-605(P)', 'EX-606(P)'],
        7: ['EX-701', 'EX-702', 'EX-703', 'EX-704(P)', 'EX-705(P)'],
        8: ['EX-801', 'EX-802', 'EX-803', 'EX-804(P)'],
        // Add subjects for other semesters
        // ...
      },
      // Add other branches...
    },
    'MBA': {
      '1-year': {
        1: ['FT101C', 'FT102C', 'FT103C', 'FT1', 'FT105C', 'FT106C', 'FT107C', 'FT108C'],
        2: ['FT201C', 'FT202C', 'FT203C', 'FT204C', 'FT205C', 'FT206C', 'FT207C', 'FT208C']
        // Add subjects for other semesters
        // ...
      },
      'Marketing/Finance': {
        3: ['FT301C', 'FT302C', 'FT303M', 'FT304M', 'FT305M', 'FT303F', 'FT304F', 'FT305F'],
        4: ['FT401C', 'FT402C', 'FT403M', 'FT404M', 'FT405M', 'FT403F', 'FT404F', 'FT405F']
      },
      'Marketing/HR': {
        3: ['FT301C', 'FT302C', 'FT303M', 'FT304M', 'FT305M', 'FT303H', 'FT304H', 'FT305H'],
        4: ['FT401C', 'FT402C', 'FT403M', 'FT404M', 'FT405M', 'FT403H', 'FT404H', 'FT405H']
      },
      'Marketing/IT': {
        3: ['FT301C', 'FT302C', 'FT303M', 'FT304M', 'FT305M', 'FT303I', 'FT304I', 'FT305I'],
        4: ['FT401C', 'FT402C', 'FT403M', 'FT404M', 'FT405M', 'FT403I', 'FT404I', 'FT405I']
      },

      'Finance/IT': {
        3: ['FT301C', 'FT302C', 'FT303F', 'FT304F', 'FT305F', 'FT303I', 'FT304I', 'FT305I'],
        4: ['FT401C', 'FT402C', 'FT403F', 'FT404F', 'FT405F', 'FT403I', 'FT404I', 'FT405I']
      },
      'Finance/HR': {
        3: ['FT301C', 'FT302C', 'FT303F', 'FT304F', 'FT305F', 'FT303H', 'FT304H', 'FT305H'],
        4: ['FT401C', 'FT402C', 'FT403F', 'FT404F', 'FT405F', 'FT403H', 'FT404H', 'FT405H']
      },
      'HR/IT': {
        3: ['FT301C', 'FT302C', 'FT303H', 'FT304H', 'FT305H', 'FT303I', 'FT304I', 'FT305I'],
        4: ['FT401C', 'FT402C', 'FT403H', 'FT404H', 'FT405H', 'FT403I', 'FT404I', 'FT405I'],
      },
      'HR/Production&Operation': {
        3: ['FT301C', 'FT302C', 'FT303H', 'FT304H', 'FT305H', 'FT303P', 'FT304P', 'FT305P'],
        4: ['FT401C', 'FT402C', 'FT403H', 'FT404H', 'FT405H', 'FT403P', 'FT404P', 'FT405P'],
      },
      'Marketing/Production&Operation': {
        3: ['FT301C', 'FT302C', 'FT303M', 'FT304M', 'FT305M', 'FT303P', 'FT304P', 'FT305P'],
        4: ['FT401C', 'FT402C', 'FT403M', 'FT404M', 'FT405M', 'FT403P', 'FT404P', 'FT405P']
      },
      'Finance/Production&Operation': {
        3: ['FT301C', 'FT302C', 'FT303F', 'FT304F', 'FT305F', 'FT303P', 'FT304P', 'FT305P'],
        4: ['FT401C', 'FT402C', 'FT403F', 'FT404F', 'FT405F', 'FT403P', 'FT404P', 'FT405P']
      },
      'IT/Production&Operation': {
        3: ['FT301C', 'FT302C', 'FT303P', 'FT304P', 'FT305P', 'FT303I', 'FT304I', 'FT305I'],
        4: ['FT401C', 'FT402C', 'FT403P', 'FT404P', 'FT405P', 'FT403I', 'FT404I', 'FT405I'],
      },

      // Add other branches...
    },
    'M.Tech/ME': {
      'MCSE': {
        1: ['MCSE101', 'MCSE102', 'MCSE103', 'MCSE104', 'MCSE105', 'MCSE106(P)', 'MCSE107(P)'],
        2: ['MCSE201', 'MCSE202', 'MCSE203', 'MCSE204', 'MCSE205', 'MCSE206(P)', 'MCSE207(P)'],
        3: ['MCSE301', 'MCSE302', 'MCSE303(P)', 'MCSE304(P)'],
        4: ['MCSE401']
        // Add subjects for other semesters
        // ...
      },
      'PowerSystems': {
        1: ['MEPS101', 'MEPS102', 'MEPS103', 'MEPS104', 'MEPS105', 'MEPS106(P)', 'MEPS107(P)'],
        2: ['MEPS201', 'MEPS202', 'MEPS203', 'MEPS204', 'MEPS205', 'MEPS206(P)', 'MEPS207(P)'],
        3: ['MEPS301', 'MEPS302', 'MEPS304(P)'],
        4: ['MEPS401']
      },
      'VLSI': {
        1: ['MEVD-101', 'MEVD-102', 'MEVD-103', ' MEVD-104', 'MEVD-105', 'MEVD-106(P)', 'MEVD-107(P)'],
        2: ['MEVD-201', 'MEVD-202', 'MEVD-203', ' MEVD-204', 'MEVD-205', 'MEVD-206(P)', 'MEVD-207(P)'],
        3: ['MEVD-301', 'MEVD-302', 'MEVD-303(P)', 'MEVD-304(P)'],
        4: ['MEVD-401'],
      },
      'MD': {
        1: ['MMPD101', 'MMPD102', 'MMPD103', 'MMPD104', 'MMPD105', 'MMPD106(P)', 'MMPD107(P)'],
        2: ['MMPD201', 'MMPD202', 'MMPD203', 'MMPD204', 'MMPD205', 'MMPD206(P)', 'MMPD207(P)'],
        3: ['MMPD301', 'MMPD302', 'MMPD303(P)', 'MMPD304(P)'],
        4: ['MMPD401']
      },
      // Add other branches...
    }
    // Add other courses...
  }
  const courseSubjects = subjectOptions[formData.program]?.[formData.branch]?.[formData.semester] || [];


  return (
    <div>
      <Navbar />
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
              <select name="program" value={formData.program} onChange={handleInputChange}>
                <option value="">Select Course</option>
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech/ME">M.Tech</option>
                <option value="MBA">MBA</option>
              </select>
            </div>

            <div className='d-1'>
              <label>
                Branch:
              </label>
              <select name="branch" value={formData.branch} onChange={handleInputChange}>
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

            <div className="d-1">
              <label >Subject:</label>
              <select name="subject" value={formData.subject} onChange={handleInputChange}>
                <option value="">Select Subject</option>
                {courseSubjects.map((subject, index) => (
                  <option key={index} value={subject}>{subject}</option>
                ))}
              </select>


              <label>Year:</label>
              <select name="year" value={formData.year} onChange={handleInputChange}>
                <option value="">Select Year</option>
                <option value="1">1st year</option>
                <option value="2">2nd year</option>
                <option value="3">3rd year</option>
                <option value="4">4th year</option>
              </select>

            </div>


            <label className='l-1'>Teacher Name:
              <input type="text" name="facultyName" value={formData.facultyName} onChange={handleInputChange} placeholder='Enter Name of Teacher' />
            </label>

          </div>
        </div>
        {/*  Questions  */}
        <div className="botom">
          <div className="b-left">
            <h2 className="tableHead">Questions for Feedback</h2>
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
            <p className="tableHead"> Rate according to question</p>
            <div className='tab'>
              <ul>
                {[...Array(12).keys()].map((index) => (
                  <li key={index} className="firstLi">
                    <div className="rating-container">
                      {["Strongly Agree", "Agree","Average", "Disagree", "Strongly Disagree"].map((rating, ratingNo) => (
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
