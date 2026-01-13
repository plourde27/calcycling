const aboutBlocks = document.querySelectorAll('.about-block');

function checkVisibility() {
  const triggerBottom = window.innerHeight * 0.75;
  aboutBlocks.forEach(block => {
    const blockTop = block.getBoundingClientRect().top;
    if (blockTop < triggerBottom && blockTop + block.offsetHeight > 0) {
      block.classList.add('visible');
    } else {
      block.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);