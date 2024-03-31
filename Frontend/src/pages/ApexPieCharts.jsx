import Chart from 'react-apexcharts';

const ApexPieCharts = ({ alumniData }) => {
  // Extract data for each question
  const questionData = alumniData.map(item => item.questionRatings);

  // Calculate total ratings for each question
  const totalRatings = Array.from({ length: 9 }, () => Array(6).fill(0));

  questionData.forEach(ratings => {
    ratings.forEach((rating, index) => {
      totalRatings[index][rating] += 1;
    });
  });

  // Prepare data for ApexCharts
  const chartData = totalRatings.map((ratings, index) => ({
    name: `Question ${index + 1}`,
    data: ratings.slice(1), // Exclude rating 0
  }));

  const options = {
    chart: {
      type: 'donut',
    },
    labels: ['Rating 1', 'Rating 2', 'Rating 3', 'Rating 4', 'Rating 5'],
  };

  return (
    <div>
      {chartData.map((data, index) => (
        <div key={index}>
          <h2>{data.name}</h2>
          <Chart options={options} series={data.data} type="donut" />
        </div>
      ))}
    </div>
  );
};

export default ApexPieCharts;
