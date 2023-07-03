// Global variables
let gddData = [];

function fetchTemperatureData() {
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;

  // Perform API request to fetch temperature data using the start and end dates

  // Dummy data for demonstration
  const dummyTemperatureData = [
    { date: "2023-06-01", maxTemp: 80, minTemp: 60 },
    { date: "2023-06-02", maxTemp: 75, minTemp: 55 },
    { date: "2023-06-03", maxTemp: 82, minTemp: 62 },
    { date: "2023-06-04", maxTemp: 77, minTemp: 57 },
    { date: "2023-06-05", maxTemp: 85, minTemp: 65 }
  ];

  // Calculate GDD for each day and accumulate the results
  let totalGDD = 0;
  gddData = [];

  dummyTemperatureData.forEach(data => {
    const maxTemp = data.maxTemp;
    const minTemp = data.minTemp;
    const gdd = Math.max((maxTemp + minTemp) / 2 - 50, 0); // Assuming 50°F as the base temperature

    totalGDD += gdd;
    gddData.push({ date: data.date, gdd });
  });

  // Update the table and chart with the results
  updateTable();
  updateChart();
}

function updateTable() {
  const tableBody = document.querySelector("#gdd-table tbody");
  tableBody.innerHTML = "";

  gddData.forEach(data => {
    const row = document.createElement("tr");
    const dateCell = document.createElement("td");
    const gddCell = document.createElement("td");

    dateCell.textContent = data.date;
    gddCell.textContent = data.gdd.toFixed(2);

    row.appendChild(dateCell);
    row.appendChild(gddCell);
    tableBody.appendChild(row);
  });
}

function updateChart() {
  const chartCanvas = document.getElementById("gdd-chart");

  const chartLabels = gddData.map(data => data.date);
  const chartData = gddData.map(data => data.gdd);

  const ctx = chartCanvas.getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: chartLabels,
      datasets: [
        {
          label: "GDD",
          data: chartData,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}