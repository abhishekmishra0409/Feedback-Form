import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import { Select, Button } from 'antd';

const { Option } = Select;

const AlumniPage = () => {
  const [alumniData, setAlumniData] = useState([]);
  const [filteredAlumniData, setFilteredAlumniData] = useState([]);
  const [selectedPassout, setSelectedPassout] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [showGraph, setShowGraph] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/alumni');
      setAlumniData(response.data.alumni);
    } catch (error) {
      console.error('Error fetching alumni data:', error);
    }
  };

  const fetchFilteredData = async () => {
    try {
      let url = 'http://localhost:3000/alumni?';
      if (selectedPassout) {
        url += `passout=${selectedPassout}&`;
      }
      if (selectedCourse) {
        url += `course=${selectedCourse}&`;
      }
      if (selectedBranch) {
        url += `branch=${selectedBranch}`;
      }
      
      const response = await axios.get(url);
      setFilteredAlumniData(response.data.alumni);
      setShowGraph(true);
    } catch (error) {
      console.error('Error fetching filtered alumni data:', error);
    }
  };

  const handleFilterChange = () => {
    fetchFilteredData();
  };

  const passouts = [...new Set(alumniData.map((alumni) => alumni.passout))];
  const courses = [...new Set(alumniData.map((alumni) => alumni.course))];
  const branches = [...new Set(alumniData.map((alumni) => alumni.branch))];

  const passoutOptions = passouts.map((passout) => (
    <Option key={passout} value={passout}>
      {passout}
    </Option>
  ));

  const courseOptions = courses.map((course) => (
    <Option key={course} value={course}>
      {course}
    </Option>
  ));

  const branchOptions = branches.map((branch) => (
    <Option key={branch} value={branch}>
      {branch}
    </Option>
  ));

  const calculateQuestionRatings = (data) => {
    if (!data || !data.length || !data[0]?.questionRatings) return [];
  
    const questionCount = data[0]?.questionRatings?.length;
    const questionRatings = [];
  
    for (let i = 0; i < questionCount; i++) {
      const ratings = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      data.forEach((faculty) => {
        if (faculty.questionRatings[i]) {
          ratings[faculty.questionRatings[i]]++;
        }
      });
      questionRatings.push(ratings);
    }
  
    return questionRatings;
  };
  const questions = filteredAlumniData && filteredAlumniData.length > 0 ? [...Array(filteredAlumniData[0]?.questionRatings?.length || 0).keys()] : [];
  const seriesData = questions.map((questionIndex) => {
    const ratings = calculateQuestionRatings(filteredAlumniData);
    const totalRatings = {
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0
    };
  
    filteredAlumniData.forEach(alumni => {
      const rating = alumni.questionRatings[questionIndex];
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
      <h1>Alumni Page</h1>
      <div style={{ marginBottom: '20px' }}>
        <Select
          value={selectedPassout}
          onChange={(value) => setSelectedPassout(value)}
          style={{ width: 200, marginRight: '10px' }}
        >
          <Option value="">Select Passout</Option>
          {passoutOptions}
        </Select>
        <Select
          value={selectedCourse}
          onChange={(value) => setSelectedCourse(value)}
          style={{ width: 200, marginRight: '10px' }}
        >
          <Option value="">Select Course</Option>
          {courseOptions}
        </Select>
        <Select
          value={selectedBranch}
          onChange={(value) => setSelectedBranch(value)}
          style={{ width: 200, marginRight: '10px' }}
        >
          <Option value="">Select Branch</Option>
          {branchOptions}
        </Select>
        <Button type="primary" onClick={handleFilterChange} disabled={!selectedPassout || !selectedCourse || !selectedBranch}>
          Show Graph
        </Button>
      </div>
      {showGraph && selectedPassout && selectedCourse && selectedBranch && (
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

export default AlumniPage;
