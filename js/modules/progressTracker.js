export const initProgressTracker = () => {
  const items = document.querySelectorAll('[data-progress-item] .progress__toggle');
  if (!items.length) return;

  items.forEach((button) => {
    const icon = button.querySelector('.progress__icon');
    if (!icon) return;

    button.addEventListener('click', () => {
      const isPressed = button.getAttribute('aria-pressed') === 'true';
      button.setAttribute('aria-pressed', String(!isPressed));
      icon.textContent = isPressed ? '○' : '✓';
    });
  });
};
