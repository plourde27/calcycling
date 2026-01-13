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

    tile.addEventListener("click", () => {
      // Toggle dropdown visibility
      if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
      } else {
        dropdown.style.display = "block";
      }

      // Only populate once
      if (dropdown.dataset.loaded) return;

      const routes = allRoutes.filter(r => r.section === section);

      routes.forEach(r => {
        const elevPerMile = parseFloat(r.elev_per_mile);
        const elevDisplay = !elevPerMile || elevPerMile < 0 ? "--" : elevPerMile;

        const card = document.createElement("div");
        card.className = "route-card";
        card.innerHTML = `
          <img src="imgs/${r.icon}" alt="${r.name}" class="route-icon">
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
    });
  });
});
