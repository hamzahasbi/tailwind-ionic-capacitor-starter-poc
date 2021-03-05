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
  IonPopover
} from '@ionic/react';
import React, {useState} from 'react';
import { Plugins, Capacitor } from '@capacitor/core';
import { close, checkmarkDoneOutline } from 'ionicons/icons';
import Store from '../../store';
import * as selectors from '../../store/selectors';
import {setNotifications, removeNotifications} from "../../store/actions";

const NotificationItem = ({ notification }) => (
  
  <IonItem>
    <IonIcon icon={checkmarkDoneOutline} slot="start"/>
    <IonLabel>{notification.title}</IonLabel>
    <IonNote slot="end">{notification.body}</IonNote>

  </IonItem>
);

const { PushNotifications } = Plugins;
const Notifications = ({ open, onDidDismiss }) => {

  const notifications = Store.useState(selectors.getNotifications);
  const [popoverState, setShowPopover] = useState(false);

  const handleClose = () => {
    removeNotifications();
    onDidDismiss;
  }
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
        setShowPopover(true);
        if(notifications.filter(item => item.id === notification.id).length === 0) {
          setNotifications({ id: notification.id, title: notification.title, body: notification.body });
        }
      }
    );
    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification) => {
        if(notifications.filter(item => item.id === notification.notification.data.id).length === 0) {
          setNotifications({ id: notification.notification.data.id, title: notification.notification.data.title, body: notification.notification.data.body });
        }
      }
    );
  }

  return (
    <IonModal isOpen={open} onDidDismiss={handleClose}>
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
        <IonPopover
          cssclassName='pop-over-notif'
          isOpen={popoverState}
          onDidDismiss={() => setShowPopover(false)}
        >
          <p>Notifications Reçues</p>
        </IonPopover>
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
