let linechart;

let weights = {
  weights: [
    { day: "2023-04-01", weight: 150 },
    { day: "2023-04-02", weight: 152 },
    { day: "2023-04-03", weight: 154 },
    { day: "2023-04-04", weight: 153 },
    { day: "2023-04-05", weight: 156 },
    { day: "2023-04-06", weight: 158 },
    { day: "2023-04-07", weight: 157 },
    { day: "2023-04-08", weight: 159 },
    { day: "2023-04-09", weight: 157 },
  ],
};

window.addEventListener("load", () => {
  const graph = document.getElementById("data");
  graph.getContext("2d");
  linechart = new Chart(graph, {
    type: "line",
    data: {
      datasets: [
        {
          data: weights.weights,
          borderWidth: 4,
          pointStyle: false,
          borderColor: "black",
        },
      ],
    },

    options: {
      parsing: {
        xAxisKey: "day",
        yAxisKey: "weight",
      },
      scales: {
        y: {
          title: {
            display: true,
            text: "Weight",
          },
          border: {
            display: false,
          },
        },
        x: {
          display: false,
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Your Progress",
        },
        legend: {
          display: false,
        },
      },
    },
  });
});

let btn = document.querySelector("#btn");
let btn2 = document.querySelector("#popup-btn");
let blur = document.querySelector("#blurred");
let popup = document.querySelector("#pop-up");
btn.addEventListener("click", function () {
  popup.style.display = "flex";
  blur.style.display = "flex";
});

btn2.addEventListener("click", function () {
  popup.style.display = "none";
  blur.style.display = "none";
});
