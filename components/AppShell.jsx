import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useHistory } from 'react-router-dom';
import {Plugins} from '@capacitor/core';
import {useEffect} from 'react';
import Menu from './Menu';
import Tabs from './pages/Tabs';
import { useIonRouter } from '@ionic/react';

const { App } = Plugins;
const host = process.env.NEXT_PUBLIC_HOST;

// const DeepLinkHandler = () => {
//   if (window !== undefined) {
//     window?.addEventListener('deviceready', function() {
//       console.log(window)
//       window?.IonicDeeplink.route({
//         '/home': Home,
//         '/tabs/feed': Feed,
//         '/tabs/:lang/news/:id': Details,
//       }, function(match) {
//         console.log('Successfully matched route', match);
//       }, function(nomatch) {
//         console.error('Got a deeplink that didn\'t match', nomatch);
  
//       });
//     });
//   }
  


const SimpleDeepLinkHandler = () => {
  

  const ionRouter = useIonRouter();
  document.addEventListener('ionBackButton', (ev) => {
    ev.detail.register(-1, () => {
      if (!ionRouter.canGoBack()) {
        App.exitApp();
      }
    });
  });

  let history = useHistory();
  useEffect(() => {
    App.addListener('appUrlOpen', (data) => {
      // Example url: https://beerswift.app/tabs/tab2
      // slug = /tabs/tab2
      const slug = data.url.split(host).pop();
      if (slug) {
        history.push(slug);
      }
      // If no match, do nothing - let regular routing
      // logic take over
    });
  }, []);

  return null;
};


const AppShell = () => {
  return (
    <IonApp>
      <IonReactRouter>
      <SimpleDeepLinkHandler/>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/tabs" render={() => <Tabs />} />
            <Route exact path="/" render={() => <Redirect to="/tabs" />} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default AppShell;
