

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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize variables
const auth = firebase.auth()
const database = firebase.database()
const db = firebase.firestore()
db.settings({timestampsInSnapshots: true});
function logout(){
    
  auth.signOut();
  window.open("index.html", "_self");
  

}
var myName = "";
var mynom ="";
firebase.auth().onAuthStateChanged(function(user) {
  if(user){
      var user = firebase.auth().currentUser;
      if (user != null) {
       
        
        firebase.database().ref('users/' + user.uid+'/last_login').on('value',(snap)=>{
          myName = snap.val();
          console.log(myName);
          star()
        });
        firebase.database().ref('users/' + user.uid+'/nome').on('value',(snap)=>{
          mynom = snap.val();
          console.log(mynom);
         
        });
        
      }
      
  }
  

});
 



var $messages = $('.messages-content'),
    d, h, m,
    i = 0;


function star() {
  $messages.mCustomScrollbar();

  firebase.database().ref("messages").on("child_added", function (snapshot) {
   
      $('<div class="message new"><figure class="avatar"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpdX6tPX96Zk00S47LcCYAdoFK8INeCElPeJrVDrh8phAGqUZP_g" /></figure><div id="message-' + snapshot.key + '">' + snapshot.val().name + ': ' + snapshot.val().message + '<button class="btn-delete" data-id="' + snapshot.key + '" onclick="deleteMessage(this);">Delete</button></div></div>').appendTo($('.mCSB_container')).addClass('new');
   
    setDate();
    updateScrollbar();
  });

}

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}


firebase.database().ref("messages").on("child_removed", function (snapshot) {
  document.getElementById("message-" + snapshot.key).innerHTML = "Le Message A bien ete supp...";
});


function deleteMessage(self) {
  var messageId = self.getAttribute("data-id");
  firebase.database().ref("messages").child(messageId).remove();
}



function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }

  sendMessage();
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
});


