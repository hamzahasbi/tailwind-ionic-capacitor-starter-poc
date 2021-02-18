import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonNote,
  IonLabel,
} from '@ionic/react';
import Store from '../../store';
import React, {useState} from 'react';
import { getNotifications } from '../../store/selectors';
import { Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed, Capacitor } from '@capacitor/core';
const { PushNotifications } = Plugins;
import { close } from 'ionicons/icons';


const NotificationItem = ({ notification }) => (
  
  <IonItem>
    <IonLabel>{notification.title}</IonLabel>
    <IonNote slot="end">{notification.body}</IonNote>
    <IonButton slot="end" fill="clear" color="dark">
      <IonIcon icon={close} />
    </IonButton>
  </IonItem>
);

const Notifications = ({ open, onDidDismiss }) => {

  const [notifications, setNotifications] = useState([]);

  if (Capacitor.platform !== 'web') {
    PushNotifications.register();
    // PushNotifications.addListener('registration',
    //   (token) => {
    //     alert('Push registration success, token: ' + token.value);
    //   }
    // );
  
    // Some issue with your setup and push will not work
    PushNotifications.addListener('registrationError',
      (error) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );
  
    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification) => {
        alert('Push registration success, token: ' + JSON.stringify(notification));
        // setNotifications(oldState => oldState.push({ id: notification.id, title: notification.title, body: notification.body }));
      }
    );
  
    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification) => {
        console.log('click')
        // setNotifications(oldState => oldState.push({ id: notification.notification.data.id, title: notification.notification.data.title, body: notification.notification.data.body }));
      }
    );
  }

  return (
    <IonModal isOpen={open} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notifications</IonTitle>
          <IonButton slot="end" fill="clear" color="dark" onClick={onDidDismiss}>
            <IonIcon icon={close} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Notifications</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {notifications.length > 0 && notifications.map((notification) => (
            <NotificationItem notification={notification} key={notification.id} />
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default Notifications;
