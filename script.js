let linechart;

let weights; //dataset

//generate chart
window.addEventListener("load", () => {
  manageLocalStorage();
  const graph = document.querySelector("#data");
  graph.getContext("2d");
  linechart = new Chart(graph, {
    type: "line",
    data: {
      datasets: [
        {
          data: weights.weights,
          borderWidth: 2,
          pointStyle: false,
          borderColor: "black",
          tension: 0.3,
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

//event listener for log weight button
btn.addEventListener("click", function () {
  popup.style.display = "flex";
  blur.style.display = "flex";
});

//event listener for pop-up button
btn2.addEventListener("click", function () {
  popup.style.display = "none";
  blur.style.display = "none";
  addWeight();
});

//adds weight input to localStorage, set previous weigh-in values
const addWeight = () => {
  let day = document.querySelector("#date-input").value;
  let weight = parseInt(document.querySelector("#weight-input").value);

  weights.weights.push({
    day: new Date(day).toISOString(),
    weight: weight,
  });

  if (weight) {
    localStorage.setItem("weights", JSON.stringify(weights));
    document.querySelector("#weight").innerHTML = weight;
    document.querySelector("#date").innerHTML = day;
    linechart.update("reset");
    linechart.update("show");
  }
};

const manageLocalStorage = () => {
  weights = JSON.parse(localStorage.getItem("weights"));
  if (!weights) {
    localStorage.setItem("weights", JSON.stringify({ weights: [] }));
    weights = { weights: [] };
  }
};
