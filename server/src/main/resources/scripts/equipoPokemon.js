const card = document.querySelector('.card');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-btn');

card.addEventListener('click', function() {
  overlay.style.display = 'block';
});

closeBtn.addEventListener('click', function() {
  overlay.style.display = 'none';
});
