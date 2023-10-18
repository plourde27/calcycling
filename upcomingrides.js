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
    name = user.displayName;

    // ...
  } else {
    // User is signed out
    // ...
  }
});

var gotdata = false;

function update() {
  document.getElementById("username").innerHTML = name;

  if (document.getElementById("sendtofirebase").innerHTML.length > 0) {
    var inf = document.getElementById("sendtofirebase").innerHTML.split("~~~");
    var rideId = parseInt(Math.random()*1000000000);
    var edited = false;
    if (document.getElementById("ridenum").innerHTML.length > 0) {
      edited = true;
      rideId = parseInt(document.getElementById("ridenum").innerHTML);
      document.getElementById("ridenum").innerHTML = "";
    }
    firebase.database().ref("rides" + "/" + rideId + "/created").set(Date.now());

    for (var i = 0 ; i < inf.length ; i++) {
      firebase.database().ref("rides" + "/" + rideId + "/" + i).set(inf[i]);
    }

    //inf[inf.length-1] = 0;
    if (edited) {
      firebase.database().ref("rides" + "/" + rideId + "/messages/" + Date.now()).set({"name": name, "content": "<em>Updated the ride</em>"});
    }
    else {
      firebase.database().ref("rides" + "/" + rideId + "/messages/" + Date.now()).set({"name": name, "content": "<em>Posted the ride</em>"});
      firebase.database().ref("rides" + "/" + rideId + "/names/" + uid + "/speed").set(inf[inf.length-1]);
    }
    firebase.database().ref("rides" + "/" + rideId + "/names/" + uid + "/name").set(name);
    document.getElementById("sendtofirebase").innerHTML = "";
  }

  if (document.getElementById("joinid").innerHTML.length > 0) {
    var id = parseInt(document.getElementById("joinid").innerHTML.split("~~~")[0]);


    firebase.database().ref("rides" + "/" + id + "/names/" + uid + "/speed").set(document.getElementById("joinid").innerHTML.split("~~~")[1])
    firebase.database().ref("rides" + "/" + id + "/names/" + uid + "/name").set(name);
    firebase.database().ref("rides" + "/" + id + "/messages/" + Date.now()).set({"name": name, "content": "<em>Joined the ride</em>"});

    document.getElementById("joinid").innerHTML = "";
    document.getElementById("newinfo").innerHTML = "Y";
  }

  if (document.getElementById("leaveid").innerHTML.length > 0) {
    var id = parseInt(document.getElementById("leaveid").innerHTML.split("~~~")[0]);

    firebase.database().ref("rides" + "/" + id + "/names/" + uid).remove();
    firebase.database().ref("rides" + "/" + id + "/messages/" + Date.now()).set({"name": name, "content": "<em>Left the ride</em>"});



    document.getElementById("leaveid").innerHTML = "";
    document.getElementById("newinfo").innerHTML = "Y";

  }


  if (document.getElementById("messid").innerHTML.length > 0) {

    var id = parseInt(document.getElementById("messid").innerHTML.split("~~~")[0]);
    var message = document.getElementById("messid").innerHTML.split("~~~")[1];
    var now = Date.now();
    firebase.database().ref("rides" + "/" + id + "/messages/" + now + "/name").set(name);
    firebase.database().ref("rides" + "/" + id + "/messages/" + now + "/content").set(message);

    document.getElementById("messid").innerHTML = "";
    document.getElementById("newinfo").innerHTML = "Y";
  }

  if (uid != -1 && lu == -1) {
    gotdata = false;
    var dbRef = firebase.database().ref("users/" + uid + "/");
    dbRef.on("value", function(snapshot) {
      if (snapshot != null && snapshot.val() != null) {
        var vl = snapshot.val();
        data = vl;
        gotdata = true;
        document.getElementById("email").innerHTML = email;
        for (var i = 0 ; i < data.length ; i++) {
          document.getElementById("i" + i).innerHTML = data[i];
        }
      }
    });
  }




  lu = uid;
  window.requestAnimationFrame(update, 1);
}

var mons = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function updateData() {
  var dbRef = firebase.database().ref("rides");
  dbRef.on("value", function(snapshot) {
    if (snapshot != null && snapshot.val() != null) {
      var vl = snapshot.val();
      var infos = [];
      var ks = Object.getOwnPropertyNames(vl);


      for (var i = 0 ; i < ks.length ; i++) {

        var info = [];



        info[1] = vl[ks[i]][0];
        info[7] = vl[ks[i]][1];
        info[8] = vl[ks[i]][2];
        info[2] = vl[ks[i]][3];
        info[3] = vl[ks[i]][4];

        if (vl[ks[i]][5] == "No date specified" || vl[ks[i]][5] == undefined) {
          info[5] = vl[ks[i]][5];
        }
        else {
          info[5] = mons[parseInt(vl[ks[i]][5].split("/")[0]) - 1] + " " + parseInt(vl[ks[i]][5].split("/")[1]) + " at " + vl[ks[i]][6];
        }
        info[6] = vl[ks[i]][7];
        info[4] = vl[ks[i]][8];

        if (vl[ks[i]]["names"] != null) {
          var nms = Object.getOwnPropertyNames(vl[ks[i]]["names"]);
          var actnames = [];
          for (var j = 0 ; j < nms.length ; j++) {
            actnames.push(vl[ks[i]]["names"][nms[j]]["name"]);
          }
          info[0] = actnames.join("~");
        }
        else {
          info[0] = "NO RIDERS";
        }

        info[10] = ks[i];

        info[13] = 0;

        info[14] = vl[ks[i]][0];
        info[15] = vl[ks[i]][1];
        info[16] = vl[ks[i]][2];
        info[17] = vl[ks[i]][3];
        info[18] = vl[ks[i]][4];
        info[19] = vl[ks[i]][5];
        info[20] = vl[ks[i]][6];
        info[21] = vl[ks[i]][7];
        info[22] = vl[ks[i]][8];
        info[23] = vl[ks[i]][9];


        var joined = false;

        if (vl[ks[i]]["names"] != null) {
          var namelist = Object.getOwnPropertyNames(vl[ks[i]]["names"]);
          var speeds = [];
          for (var j = 0 ; j < namelist.length ; j++) {
            var speed = vl[ks[i]]["names"][namelist[j]]["speed"];
            if (namelist[j] != uid) {
              speeds.push(parseFloat(speed));
            }
            else {
              joined = true;
            }
          }
        }

        info[11] = joined;

        var msg = [];

        if (vl[ks[i]]["messages"]) {
          var mess = Object.getOwnPropertyNames(vl[ks[i]]["messages"]);

          for (var j = 0 ; j < mess.length ; j++) {
            msg.push([vl[ks[i]]["messages"][mess[j]]["content"], vl[ks[i]]["messages"][mess[j]]["name"], mess[j]]);
          }
        }

        for (var j = 0 ; j < msg.length ; j++) {
          msg[j] = msg[j].join("===");
        }

        info[12] = msg.join("~");

        if (vl[ks[i]]["names"] != null) {
          var denom = Math.pow(2, speeds.length) - 1;
          speeds.sort();
          var avg = 0;
          var nm = 1;
          for (var j = speeds.length - 1 ; j >= 0 ; j--) {
            avg += speeds[j] * (nm / denom);
            nm *= 2;
          }
          info[9] = avg;
        }
        else {
          info[9] = 0;
        }

        infos.push(info.join("~~"));
      }

      document.getElementById("rideinfo").innerHTML = infos.join("~~~");
    }
  });

}

window.setInterval(updateData, 1000);

update();
