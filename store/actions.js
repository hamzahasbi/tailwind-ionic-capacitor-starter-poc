import Store from '.';

export const setMenuOpen = open => {
  Store.update(s => {
    s.menuOpen = open;
  });
};

export const setNotificationsOpen = open => {
  Store.update(s => {
    s.notificationsOpen = open;
  });
};

export const setNotifications = item => {
  Store.update((s, old) => {
    s.notifications = [].concat(old.notifications, item);
  });
};

export const removeNotifications = () => {
  Store.update((s) => {
    s.notifications = [];
  })
}

export const setSettings = settings => {
  Store.update(s => {
    s.settings = settings;
  });
};

// App-specific actions

export const setDone = (list, item, done) => {
  Store.update((s, o) => {
    const listIndex = o.lists.findIndex(l => l === list);
    const itemIndex = o.lists[listIndex].items.findIndex(i => i === item);
    s.lists[listIndex].items[itemIndex].done = done;
    if (list === o.selectedList) {
      s.selectedList = s.lists[listIndex];
    }
  });
};

export const setFavoris = (item)=> {
  Store.update((s, old) => {
    const merge = [].concat(old.favoris, item);
    
    s.favoris = merge.reduce((a, b) => {
      if (a.findIndex((el) => el.id === b.id) == -1) a.push(b);
      return a;
    }, []);
  })
}

export const removeFromFavoris = (item) => {
  Store.update((s, old) => {
    const find = old.favoris.findIndex((el) => el.id === item);
    s.favoris = old.favoris;
    if (find !== -1) s.favoris.splice(find, 1);
  })
}

export const setisDarkMode = (dark) => {
  Store.update(s => {
    s.isDarkMode = dark;
  })
}