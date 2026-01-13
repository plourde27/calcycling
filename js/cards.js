const partnerCards = document.querySelectorAll('.partner-card');

function checkPartnerVisibility() {
  const triggerBottom = window.innerHeight * 0.75;
  partnerCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < triggerBottom && cardTop + card.offsetHeight > 0) {
      card.classList.add('visible');
    } else {
      card.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', checkPartnerVisibility);
window.addEventListener('load', checkPartnerVisibility);