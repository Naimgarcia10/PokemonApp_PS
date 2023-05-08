const card = document.querySelector('.card');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-btn');
const saveBtn = document.querySelector('.save-btn');

card.addEventListener('click', function() {
  overlay.style.display = 'block';
});

closeBtn.addEventListener('click', function() {
  overlay.style.display = 'none';
});

saveBtn.addEventListener('click', function() {
  overlay.style.display = 'none';
});

