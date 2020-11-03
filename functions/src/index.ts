import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// ***PABLO*** Para poder usar cronjobs debes inscribirte en el plan de facturacion blaze
// https://firebase.google.com/docs/functions/schedule-functions

export const dailyJob = functions.pubsub.schedule('2 * * * *').onRun(context => {
    console.log('This will be run every 2 minutes');
});