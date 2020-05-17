// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyC9RjdnkgWt8hLalPXF2WKMjYGzUo9awhI',
    authDomain: 'ng-fitness-tracker-9e267.firebaseapp.com',
    databaseURL: 'https://ng-fitness-tracker-9e267.firebaseio.com',
    projectId: 'ng-fitness-tracker-9e267',
    storageBucket: 'ng-fitness-tracker-9e267.appspot.com',
    messagingSenderId: '301213545323'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
