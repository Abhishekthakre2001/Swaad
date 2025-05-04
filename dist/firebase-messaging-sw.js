// Import Firebase scripts for the service worker
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

// ✅ Initialize Firebase inside the service worker
firebase.initializeApp({
  apiKey: "AIzaSyD4RJhwDU2dhtFvdWmln3CBxPORPQswTPQ",
  authDomain: "fir-db-bd0d5.firebaseapp.com",
  projectId: "fir-db-bd0d5",
  storageBucket: "fir-db-bd0d5.appspot.com",
  messagingSenderId: "446697047135",
  appId: "1:446697047135:web:7053b4971c6905b389c7ea",
});

// Retrieve Firebase Messaging
const messaging = firebase.messaging();

// ✅ Background Notification Handling
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);

  const notificationTitle = payload.notification?.title || "New Notification";
  const notificationOptions = {
    body: payload.notification?.body || "You have a new message!",
    icon: payload.notification?.image || "/logo.png", // Ensure you have a logo in public/
  };

  // ✅ Show notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// ✅ Handle Notification Click
self.addEventListener("notificationclick", (event) => {
  console.log("Notification click event:", event);

  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        if (clientList.length > 0) {
          return clientList[0].focus();
        }
        return clients.openWindow("/"); // Change this to your desired URL
      })
  );
});
