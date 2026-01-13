
document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.querySelector(".news-viewport");
  const track = document.querySelector(".news-track");
  const cards = document.querySelectorAll(".news-card");
  const left = document.querySelector(".news-arrow.left");
  const right = document.querySelector(".news-arrow.right");

  let index = 0;
  const HOLD = 5500;
  let timer;

  function cardWidth() {
    return viewport.offsetWidth;
  }

  function activate(i) {
    index = i;

    cards.forEach(card => {
      const bar = card.querySelector(".news-line span");
      bar.style.transition = "none";
      bar.style.width = "0%";
    });

    track.style.transform = `translateX(${-index * cardWidth()}px)`;

    const bar = cards[index].querySelector(".news-line span");
    requestAnimationFrame(() => {
      bar.style.transition = `width ${HOLD}ms linear`;
      bar.style.width = "100%";
    });
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => {
      activate((index + 1) % cards.length);
    }, HOLD);
  }

  left.onclick = () => {
    activate((index - 1 + cards.length) % cards.length);
    startAuto();
  };

  right.onclick = () => {
    activate((index + 1) % cards.length);
    startAuto();
  };

  window.addEventListener("resize", () => activate(index));

  activate(0);
  startAuto();
});
