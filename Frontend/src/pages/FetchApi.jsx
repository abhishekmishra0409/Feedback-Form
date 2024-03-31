import React, { useState } from 'react';
import axios from 'axios';
import ApexPieCharts from './ApexPieCharts';

const FetchApi = () => {
  const [alumniData, setAlumniData] = useState([]);

  const fetchApi = async () => {
    try {
      const res = await axios.get('http://localhost:3000/alumni/');
      setAlumniData(res.data.alumni);
    } catch (error) {
      console.error('Error fetching API:', error);
    }
  };

  return (
    <div>
      <button onClick={fetchApi}>Click</button>
      {alumniData.length > 0 && <ApexPieCharts alumniData={alumniData} />}
    </div>
  );
};

export default FetchApi;
