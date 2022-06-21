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
const db = firebase.firestore();
const auth = firebase.auth()
const database = firebase.database()
const rif = firebase.database().ref('Messagerie');
const modalWrapper = document.querySelector('.modal-wrapper');
const tableUsers = document.querySelector('.table-users');

let id;

// Create element and render users
const renderUser = doc => {
  const tr = `
    <tr data-id='${doc.key}'>
      <td class="iddiscri">${doc.val().Anom}</td>
      <td class="iddiscri">${doc.val().Aprenom}</td>
    
      <td>
        <button class="btn btn-edit">📩</button>
      </td>
      
    </tr>
  `;
  tableUsers.insertAdjacentHTML('beforeend', tr);
  var btn = document.querySelector(`[data-id='${doc.key}'] .btn-edit`);
  btn.addEventListener('click', () => {
    id = doc.val().id;
    idrecu = doc.val().idrecu;
    console.log(id)
    getele();
  });
  
}
const renderUseer = doc => {
  const tr = `
    <tr data-id='${doc.key}'>
      <td class="iddiscri">${doc.val().nome}</td>
      <td class="iddiscri">${doc.val().prenom}</td>
    
      <td>
        <button class="btn btn-edit">📩</button>
      </td>
      
    </tr>
  `;
  tableUsers.insertAdjacentHTML('beforeend', tr);
  var btn = document.querySelector(`[data-id='${doc.key}'] .btn-edit`);
  btn.addEventListener('click', () => {
    id = doc.key;
      getele();
    
  });
  
}
var Type = '';
firebase.auth().onAuthStateChanged(function(user) {
  if(user){
      var user = firebase.auth().currentUser;
      if (user != null) {
        firebase.database().ref('users/' + user.uid).on('value',(snap)=>{
            Type = snap.val().last_login;
        
           firebase.database().ref('Messagerie/').child(Type).on('child_added',(doc)=>{
               var id = doc.val().id;
               var idrecu = doc.val().idrecu;
               
              
               if(idrecu== user.uid){
                renderUser(doc);
               }
               if(id== user.uid){
                renderUseer(doc);
               }
            
             
              
          })
          
          
        });
         
      }
  }
});
//------------msg... avoir msg.


var $messages = $('.messages-content'),
    d, h, m,
    i = 0;



  function getele(){
    $messages.mCustomScrollbar();
    firebase.database().ref("Messagerie").child().on("child_added", function (snapshot) {
     console.log(snapshot)
     if (id == Type) {
       $('<div class="message message-personal"><figure class="avatar"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpdX6tPX96Zk00S47LcCYAdoFK8INeCElPeJrVDrh8phAGqUZP_g" /></figure><div id="message-' + snapshot.key + '">' + snapshot.val().msg + '</div></div>').appendTo($('.mCSB_container')).addClass('new');
       $('.message-input').val(null);
     } else if(idrecu ==Type) {
       $('<div class="message new"><figure class="avatar"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpdX6tPX96Zk00S47LcCYAdoFK8INeCElPeJrVDrh8phAGqUZP_g" /></figure><div id="message-' + snapshot.key + '">' +  ': ' + snapshot.val().msg + '</div></div>').appendTo($('.mCSB_container')).addClass('new');
     }
     
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


function sendMessage() {
  var database_ref = database.ref();
  var message = document.getElementById("message").value;
  var nome = '';
  var prenom = '';
  if(message === ''){
    alert('Ecrivez Votre Message !')
    return
  }
  firebase.auth().onAuthStateChanged(function(user) {
    
    if(user){
        var user = firebase.auth().currentUser;
        
        if (user != null) {
          firebase.database().ref('users/' + user.uid).on('value',(snap)=>{
            nome = snap.val().nome;
            prenom = snap.val().prenom;
            var user_data = {
              id : id,
              type:'envoi',
              nome:nomeen,
              prenom:prenomen,
              msg: message
        
            }
            var userr_data = {
              id : id,
              type:'Recu',
              nome:nome,
              prenom:prenom,
              msg: message
        
            }
            // Push to Firebase Database
            database_ref.child('Messagerie/' + user.uid).child(id).child(Date.now()).set(user_data)
            database_ref.child('Messagerie/' + id).child(user.uid).child(Date.now()).set(userr_data)
          });
               
            
              alert("Message Envoyé !")
           
        }
    }
   
  
});
  return false;
}