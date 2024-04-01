import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import { Select,Button } from 'antd';

const { Option } = Select;

const FacultyPage = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [filteredFacultyData, setFilteredFacultyData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSession, setSelectedSession] = useState('');
  const [showGraph, setShowGraph] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/faculty');
      setFacultyData(response.data.faculty);
    } catch (error) {
      console.error('Error fetching faculty data:', error);
    }
  };

  const fetchFilteredData = async () => {
    try {
      let url = 'http://localhost:3000/faculty?';
      if (selectedSession) {
        url += `session=${selectedSession}&`;
      }
      if (selectedDepartment) {
        url += `department=${selectedDepartment}`;
      }
      
      const response = await axios.get(url);
      setFilteredFacultyData(response.data.faculty);
      // console.log(response.data.faculty);
      setShowGraph(true);
    } catch (error) {
      console.error('Error fetching filtered faculty data:', error);
    }
  };

  const handleFilterChange = () => {
    fetchFilteredData();
  };

  const departments = [...new Set(facultyData.map((faculty) => faculty.department))];
  const sessions = [...new Set(facultyData.map((faculty) => faculty.session))];

  const departmentOptions = departments.map((department) => (
    <Option key={department} value={department}>
      {department}
    </Option>
  ));

  const sessionOptions = sessions.map((session) => (
    <Option key={session} value={session}>
      {session}
    </Option>
  ));

  const calculateQuestionRatings = (data) => {
    if (!data || !data.length || !data[0]?.questionRating) return [];
  
    const questionCount = data[0].questionRating.length;
    const questionRatings = [];
  
    for (let i = 0; i < questionCount; i++) {
      const ratings = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      data.forEach((faculty) => {
        if (faculty.questionRating[i]) {
          ratings[faculty.questionRating[i]]++;
        }
      });
      questionRatings.push(ratings);
    }
  
    return questionRatings;
  };
  // console.log(filteredFacultyData);
  
  const questions = filteredFacultyData && filteredFacultyData.length > 0 ? [...Array(filteredFacultyData[0]?.questionRating.length).keys()] : [];
  const seriesData = questions.map((questionIndex) => {
    const ratings = calculateQuestionRatings(filteredFacultyData);
    // console.log(ratings);
    const totalRatings = {
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0
    };
  
    filteredFacultyData.forEach(faculty => {
      const rating = faculty.questionRating[questionIndex];
      if (rating) {
        totalRatings[rating] += 1;
      }
    });
  
    const chartData = Object.keys(totalRatings).map((rating) => totalRatings[rating]);
    return {
      name: `Question ${questionIndex + 1}`,
      data: chartData,
    };
  });

  const options = {
    chart: {
      type: 'pie',
      width: '100%',
      height: 300,
    },
   
    labels: ['Rating :1', 'Rating :2', 'Rating :3', 'Rating :4', 'Rating :5'],
    tooltip: {
      enabled: true,
    },
  };

  return (
    <div>
      <h1>Faculty Page</h1>
      <div style={{ marginBottom: '20px' }}>
      <Select
          value={selectedDepartment}
          onChange={(value) => setSelectedDepartment(value)}
          style={{ width: 200, marginRight: '10px' }}
        >
          <Option value="">Select Department</Option>
          {departmentOptions}
        </Select>
        <Select
          value={selectedSession}
          onChange={(value) => setSelectedSession(value)}
          style={{ width: 200, marginRight: '10px' }}
        >
          <Option value="">Select Session</Option>
          {sessionOptions}
        </Select>
        <Button type="primary" onClick={handleFilterChange} disabled={!selectedDepartment || !selectedSession}>Show Graph</Button>
      </div>
      {showGraph && selectedSession && selectedDepartment && (
        <div>
        <h2>Ratings Distribution for Each Question</h2>
        <div>
          {seriesData.map((questionSeries, index) => (
          <div key={index} style={{ width: '70%' }}>
          <h3>{questionSeries.name}</h3>
            <ReactApexChart options={options} series={ questionSeries.data } type="pie" height={250} />
           </div>
          ))}
        </div>
      </div>
      )}
    </div>
  );
};

export default FacultyPage;
