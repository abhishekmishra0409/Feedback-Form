import { useState, useEffect } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import { Select, Button } from "antd";
import * as XLSX from "xlsx";

const { Option } = Select;

const FacultyPage = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [filteredFacultyData, setFilteredFacultyData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [showGraph, setShowGraph] = useState(false);

  const question = [
    " ",  
    "1. The vision and mission of the institution are well known to faculty.",
    "2. The course contents fulfill the needs of students & industries.",
    "3. Syllabus is suitable for/relevant to the course.",
    "4. Faculty has the freedom to adopt/adapt new techniques/strategies of testing and assessment of students.",
    "5. The administration is teacher friendly.",
    "6. The institute Encourage the faculty members for research work.",
    "7. The institute Encourage the faculty members to attend FDP/ Conference/ Seminar to upgrade their knowledge.",
    "8. The institute has safe transport facilities.",
    "9. The environment of institute is free from faculty member caste discrimination.",
    "10. The environment of institute is free from gender discrimination.",
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/faculty");
      setFacultyData(response.data.faculty);
    } catch (error) {
      console.error("Error fetching faculty data:", error);
    }
  };

  const fetchFilteredData = async () => {
    try {
      let url = "http://localhost:3000/faculty?";
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
      console.error("Error fetching filtered faculty data:", error);
    }
  };

  const handleFilterChange = () => {
    fetchFilteredData();
  };

  const departments = [
    ...new Set(facultyData.map((faculty) => faculty.department)),
  ];
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

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredFacultyData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Filtered Data");
    XLSX.writeFile(workbook, "FacultyFeedback_data.xlsx");
  };

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

  const questions =
    filteredFacultyData && filteredFacultyData.length > 0
      ? [...Array(filteredFacultyData[0]?.questionRating.length).keys()]
      : [];
  const seriesData = questions.map((questionIndex) => {
    calculateQuestionRatings(filteredFacultyData);
    // console.log(ratings);
    const totalRatings = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    filteredFacultyData.forEach((faculty) => {
      const rating = faculty.questionRating[questionIndex];
      if (rating) {
        totalRatings[rating] += 1;
      }
    });

    const chartData = Object.keys(totalRatings).map(
      (rating) => totalRatings[rating]
    );
    const questionName = question[questionIndex+1];
  
    return {
      name: questionName,
      data: chartData,
    };
  });

  const options = {
    chart: {
      type: "pie",
      width: "100%",
      height: 300,
    },

    labels: ['Strongly Agree :4', 'Agree :3', 'Disagree :2', 'Strongly Disagree :1'],
    tooltip: {
      enabled: true,
    },
  };

  return (
    <div>
      <h1>Faculty Page</h1>
      <div style={{ marginBottom: "20px" }}>
        <Select
          value={selectedDepartment}
          onChange={(value) => setSelectedDepartment(value)}
          style={{ width: 200, marginRight: "10px" }}
        >
          <Option value="">Select Department</Option>
          {departmentOptions}
        </Select>
        <Select
          value={selectedSession}
          onChange={(value) => setSelectedSession(value)}
          style={{ width: 200, marginRight: "10px" }}
        >
          <Option value="">Select Session</Option>
          {sessionOptions}
        </Select>
        <Button
          type="primary"
          onClick={handleFilterChange}
          disabled={!selectedDepartment || !selectedSession}
        >
          Show Graph
        </Button>
      </div>
      {showGraph && selectedSession && selectedDepartment && (
        <div>
          <Button type="primary" onClick={handleExportToExcel}>
            Export to Excel
          </Button>
          <h2>Ratings Distribution for Each Question</h2>
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
                    fontSize:  '14px',
                    fontWeight:  'bold',
                    fontFamily:  undefined,
                    color:  '#263238'
                  },
                },
                labels: ['Strongly Agree :4', 'Agree :3', 'Disagree :2', 'Strongly Disagree :1'],
                tooltip: {
                  enabled: true,
                },
              };
              return (
                <div key={index} style={{ width: '70%' }}>
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

export default FacultyPage;
