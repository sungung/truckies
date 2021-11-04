import {fstore} from "./fbase";

const USER_COLLECTION = 'users';
const DEVICE_COLLECTION = "devices";

type Device = {
  fcmToken: string;
  name: string;
  type: 'Android' | 'iOS' | 'Web';
  userAgent?: string;
};

/**
 * TODO refactoring handling firestore 
 * e.g. error handling ref https://github.com/CSFrequency/react-firebase-hooks/blob/master/firestore/README.md
 * @param user 
 * @param token 
 * @param path 
 * @returns 
 */
export const userDB = (user: firebase.default.User, token: string, path: string = USER_COLLECTION) => {
  const userRef = fstore.collection(path).doc(user.uid);
  return fstore.runTransaction(async transaction => {
    const userDoc = await transaction.get(userRef);
    if (userDoc.exists){
      const tokenRef = userRef.collection(DEVICE_COLLECTION).doc(token);
      if (!!tokenRef){
        return transaction.set(userRef.collection(DEVICE_COLLECTION).doc(token), createDevice(token));
      }
    } else {
      transaction.set(userRef, { name: user.displayName, email: user.email })
      return transaction.set(userRef.collection(DEVICE_COLLECTION).doc(token), createDevice(token));
    };
  });
}

const createDevice = (fcmToken: string): Device => {
  let browser = (function (agent) {
      switch (true) {
      case agent.indexOf("edge") > -1: return "MS Edge";
      case agent.indexOf("edg/") > -1: return "Edge ( chromium based)";
      case agent.indexOf("opr") > -1: return "Opera";
      case agent.indexOf("chrome") > -1: return "Chrome";
      case agent.indexOf("trident") > -1: return "MS IE";
      case agent.indexOf("firefox") > -1: return "Mozilla Firefox";
      case agent.indexOf("safari") > -1: return "Safari";
      default: return "other";
    }})(window.navigator.userAgent.toLowerCase());
  return {
    fcmToken,
    name: browser,
    type: 'Web',
    userAgent: window.navigator.userAgent,
  };
};

