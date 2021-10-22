/**
 * REST message sample
 * POST https://fcm.googleapis.com/fcm/send
 * {
 *   "notification": {
 *       "title": "vict truckie",
 *       "body": "Test push notification",
 *       "icon": "https://www.vict.com.au/resources/themes/default/images/logo.png"
 *       "click_action": "http://localhost:3000/",
 *
 *   },
 *   "data": {
 *       "eventid": "123",    	
 *   }
 *   "to": "cQzDSz768KLNqgIKI_3WPw:APA91bF0xQV7CxrlP6jZpJxIiYoRl5EPFfuCkRxm5DYqSNW2ejKuZ_juBMpzZ51nJk6DZFhVwMxjGxEu3cgBy7jJdzFeVuNxZtsRXnt1Y7Wuw6hFnlsju34bVFJ8ORCDFJELO8X7cTOO"
 * }
 */
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notifications = (prop: { title: string, body: string, eventid: string }) => {
  if (!!prop.title) {
    toast.success(<div><h4>{prop.title}</h4><p>{prop.body}</p></div>, {
      // toastId is required to stop duplicated message when
      // using toast method with ToastContainer component together
      toastId: prop.eventid
    })
  }
  console.log("In notification " + prop.title)
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover 
    />
  );
}

export default Notifications;