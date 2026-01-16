// sponsors.js

const SPONSORS = [
  {
    name: "Harder Mechanical Contractors",
    logo: "imgs/partners-1.jpeg",
    subtitle: "Harder Mechanical Contractors",
    text:
      "We are incredibly grateful to Harder Mechanical Contractors for their long-time support of Cal Cycling. Cal Cycling as it is would not exist without them. They fabricate high-quality, sophisticated piping safely, on time, and on budget.",
    powered: true,
    url: "https://harder.com/"
  },
  {
    name: "Bay Area Bicycle Law",
    logo: "imgs/partners-2.jpeg",
    subtitle: "Bay Area Bicycle Law",
    text:
      "We take safety seriously, so the support of Bay Area Bicycle Law is greatly appreciated. They handle the legal process so riders can focus on healing.",
    powered: false,
    url:"https://bayareabicyclelaw.com/"
  },
  {
    name: "Specialized",
    logo: "imgs/partners-9.jpeg",
    subtitle: "Specialized",
    text:
      "We are riders -- that fact has guided our every decision since 1974. Specialized: made for riders, by riders.",
    powered: false,
    url:"https://www.specialized.com/" 
  },
  {
    name: "Stay True Cycles",
    logo: "imgs/partners-4.jpeg",
    subtitle: "Stay True Cycles",
    text:
      "Stay True Cycles supports Cal Cycling with discounts and keeps the team stocked with bikes and parts.",
    powered: false,
    url:"https://www.staytrue.bike/"
    
  },
  {
    name: "Skratch Labs",
    logo: "imgs/partners-5.jpeg",
    subtitle: "Skratch Labs",
    text:
      "Skratch Labs makes sports nutrition designed to help you perform better without offending your gut or taste buds.",
    powered: false,
    url:"https://www.skratchlabs.com/"
    
  },
  {
    name: "Voler",
    logo: "imgs/partners-6.jpeg",
    subtitle: "Voler",
    text:
      "For decades, Voler has proudly built premium cycling and athletic apparel in the USA, from design to shipping on the West Coast.",
    powered: false,
    url:"https://store.voler.com/"
  },
  {
    name: "Rudy Project",
    logo: "imgs/partners-8.jpeg",
    subtitle: "Rudy Project",
    text:
      "Rudy Project designs performance eyewear, helmets, and gear to elevate safety, comfort, and performance for athletes worldwide.",
    powered: false,
    url:"https://www.rudyproject.com/" 
  }
];


const SLIDE_TIME = 7000; // 10s visible
const TRANSITION_TIME = 800; // must match CSS

// DOM
const stage = document.getElementById("card-stage");
const hoverPause = document.getElementById("hover-pause");

const titleEl = document.getElementById("sponsor-title");
const subtitleEl = document.getElementById("sponsor-subtitle");
const textEl = document.getElementById("sponsor-text");
const timerFill = document.getElementById("timer-fill");

let index = 0;
let activeCard = null;
let startTime = 0;
let paused = false;
let rafId = null;

// ---------------------------
// TEXT UPDATE (fade)
// ---------------------------
function updateText(sponsor) {
  const box = document.getElementById("gold-box");
  box.classList.remove("visible");

  setTimeout(() => {
    titleEl.textContent = sponsor.powered
      ? "CAL CYCLING IS PROUD TO BE POWERED BY"
      : "CAL CYCLING IS SUPPORTED BY";


    textEl.textContent = sponsor.text;
    // Update h3 as a link
    subtitleEl.innerHTML = `<a href="${sponsor.url}" target="_blank">${sponsor.subtitle}</a>`;


    box.classList.add("visible");
  }, 300);
}

// ---------------------------
// CARD CREATION
// ---------------------------
function createCard(sponsor) {
  const card = document.createElement("div");
  card.className = "sponsor-card";
  card.innerHTML = `<img src="${sponsor.logo}" alt="${sponsor.name}">`;

  stage.appendChild(card);

  // Force initial offscreen-right state
  card.getBoundingClientRect();

  requestAnimationFrame(() => {
    card.classList.add("enter");
  });

  return card;
}

// ---------------------------
// SLIDE CHANGE
// ---------------------------
function nextSlide() {
  const sponsor = SPONSORS[index];
  const newCard = createCard(sponsor);

  updateText(sponsor);

  if (activeCard) {
    activeCard.classList.remove("enter");
    activeCard.classList.add("exit");

    const old = activeCard;
    setTimeout(() => old.remove(), TRANSITION_TIME);
  }

  activeCard = newCard;
  index = (index + 1) % SPONSORS.length;

  startTime = performance.now();
  timerFill.style.width = "0%";
}

// ---------------------------
// TIMER LOOP
// ---------------------------
function tick(now) {
  if (!paused) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / SLIDE_TIME, 1);
    timerFill.style.width = `${progress * 100}%`;

    if (progress >= 1) {
      nextSlide();
    }
  }

  rafId = requestAnimationFrame(tick);
}

// ---------------------------
// PAUSE ON HOVER
// ---------------------------
hoverPause.addEventListener("mouseenter", () => {
  paused = true;
});

hoverPause.addEventListener("mouseleave", () => {
  paused = false;
  startTime = performance.now() - parseFloat(timerFill.style.width) / 100 * SLIDE_TIME;
});

// ---------------------------
// INIT
// ---------------------------
nextSlide();
rafId = requestAnimationFrame(tick);
