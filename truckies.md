# App Technical Specification

## Notification
There are two type of notification requirements, and it divided by target audience. Techinically general notification shall be managed by Topic while a message for specific user group will be managed by server side application.
* Topic : Create topics for general notice and make a client to subcribe these topics automatically but will provide unsubscribe option in the client app. 
  - TODO
    - Subcribing topic from client registration
    - Delivery a message. Server side application publish a message. Or it can trigger Cloud Function when firestore data is created or updated, then publish a notification from Cloud Function.
* Server application : Server side application will include Firebase Admin SDK library. It allows to interact with Firebase services in the backend.
  - sending messages to specific or multiple devices
  - to send customised message, you need to manage 'FCM registration token'
  - note that user can have multiple device and each device has unique the registration token
  - marry auth uid and tokens in your firestore. e.g. { uid: 123, tokens: [556, 778] }
  - TODO
    - Maintain user's device tokens in Firestore.
    - Send a notification from Cloud Function and it will be triggered by Firestore event.
* Flow
  - CTO stores a notification event in Firestore
  - If notification has topic label, publish a notification in the topics
  - If notification has affected equipements, 
    - trigger Cloud Functions 
    - to find all truck appointments which has a job in the affected equipement position
    - get all driver' uid from affected truck appointments
    - get all device's token from driver's uid
    
