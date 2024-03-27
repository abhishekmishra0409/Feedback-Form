import { useState } from 'react';
import './Submit.css';

const FeedbackForm1 = () => {
    const [formData, setFormData] = useState({
        name: '',
        rollNo: '',
        branch: '',
        semester: '',
        yearOfAdmission: '',
        emailId: '',
        questionRatings: Array(9).fill(0),
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
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
            !formData.rollNo ||
            !formData.branch ||
            !formData.semester ||
            !formData.yearOfAdmission
        ) {
            alert('Please fill in all the required fields and provide ratings for all questions.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/submit-feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    rollNo: formData.rollNo,
                    branch: formData.branch,
                    semester: formData.semester,
                    yearOfAdmission: formData.yearOfAdmission,
                    emailId: formData.emailId,
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
                    name: '',
                    rollNo: '',
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
        <>
            <h1 className="mainHead">Feedback Form</h1>
            <div className="mdiv">
                <div>
                    <div className="upper">
                        <div className="first">
                            <h3>(Enter your details carefully)</h3>

                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />

                            <label>Enrollment No:</label>
                            <input
                                type="text"
                                name="rollNo"
                                value={formData.rollNo}
                                onChange={handleInputChange}
                                required
                            />

                            <label>Branch:</label>
                            <select
                                name="branch"
                                value={formData.branch}
                                onChange={handleDropdownChange}
                                required
                            >
                                <option value="">Select Branch</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Electrical Engineering">Electrical Engineering</option>
                                {/* Add more branches as needed */}
                            </select>

                            <label>Semester:</label>
                            <select
                                name="semester"
                                value={formData.semester}
                                onChange={handleDropdownChange}
                                required
                            >
                                <option value="">Select Semester</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                {/* Add more semesters as needed */}
                            </select>

                            <label>Year of Admission:</label>
                            <select
                                name="yearOfAdmission"
                                value={formData.yearOfAdmission}
                                onChange={handleDropdownChange}
                                required
                            >
                                <option value="">Select Year of Admission</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                                {/* Add more years as needed */}
                            </select>

                            <label>Email ID:</label>
                            <input
                                type="text"
                                name="emailId"
                                value={formData.emailId}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

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
                </div>
                <div className="btn">
                    <button type="submit" onClick={handleSubmit}>
                        Submit Feedback
                    </button>
                </div>
            </div>
        </>
    );
};

export default FeedbackForm1;
