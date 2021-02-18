import { Plugins, StatusBarStyle } from '@capacitor/core';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRouterContext,
  IonTitle,
  IonToolbar,
  IonToggle
} from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import { cog, flash, list } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';

const pages = [
  {
    title: 'Feed',
    icon: flash,
    url: '/tabs/feed',
  },
  {
    title: 'Lists',
    icon: list,
    url: '/tabs/lists',
  },
  {
    title: 'Settings',
    icon: cog,
    url: '/tabs/settings',
  },
];

const Menu = () => {
  const { StatusBar } = Plugins;

  const ionRouterContext = useContext(IonRouterContext);
  const location = useLocation();
  const prefersDark = window?.matchMedia('(prefers-color-scheme: dark)').matches;

  const [isDark, setIsDark] = useState(prefersDark);

  const handleOpen = async () => {
    try {
      await StatusBar.setStyle({
        style: isDark ? StatusBarStyle.Light : StatusBarStyle.Dark,
      });
    } catch {}
  };
  const handleClose = async () => {
    try {
      await StatusBar.setStyle({
        style: isDark ? StatusBarStyle.Dark : StatusBarStyle.Light,
      });
    } catch {}
  };

  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <IonMenu side="start" contentId="main" onIonDidOpen={handleOpen} onIonDidClose={handleClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {pages.map((p, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem routerLink={p.url} routerDirection="none" detail={false} lines="none">
                <IonIcon icon={p.icon} slot="start" />
                <IonLabel>{p.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
          <IonItem lines="none">
            <IonToggle
              checked={isDark}
              onIonChange={e => {
                setIsDark(!isDark)
              }}
              slot='start'
            />  
            <IonLabel slot="start" name="moon"> Dark Mode</IonLabel>
          
          </IonItem>            
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
