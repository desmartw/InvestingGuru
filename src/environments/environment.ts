// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBBEOC-UoCfMyVS0bVOH3osArjk1d0Teto",
    authDomain: "investingguru-3f373.firebaseapp.com",
    projectId: "investingguru-3f373",
    storageBucket: "investingguru-3f373.appspot.com",
    messagingSenderId: "360373875365",
    appId: "1:360373875365:web:918e9ec6b9daf19e8e934c",
    measurementId: "G-9X1Q9F17B2"
},
  newsAPI: {
    apiUrl: 'https://newsapi.org/v2/',
    apiKey: '695abe244af64452908091c695496b2c'
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
