const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.navlinks');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
}

const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');

filters.forEach(btn => btn.addEventListener('click', () => {
  filters.forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });

  btn.classList.add('active');
  btn.setAttribute('aria-pressed','true');

  cards.forEach(card => card.hidden =
    (btn.dataset.filter !== 'todos' &&
     card.dataset.category !== btn.dataset.filter)
  );
}));

const modal = document.querySelector('.modal');
let lastFocused;

if (modal) {
  const modalImage = modal.querySelector('img');
  const modalCaption = modal.querySelector('.modal-caption');
  const closeBtn = modal.querySelector('.close-modal');

  const close = () => {
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    if(lastFocused) lastFocused.focus();
  };

  document.querySelectorAll('.view-image').forEach(btn =>
    btn.addEventListener('click', () => {
      lastFocused = btn;
      modalImage.src = btn.dataset.src;
      modalImage.alt = btn.dataset.alt || '';
      modalCaption.textContent = btn.dataset.alt || 'Imagem de exemplo';
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    })
  );

  closeBtn.addEventListener('click', close);

  modal.addEventListener('click', e => {
    if(e.target === modal) close();
  });

  document.addEventListener('keydown', e => {
    if(e.key === 'Escape' &&
       modal.getAttribute('aria-hidden') === 'false') close();
  });
}
