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

  var data = 1
self.addEventListener("notificationclick", function (event) {
  var url = "/infomain"; 

  if (key === 'chat') {
    url = '/chat'
  }
  else if (key === 'info') {
    url = '/infomain'
  }
  else if (key === 'record') {
    url ='/hospitalrecord'
  }
  else if (key === 'momWeight' ) {
    url='/recordmom'
  }
  else if (key === 'tip' ) {
    // url = '/tip'
    url = '/'
  }
  else if (key === 'picture') {
    // url = `/`
    url = '/recordbaby'
  }
  else if (key === 'babydata') {
    url = '/recordbaby'
  }
  else {
    url = "/"
  }
  console.log("notification click");
  event.notification.close();
  // event.waitUntil(clients.openWindow(`${url}?data=${encodeURIComponent(data)}`));
  event.waitUntil(clients.openWindow(url));
});
