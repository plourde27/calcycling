import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQAZWXheTMSqoxJBZxS-dJRo3eBbMIMTM",
  authDomain: "cal-cycling.firebaseapp.com",
  projectId: "cal-cycling",
  storageBucket: "cal-cycling.appspot.com",
  messagingSenderId: "102332358224",
  appId: "1:102332358224:web:0d8fbcdddbccdc2e79fb55",
  measurementId: "G-4TE3G8QSG8",
  databaseURL: "https://cal-cycling-default-rtdb.firebaseio.com"

};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var email = "";
var name = "";
var prevname = "";
var uid = -1;
var lu = -1;
var data;

const provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    uid = user.uid;
    email = user.email;

    // ...
  } else {
    // User is signed out
    // ...
  }
});

var gotdata = false;

function update() {

  if (uid != -1 && lu == -1) {
    gotdata = false;
    var dbRef = firebase.database().ref("users/" + uid + "/");
    dbRef.on("value", function(snapshot) {
      if (snapshot != null && snapshot.val() != null) {
        var vl = snapshot.val();
        data = vl;
        gotdata = true;
        for (var i = 0 ; i < data.length ; i++) {
          console.log(document.getElementById("i" + i));
          document.getElementById("i" + i).innerHTML = data[i];
        }
      }
    });
  }

  lu = uid;
  window.requestAnimationFrame(update, 1);
}

update();
