# ReactJS

## Create React App
npx create-react-app my-app && cd my-app
npm start

## Install firebase
npm install firebase
npm install -g firebase-tools


### Deploy to Production
`npm run build` will create an optimised build in the build folder


## Context
- Study https://formidable.com/blog/2021/react-composition/
- Context provides a way to pass data through the component tree without having to pass props down manually at every level.
- I you only want to avoid passing some props through many levels, component composition is often a simpler solution than context.

## TEST

## Monitoring

### performance monitoring - Firebase Performance Monitoring

# Tailwind
- https://daveceddia.com/tailwind-create-react-app/

# React Native

## references
- https://firebase.googleblog.com/2016/01/the-beginners-guide-to-react-native-and_84.html


# Firebase

## Firebase Admin SDK
A library that can allow you to interact with Firebase services in the backend.
- sending messages to specific or multiple devices
- to send customised message, you need to manage 'FCM registration token'
- note that user can have multiple device and each device has unique the registration token
- marry auth uid and tokens in your firestore. e.g. { uid: 123, tokens: [556, 778] }

## FCM (Firebase Cloud Message)
### Message Types
- notification message (message to end user's device)
- data message (message to client app)
- notification message including an optional data payload (user's device displays notification and the client app handles the data payload)
### Delivery Options
- Non-collapsible: each individual message is delivered to the client
- Collapsible: a message that may be replaced by a new message if it has yet to be delivered to the device
### Life span of message
- ttl 0: now or never
### FCM registration token
- store registration token on server and update list of active token
- remove stored tokens that become stale