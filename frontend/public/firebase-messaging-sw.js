self.addEventListener("install", function (e) {
  console.log("fcm sw install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm sw activate..");
});

var key = ''

self.addEventListener("push", function (e) {
  console.log("push: ", e.data.json());
  if (!e.data.json()) return;

  const data = e.data.json().data
  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    // icon: resultData.image,
    icon: "/icon1.png",
    tag: resultData.tag,
    ...resultData,
  };
  console.log("push: ", { resultData, notificationTitle, notificationOptions });
  key = data.key
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  var url = "/infomain"; 
  if (key === 'info') {
    return  
  }
  else {
    url = "/"
  }
  console.log("notification click");
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
