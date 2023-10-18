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
var uid;
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

function googleSignin() {
  console.log("SIGNING IN");
   firebase.auth()

   .signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;


      email = user.email;
      uid = user.uid;



   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(error.code)
      console.log(error.message)
   });
}

function googleSignout() {
    email = "";

   firebase.auth().signOut()

   .then(function() {
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')
   });
}

document.getElementById("signin").onclick = function() {
  googleSignin();
}

document.getElementById("signout").onclick = function() {
  googleSignout();
}

var gotdata = false;

function update() {

  if (email.length > 0 && email.split("@")[1] == "berkeley.edu") {
    document.getElementById("loginbutton").hidden = true;
    document.getElementById("logoutbutton").hidden = false;
    name = email.split("@")[0];
  }
  else {
    document.getElementById("loginbutton").hidden = false;
    document.getElementById("logoutbutton").hidden = true;
    name = "";
    uid = -1;
  }

  console.log(name + " " + prevname + " " + uid);

  if (name != prevname && uid != -1) {
    gotdata = false;
    var dbRef = firebase.database().ref("users/" + uid + "/");
    dbRef.on("value", function(snapshot) {
      gotdata = true;
      if (snapshot != null && snapshot.val() != null) {
        var vl = snapshot.val();
        data = vl;
        console.log("changing");
        for (var i = 0 ; i < data.length ; i++) {
          document.getElementById("i" + i).value = data[i];
        }
      }
      else {
        for (var i = 0 ; i < 8 ; i++) {
          document.getElementById("i" + i).value = "MM:SS";
        }
        for (var i = 8 ; i < 11 ; i++) {
          document.getElementById("i" + i).value = "";
        }
      }
    });
  }

  if (uid != -1) {
    if (gotdata) {
      for (var i = 0 ; i < 11 ; i++) {
        firebase.database().ref("users" + "/" + uid + "/" + i).set(document.getElementById("i" + i).value);
      }
    }
  }

  prevname = name;
  window.requestAnimationFrame(update, 1);
}

update();
