export const initAccordion = () => {
  const items = document.querySelectorAll('[data-accordion-item]');
  if (!items.length) return;

  items.forEach((item) => {
    const trigger = item.querySelector('[data-accordion-trigger]');
    const panel = item.querySelector('[data-accordion-panel]');
    if (!trigger || !panel) return;

    const setExpanded = (isExpanded) => {
      trigger.setAttribute('aria-expanded', String(isExpanded));
      panel.hidden = !isExpanded;
      panel.classList.toggle('is-open', isExpanded);
      panel.setAttribute('aria-hidden', String(!isExpanded));
    };

    setExpanded(trigger.getAttribute('aria-expanded') === 'true');

    trigger.addEventListener('click', () => {
      setExpanded(trigger.getAttribute('aria-expanded') !== 'true');
    });
  });
};
