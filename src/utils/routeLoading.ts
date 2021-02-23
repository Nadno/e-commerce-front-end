const overflowActive = (toggle: boolean) =>
  (document.body.style.overflowY = toggle ? 'hidden' : 'initial');

const progress = {
  start() {
    overflowActive(true);
    const $load = document.querySelector<HTMLElement>('.loading');
    if ($load) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      $load.classList.add('active');
    }
  },
  done() {
    const $load = document.querySelector<HTMLElement>('.loading');
    if ($load) {
      $load.classList.remove('active');
    }
    overflowActive(false);
  },
};

export default progress;
