import Alpine from '@alpinejs/csp';
import './style.css';

window.Alpine = Alpine;

Alpine.data('data', () => ({
  theme: localStorage.getItem('theme') || 'light',
  systemDark: false,
  systemLight: false,
  popoverOpen: false,
  popoverArrow: true,
  popoverPosition: 'bottom',
  popoverHeight: 0,
  popoverOffset: 8,
  handleToggleTheme() {
    this.popoverOpen = !this.popoverOpen;
  },
  handleCloseTheme() {
    this.popoverOpen = false;
  },
  handleChangeTheme(evt) {
    const theme = evt.target.dataset.theme;
    this.theme = theme;
    if (['light', 'dark'].includes(theme)) {
      localStorage.setItem('theme', theme);
      this.systemDark = false;
      this.systemLight = false;
      this.dark = theme === 'dark';
      this.light = theme === 'light';
    } else {
      localStorage.removeItem('theme');
    }
    this.doTheme();
  },
  doTheme() {
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    if (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.systemDark = true;
      this.dark = false;
      this.systemLight = false;
    }
    if (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: light)').matches) {
      this.systemDark = false;
      this.dark = true;
      this.systemLight = true;
    }
  },
  generateLightClass() {
    return this.theme === 'light' ? 'text-sky-500' : '';
  },
  generateDarkClass() {
    return this.theme === 'dark' ? 'text-sky-500' : '';
  },
  generateSystemClass() {
    return this.theme === 'system' ? 'text-sky-500' : '';
  },
}));

Alpine.start();
