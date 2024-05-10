import Alpine from '@alpinejs/csp';
import './style.css';

window.Alpine = Alpine;

Alpine.data('data', () => ({
  popoverOpen: false,
  popoverArrow: true,
  popoverPosition: 'bottom',
  popoverHeight: 0,
  popoverOffset: 8,
  handleToggleTheme() {
    this.popoverOpen = !this.popoverOpen
  },
  handleCloseTheme(){
    this.popoverOpen = false;
  },
  handleChangeTheme(evt) {
    const theme = evt.target.dataset.theme
    if (['light', 'dark'].includes(theme)) {
      localStorage.theme = theme;
    } else {
      localStorage.removeItem('theme');
    }
    this.doTheme();
  },
  doTheme() {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}));



Alpine.start();
