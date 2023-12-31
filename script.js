let linechart;
let weights; //dataset

let firstWeight;

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
    day: new Date(day).toISOString().split("T")[0],
    weight: weight,
  });

  //sorts dates in case user enters date from the past
  weights.weights.sort(function (a, b) {
    return new Date(a.day) - new Date(b.day);
  });

  if (weight) {
    document.querySelector("#weight").innerHTML = weight;
    document.querySelector("#date").innerHTML = day;
    localStorage.setItem("weights", JSON.stringify(weights));
    linechart.update("reset");
    linechart.update("show");
    //update progress
    document.querySelector("#prog").innerHTML =
      "You have gained / lost a total of: " + getProgress(weight) + " lbs";
  }
};

//checks if key exists in localStorage
const manageLocalStorage = () => {
  weights = JSON.parse(localStorage.getItem("weights"));
  if (!weights) {
    localStorage.setItem("weights", JSON.stringify({ weights: [] }));
    weights = { weights: [] };
  }
};

//returns the difference in users progress from first weigh-in

function getProgress(weight) {
  if (firstWeight == null) {
    firstWeight = weight;
    return 0;
  } else {
    return weight - firstWeight;
  }
}
