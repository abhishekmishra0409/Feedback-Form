import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import { Select } from 'antd';

const { Option } = Select;

const StudentPage = () => {
  const [studentData, setStudentData] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/student');
        console.log('Fetched Data:', response.data);
        setStudentData(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to calculate the average rating for each question
  const calculateAverageRatings = () => {
    if (!studentData || !studentData.length || !studentData[0]?.questionRating) return []; 

    let filteredData = studentData;
    if (selectedSession) {
      filteredData = filteredData.filter(student => student.session === selectedSession);
    }
    if (selectedProgram) {
      filteredData = filteredData.filter(student => student.program === selectedProgram);
    }
    if (selectedBranch) {
      filteredData = filteredData.filter(student => student.branch === selectedBranch);
    }
    if (selectedSemester) {
      filteredData = filteredData.filter(student => student.semester === selectedSemester);
    }


    const questionCount = filteredData[0]?.questionRating.length || 0;
    const averages = new Array(questionCount).fill(0);

    filteredData.forEach((student) => {
      student.questionRating.forEach((rating, index) => {
        averages[index] += rating;
      });
    });

    return averages.map((total) => total / filteredData.length);
  };

  const sessions = studentData && studentData.length > 0 ? [...new Set(studentData.map(student => student.session))] : [];
  const programs = studentData && studentData.length > 0 ? [...new Set(studentData.map(student => student.program))] : [];
  const branches = studentData && studentData.length > 0 ? [...new Set(studentData.map(student => student.branch))] : [];
  const semesters = studentData && studentData.length > 0 ? [...new Set(studentData.map(student => student.semester))] : [];


  const sessionOptions = sessions.map(session => <Option key={session} value={session}>{session}</Option>);
  const programOptions = programs.map(program => <Option key={program} value={program}>{program}</Option>);
  const branchOptions = branches.map(branch => <Option key={branch} value={branch}>{branch}</Option>);
  const semesterOptions = semesters.map(semester => <Option key={semester} value={semester}>{semester}</Option>);


  const labels = studentData && studentData.length > 0 ? 
    [...Array(studentData[0]?.questionRating.length).keys()].map((index) => `Question ${index + 1}`) 
    : [];
    const seriesData = calculateAverageRatings();
    const options = {
      chart: {
        type: 'donut',
        width: '100%',
        height: 250,
      },
      labels: labels, 
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          const seriesIndex = opts.seriesIndex;
          return `${seriesData[seriesIndex].toFixed(2)} `;
        },
      },
      plotOptions: {
        pie: {
          customScale: 0.8,
        },
      },
      tooltip: {
        enabled: true,
      },
      series: seriesData, 
    };
    

  return (
    <div>
      <h1>Student Page</h1>
      <div style={{ marginBottom: '20px' }}>
        <Select value={selectedSession} onChange={(value) => setSelectedSession(value)} style={{ width: 200, marginRight: '10px' }}>
          <Option value="">Select Session</Option>
          {sessionOptions}
        </Select>
        <Select value={selectedProgram} onChange={(value) => setSelectedProgram(value)} style={{ width: 200, marginRight: '10px' }}>
          <Option value="">Select Program</Option>
          {programOptions}
        </Select>
        <Select value={selectedBranch} onChange={(value) => setSelectedBranch(value)} style={{ width: 200, marginRight: '10px' }}>
          <Option value="">Select Branch</Option>
          {branchOptions}
        </Select>
        <Select value={selectedSemester} onChange={(value) => setSelectedSemester(value)} style={{ width: 200 }}>
          <Option value="">Select Semester</Option>
          {semesterOptions}
        </Select>
      </div>
      {selectedSession && selectedProgram && selectedBranch && selectedSemester && (
        <div>
          <h2>Average Ratings of Each Question</h2>
          <ReactApexChart options={options} series={calculateAverageRatings()} type="donut" height={300}/>
        </div>
      )}
    </div>
  );
};

export default StudentPage;
