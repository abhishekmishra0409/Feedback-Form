import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import { Select , Button } from 'antd';
import * as XLSX from 'xlsx';

const { Option } = Select;
  
const StudentPage = () => {
  const [studentData, setStudentData] = useState([]);
  const [studentFilteredData, setStudentFilteredData] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [facultyName, setFacultyName] = useState('');
  const [showGraph, setShowGraph] = useState(false);
  const question = [
    " ",  
    "1. Faculty take classes as per schedule on regular basis.",
    "2. Faculty has the knowledge of subject in depth and able to explain difficult concept.",
    "3. Faculty has completed the syllabus of the subject.",
    "4. Faculty is able to maintain the discipline in class.",
    "5. Conduction of classes are effective and interesting.",
    "6. Faculty encourage participation of students in the class.",
    "7. Faculty behavior is polite.",
    "8. Students can easily communicate with faculty.",
    "9. Practical classes held as per the schedule",
    "10. Faculty conduct practical classes regularly.",
    "11. Faculty explain experiments and clarifies the doubt.",
    "12. Faculty has practical knowledge in depth.",
  ];
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://feedback-form-5vjm.onrender.com/student');
      // console.log('Fetched Data:', response.data.students);
      setStudentData(response.data.students);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const fetchFilteredData = async () => {
    try {
      let url = 'https://feedback-form-5vjm.onrender.com/student?';
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
      if(selectedSubject){
        url+= `subject=${selectedSubject}&`;
      }
  
      const response = await axios.get(url);
      setStudentFilteredData(response.data.students);
      setFacultyName(response.data.students[0].facultyName);
      setShowGraph(true);
    } catch (error) {
      console.error('Error fetching filtered student data:', error);
    }
  };

  const handleFilterChange = () => {
    fetchFilteredData();
  };
  // console.log(studentFilteredData);
  
  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(studentFilteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Filtered Data');
    XLSX.writeFile(workbook, 'StudentFeedback_data.xlsx');
  };

  const sessions = studentData && studentData.length > 0 ? [...new Set(studentData.map(student => student.session))] : [];
  const programs = studentData && studentData.length > 0 ? [...new Set(studentData.map(student => student.program))] : [];
  const branches = studentData && studentData.length > 0 ? [...new Set(studentData.map(student => student.branch))] : [];
  const semesters = studentData && studentData.length > 0 ? [...new Set(studentData.map(student => student.semester))] : [];
  const subject = studentData && studentData.length > 0 ? [...new Set(studentData.map(student => student.subject))]  : [];

  const sessionOptions = sessions.map(session => <Option key={session} value={session}>{session}</Option>);
  const programOptions = programs.map(program => <Option key={program} value={program}>{program}</Option>);
  const branchOptions = branches.map(branch => <Option key={branch} value={branch}>{branch}</Option>);
  const semesterOptions = semesters.map(semester => <Option key={semester} value={semester}>{semester}</Option>);
  const subjectOptions = subject.map(sub => <Option key={sub} value={sub}> {sub}</Option> );

  const calculateQuestionRatings = (data) => {
    if (!data || data.length === 0 || !data[0]?.questionRating) return [];
  
    const questionCount = data[0].questionRating.length;
    const questionRatings = [];
  
    for (let i = 0; i < questionCount; i++) {
      const ratings = { 1: 0, 2: 0, 3: 0, 4: 0,5:0 };
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

  // const questions = studentFilteredData && studentFilteredData.length > 0 ? [...Array(studentFilteredData[0]?.questionRating.length).keys()] : [];
  const seriesData = questions.map((questionIndex) => {
    calculateQuestionRatings(studentFilteredData);
    const totalRatings = {
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5':0
    };
  
    studentFilteredData.forEach(student => {
      const rating = student.questionRating[questionIndex];
      if (rating) {
        totalRatings[rating] += 1;
      }
    });
  
    const chartData = Object.keys(totalRatings).map((rating) => totalRatings[rating]);
    const questionName = question[questionIndex+1];
  
    return {
      name: questionName,
      data: chartData,
    };
  });


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
        <Select value={selectedSubject} onChange={(value) => setSelectedSubject (value)} style={{ width: 200 ,marginRight: '10px'}} >
          <Option value="">Select Subject</Option>
          {selectedSession && selectedProgram && selectedBranch && selectedSemester &&(
            <>
              {subjectOptions}
            </>
          )}
          
        </Select>
        <Button
          type="primary"
          onClick={handleFilterChange}
          disabled={!selectedSession || !selectedBranch || !selectedSemester || !selectedProgram || !selectedSubject}
        >
          Show Graph
        </Button>
      </div>
      {showGraph && selectedSession && selectedProgram && selectedBranch && selectedSemester &&(
        <div>
          <div style={{display:"flex" , alignItems:"center"}}>
          <Button  type="primary" onClick={handleExportToExcel}>Export to Excel</Button>
          <h5 style={{marginLeft:"10px"}}>Total Feedback Count : {studentFilteredData.length}</h5>
          </div>
        <h2>Feedback Analysis of {facultyName}</h2>
        <div>
        {seriesData.map((questionSeries, index) => {
              const options = {
                chart: {
                  toolbar: {
                    show: true,
                    offsetX: 0,
                    offsetY: 0,
                    tools: {
                      download: true,
                      selection: true,
                      zoom: true,
                      zoomin: true,
                      zoomout: true,
                      pan: true,
                      reset: true | '<img src="/static/icons/reset.png" width="20">',
                      customIcons: []
                    },
                    export: {
                      csv: {
                        filename: undefined,
                        columnDelimiter: ',',
                        headerCategory: 'category',
                        headerValue: 'value',
                        dateFormatter(timestamp) {
                          return new Date(timestamp).toDateString()
                        }
                      },
                      svg: {
                        filename: undefined,
                      },
                      png: {
                        filename: undefined,
                      }
                    },
                    autoSelected: 'zoom' 
                  },
                  type: 'pie',
                  width: '100%',
                  height: 300,
                },
                title: {
                  text: questionSeries.name,
                  align: 'left',
                  margin: 10,
                  offsetX: 0,
                  offsetY: 0,
                  floating: false,
                  style: {
                    fontSize:  '18px',
                    fontWeight:  'bold',
                    fontFamily:  undefined,
                    color:  '#263238'
                  },
                },
                labels: ['Strongly Agree : (5 Point)', 'Agree :(4 Point)',"Average :(3 Point)", 'Disagree :(2 Point)', 'Strongly Disagree :(1 Point)'],
                tooltip: {
                  enabled: false,
                },
              };
              return (
                <div key={index} style={{ width: '65%' }}>
                  <ReactApexChart options={options} series={ questionSeries.data } type="pie" height={250} />
                </div>
              );
            })}
        </div>
      </div>
      )}
    </div>
  );
};

export default StudentPage;
