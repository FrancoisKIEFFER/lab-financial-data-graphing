function fetchChart({ start, end, currency }) {
  axios
    .get("http://api.coindesk.com/v1/bpi/historical/close.json", {
      params: {
        start,
        end,
        currency
      }
    })
    .then(function(response) {
      generateChart(
        Object.keys(response.data.bpi),
        Object.values(response.data.bpi)
      );
    })
    .catch(function(error) {
      console.log(error);
    });
}

function generateChart(labels, data) {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Bitcoin Price Index",
          data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
}

$("#start-date, #end-date,#currency").change(updateChart);

function updateChart() {
  fetchChart({
    start: $("#start-date").val(),
    end: $("#end-date").val(),
    currency: $("#currency").val()
  });
}
updateChart();
