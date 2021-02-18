import Head from 'next/head';

import 'tailwindcss/tailwind.css';
import '@ionic/react/css/core.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import '../styles/global.css';
import '../styles/variables.css';
import {FirebaseContext, Firebase} from '../components/config/firebase';
function MyApp({ Component, pageProps }) {
  // console.log(Firebase);
  return (
    <FirebaseContext.Provider value={Firebase}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, viewport-fit=cover"/>
          <meta name="color-scheme" content="light dark" />
          <script type="module" src="https://unpkg.com/ionicons@5.2.3/dist/ionicons/ionicons.esm.js"/>
          <script noModule="" src="https://unpkg.com/ionicons@5.2.3/dist/ionicons/ionicons.js"/>
        </Head>
        <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}

export default MyApp;
