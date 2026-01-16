// routes.js

const sections = ["road", "climbs", "gravel", "mtb"];

// Helper to parse CSV manually (handles quoted commas)
function parseCSV(csvText) {
  const lines = csvText.trim().split("\n");
  const headers = lines[0].split(",");

  return lines.slice(1).map(line => {
    const values = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/); // split on commas not inside quotes
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = values[i] ? values[i].replace(/^"|"$/g, "") : "";
    });
    return obj;
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("data/routes.csv");
  const csvText = await response.text();
  const allRoutes = parseCSV(csvText);

  sections.forEach(section => {
    const tile = document.querySelector(`.route-section[data-section="${section}"]`);
    const dropdownId = section === "climbs" ? "climb-routes" : `${section}-routes`;
    const dropdown = document.getElementById(dropdownId);
    const divider = dropdown.parentElement;


    tile.addEventListener("click", () => {
      console.log("clicked");
      const isOpen = divider.classList.contains("open");

      if (isOpen) {
        divider.classList.remove("open");
        dropdown.style.maxHeight = "0px";
        divider.style.setProperty("--expand-distance", "0px");
        return;
      }

  // Populate once
  if (!dropdown.dataset.loaded) {
    const routes = allRoutes.filter(r => r.section === section);

    routes.forEach(r => {
      const elevPerMile = parseFloat(r.elev_per_mile);
      const elevDisplay = !elevPerMile || elevPerMile < 0 ? "--" : elevPerMile;

      const card = document.createElement("div");
      card.className = "route-card";
      card.innerHTML = `
        <img src="imgs/${r.icon}" alt="${r.name}">
        <div class="route-info">
          <h3>${r.name}</h3>
          <p><strong>Mileage:</strong> ${r.mileage} mi</p>
          <p><strong>Elevation:</strong> ${r.elevation} ft</p>
          <p><strong>Elev/mi:</strong> ${elevDisplay}</p>
          <p><strong>Start:</strong> ${r.start}</p>
          <p>${r.description || ""}</p>
          <a href="${r.url}" target="_blank">View Route</a>
        </div>
      `;
      dropdown.appendChild(card);
    });

    dropdown.dataset.loaded = true;
  }

  // Measure content height
  dropdown.style.maxHeight = "none";
  const height = dropdown.scrollHeight;
  dropdown.style.maxHeight = "0px";
  console.log(height);

  requestAnimationFrame(() => {
    divider.style.setProperty("--expand-distance", `${1166}px`);
    dropdown.style.maxHeight = `${height}px`;
    divider.classList.add("open");
  });
});

  });
});
