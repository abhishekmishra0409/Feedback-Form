import { useNavigate } from 'react-router-dom';
import "../small pages/Button.css";
import Navbar from '../small pages/Navbar';
import Footer from '../small pages/Footer';

const FeedbackForm = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Navbar />
            <div className="mainContainer">
                <h2 style={{ width: '100%' }} className='mainHead'>Feedback Form</h2>
                <p style={{ color: 'grey', paddingBottom: '20px' }}>Please select your role for feedback</p>
                <div className='centerButtons'>
                    {/* Student button */}
                    <button className="button" onClick={() => { navigate("/student") }}>
                        Student Feedback
                        <svg fill="currentColor" viewBox="0 0 24 24" className="icon">
                            <path
                                clipRule="evenodd"
                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                                fillRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                    {/* Teacher button */}
                    <button className="button" onClick={() => { navigate("/teacher") }}>
                        Teacher Feedback
                        <svg fill="currentColor" viewBox="0 0 24 24" className="icon">
                            <path
                                clipRule="evenodd"
                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                                fillRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                    {/* Alumni button */}
                    <button className="button" onClick={() => { navigate("/alumni") }}>
                        Alumni Feedback
                        <svg fill="currentColor" viewBox="0 0 24 24" className="icon">
                            <path
                                clipRule="evenodd"
                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                                fillRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
            <Footer fixed={true} />
        </div>
    );
}

export default FeedbackForm;
