var firebaseConfig = {
  apiKey: "AIzaSyBQdunl8QKe6pkJ7_rBvTZ0MtR6F_k0hpw",
  authDomain: "acedbase-66da9.firebaseapp.com",
  databaseURL: "https://acedbase-66da9-default-rtdb.firebaseio.com",
  projectId: "acedbase-66da9",
  storageBucket: "acedbase-66da9.appspot.com",
  messagingSenderId: "835006271122",
  appId: "1:835006271122:web:d32034f34fa37cdceba04b",
  measurementId: "G-XZKVFJTKWR"
};
firebase.initializeApp(firebaseConfig);

firebase.analytics();
const auth = firebase.auth()
const database = firebase.database()