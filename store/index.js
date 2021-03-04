import { Store as PullStateStore } from 'pullstate';

import { lists, homeItems, notifications } from '../mock';

const Store = new PullStateStore({
  safeAreaTop: 0,
  safeAreaBottom: 0,
  menuOpen: false,
  notificationsOpen: false,
  currentPage: null,
  isDarkMode: false,
  homeItems,
  favoris: [],
  lists,
  notifications: [],
  settings: {
    enableNotifications: true,
  },
});

export default Store;
