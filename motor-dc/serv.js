bgColor = "rgb(24, 24, 26)";

var layout = {
  font: {
    size: 10,
    color: "white",
  },

  yaxis: {
    // range: [-4.5, 4.5],
  },

  autosize: false,
  width: 500,
  height: 300,
  margin: {
    l: 35,
    r: 20,
    b: 35,
    t: 35,
    pad: 4,
  },
  plot_bgcolor: bgColor,
  paper_bgcolor: bgColor,

  showlegend: false,

  legend: {
    x: 1,
    xanchor: "right",
    y: 1,
  },
};

const genericplot = (id, color, color2) => {
  const arr = [];

  arr.push({
    y: [],
    mode: "lines",
    name: ".",
    marker: { color: color },
    line: { width: 2 },
  });

  if (color2)
    arr.push({
      y: [],
      mode: "lines",
      name: ".",
      marker: { color: color2 },
      line: { width: 2 },
    });

  Plotly.plot(id, arr, layout, {
    displayModeBar: false,
  });
};

const $ = (str) => {
  return document.querySelector(str);
};
