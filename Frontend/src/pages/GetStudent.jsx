import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import { Select } from 'antd';

const { Option } = Select;
  
const StudentPage = () => {
  const [studentData, setStudentData] = useState([]);
  const [studentFilteredData, setStudentFilteredData] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/student');
      // console.log('Fetched Data:', response.data.students);
      setStudentData(response.data.students);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const fetchFilteredData = async () => {
    try {
      let url = 'http://localhost:3000/student?';
      if (selectedSession) {
        url += `session=${selectedSession}&`;
      }
      if (selectedProgram) {
        url += `program=${selectedProgram}&`;
      }
      if (selectedBranch) {
        url += `branch=${selectedBranch}&`;
      }
      if (selectedSemester) {
        url += `semester=${selectedSemester}&`;
      }
  
      const response = await axios.get(url);
      setStudentFilteredData(response.data.students);
    } catch (error) {
      console.error('Error fetching filtered student data:', error);
    }
  };

  const handleFilterChange = () => {
    fetchFilteredData();
  };

  const sessions = studentData && studentData.length > 0 ? [...new Set(studentData.map(student => student.session))] : [];
  const programs = studentData && studentData.length > 0 ? [...new Set(studentData.map(student => student.program))] : [];
  const branches = studentData && studentData.length > 0 ? [...new Set(studentData.map(student => student.branch))] : [];
  const semesters = studentData && studentData.length > 0 ? [...new Set(studentData.map(student => student.semester))] : [];
  const years = studentData && studentData.length > 0 ? [...new Set(studentData.map(student => student.year))] : [];

  const sessionOptions = sessions.map(session => <Option key={session} value={session}>{session}</Option>);
  const programOptions = programs.map(program => <Option key={program} value={program}>{program}</Option>);
  const branchOptions = branches.map(branch => <Option key={branch} value={branch}>{branch}</Option>);
  const semesterOptions = semesters.map(semester => <Option key={semester} value={semester}>{semester}</Option>);
  const yearOptions = years.map(year => <Option key={year} value={year}>{year}</Option>);

  const calculateQuestionRatings = (data) => {
    if (!data || !data.length || !data[0]?.questionRating) return [];
  
    const questionCount = data[0].questionRating.length;
    const questionRatings = [];
  
    for (let i = 0; i < questionCount; i++) {
      const ratings = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      data.forEach((student) => {
        if (student.questionRating[i]) {
          ratings[student.questionRating[i]]++;
        }
      });
      questionRatings.push(ratings);
    }
  
    return questionRatings;
  };
  
  const questions = studentFilteredData && studentFilteredData.length > 0 ? [...Array(studentFilteredData[0]?.questionRating.length).keys()] : [];
  const seriesData = questions.map((questionIndex) => {
    const ratings = calculateQuestionRatings(studentFilteredData);
    const totalRatings = {
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0
    };
  
    studentFilteredData.forEach(student => {
      const rating = student.questionRating[questionIndex];
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
      <h1>Student Page</h1>
      <div style={{ marginBottom: '20px' }}>
        <Select value={selectedSession} onChange={(value) => setSelectedSession(value)} style={{ width: 200, marginRight: '10px' }}>
          <Option value="">Select Session</Option>
          {sessionOptions}
        </Select>
        <Select value={selectedProgram} onChange={(value) => setSelectedProgram(value)} style={{ width: 200, marginRight: '10px' }}>
          <Option value="">Select Program</Option>
          {selectedSession &&(
            <>
              {programOptions}
            </>
          )}
        </Select>
        <Select value={selectedBranch} onChange={(value) => setSelectedBranch(value)} style={{ width: 200, marginRight: '10px' }}>
          <Option value="">Select Branch</Option>
          {selectedSession && selectedProgram && (
            <>
              {branchOptions}
            </>
          )}
        </Select>
        
        <Select value={selectedSemester} onChange={(value) => setSelectedSemester(value)} style={{ width: 200 ,marginRight: '10px'}} >
          <Option value="">Select Semester</Option>
          {selectedSession && selectedProgram && selectedBranch && (
            <>
              {semesterOptions}
            </>
          )}
        </Select>
        <Select value={selectedYear} onChange={(value) => setSelectedYear(value)} style={{ width: 200 }} onSelect={handleFilterChange} >
          <Option value="">Select Year</Option>
          {selectedSession && selectedProgram && selectedBranch && selectedSemester &&(
            <>
              {yearOptions}
            </>
          )}
          
        </Select>
      </div>
      {selectedSession && selectedProgram && selectedBranch && selectedSemester && selectedYear &&(
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

export default StudentPage;
