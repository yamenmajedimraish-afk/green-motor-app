function calculate() {
    // Inputs
    const cars = +document.getElementById("cars").value;
    const trucks = +document.getElementById("trucks").value;
    const buses = +document.getElementById("buses").value;
    const forklifts = +document.getElementById("forklifts").value;
    const planes = +document.getElementById("planes").value;
    const loadFactor = +document.getElementById("loadFactor").value;
    const lighting = +document.getElementById("lighting").value;
    const heating = +document.getElementById("heating").value;
    const cooling = +document.getElementById("cooling").value;
    const computing = +document.getElementById("computing").value;
    const subcontractors = +document.getElementById("subcontractors").value;
  
    const evShare = +document.getElementById("evShare").value;
    const kmReduction = +document.getElementById("kmReduction").value;
  
    // Emission factors
    const EF = {
      cars: 0.18, // kg/km
      trucks: 0.90,
      buses: 1.10,
      forklifts: 4.0, // kg/hour
      planes: 9000, // kg/hour
      lighting: 0.42, // kg/kWh
      heating: 0.20, // kg/kWh-th
      cooling: 0.42, // kg/kWh
      computing: 0.42 // kg/kWh
    };
  
    // Formulas
    const carsEm = ((cars * EF.cars) * (1 - 0.7 * (evShare / 100)) * (1 - kmReduction / 100)) / 1000;
    const trucksEm = (trucks * EF.trucks) / 1000;
    const busesEm = (buses * EF.buses) / 1000;
    const forkliftsEm = (forklifts * EF.forklifts) / 1000;
    const planesEm = ((planes * EF.planes) * (loadFactor / 100)) / 1000;
    const lightingEm = (lighting * EF.lighting) / 1000;
    const heatingEm = (heating * EF.heating) / 1000;
    const coolingEm = (cooling * EF.cooling) / 1000;
    const computingEm = (computing * EF.computing) / 1000;
    const subcontractorEm = subcontractors;
  
    const optimizedTotal =
      carsEm + trucksEm + busesEm + forkliftsEm + planesEm +
      lightingEm + heatingEm + coolingEm + computingEm + subcontractorEm;
  
    const baselineTotal = optimizedTotal * 1.5; // Assume 50% higher baseline
  
    const categories = [
      "Cars", "Trucks", "Buses", "Forklifts",
      "Cargo Planes", "Office Lighting", "Heating",
      "Cooling", "Computing", "Subcontractors"
    ];
  
    const data = [
      carsEm, trucksEm, busesEm, forkliftsEm,
      planesEm, lightingEm, heatingEm, coolingEm,
      computingEm, subcontractorEm
    ];
  
    renderCharts(categories, data, baselineTotal, optimizedTotal);
  }
  
  function renderCharts(labels, data, baseline, optimized) {
    const ctxPie = document.getElementById("pieChart").getContext("2d");
    const ctxBar = document.getElementById("barChart").getContext("2d");
  
    if (window.pieChart) window.pieChart.destroy();
    if (window.barChart) window.barChart.destroy();
  
    window.pieChart = new Chart(ctxPie, {
      type: "pie",
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: [
            "#4caf50", "#ff9800", "#2196f3", "#9c27b0", "#f44336",
            "#00bcd4", "#cddc39", "#ffeb3b", "#795548", "#9e9e9e"
          ]
        }]
      },
      options: {
        plugins: { legend: { labels: { color: "#fff" } } }
      }
    });
  
    window.barChart = new Chart(ctxBar, {
      type: "bar",
      data: {
        labels: ["Baseline", "Optimized"],
        datasets: [{
          label: "Total Emissions (tons CO₂e)",
          data: [baseline, optimized],
          backgroundColor: ["#2196f3", "#4caf50"]
        }]
      },
      options: {
        scales: {
          x: { ticks: { color: "#fff" } },
          y: { ticks: { color: "#fff" } }
        },
        plugins: { legend: { labels: { color: "#fff" } } }
      }
    });
  
    document.getElementById("results").innerHTML = `
      <h3>Total Emissions</h3>
      <p>Baseline: ${baseline.toFixed(1)} tons CO₂e</p>
      <p>Optimized: ${optimized.toFixed(1)} tons CO₂e</p>
    `;
  }