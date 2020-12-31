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

export const setSettings = settings => {
  Store.update(s => {
    s.settings = settings;
  });
};

// App-specific actions

export const setDone = (list, item, done) => {
  Store.update((s, o) => {
    const listIndex = o.lists.findIndex(l => l === list);
    console.log('Setting done', list, item, done, o.lists, listIndex);
    const itemIndex = o.lists[listIndex].items.findIndex(i => i === item);
    s.lists[listIndex].items[itemIndex].done = done;
    if (list === o.selectedList) {
      s.selectedList = s.lists[listIndex];
    }
  });
};

export const setSelectedList = list => {
  Store.update(s => {
    s.selectedList = list;
  });
};