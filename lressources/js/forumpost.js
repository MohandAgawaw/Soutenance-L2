var firebaseConfig = {
    apiKey: "AIzaSyBQdunl8QKe6pkJ7_rBvTZ0MtR6F_k0hpw",
    authDomain: "acedbase-66da9.firebaseapp.com",
    databaseURL: "https://acedbase-66da9-default-rtdb.firebaseio.com",
    projectId: "acedbase-66da9",
    storageBucket: "acedbase-66da9.appspot.com",
    messagingSenderId: "835006271122",
    appId: "1:835006271122:web:8e24deb8429556ffeba04b",
    measurementId: "G-NN4C5M5GH2"
  };
   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
   // Initialize variables
   const auth = firebase.auth()
   const database = firebase.database()
    const rif = firebase.database().ref('Forum');
    
    

    
var b = localStorage.getItem("myValue");


let img = document.getElementById('img');
var type = '';
var link = '';
var titre = '';
var discri = '';
firebase.database().ref('Forum/' + b).on('value',(snap)=>{
    type = snap.val().Them;
    titre = snap.val().Titre;
    discri = snap.val().Text;
    document.getElementById('typee').innerHTML = type;
    document.getElementById('titr').innerHTML = titre;
    document.getElementById('dicri').innerHTML = discri;
    if(type =='Dev Mobile'){
        link = 'Images/dev-mobile.jpg';
      }
      if(type =='Dev Web'){
        link = 'Images/dev-web.jpg';
    }
    if(type =='Administrateur BD'){
        link = 'Images/bdd.jpg';
    }
    if(type =='Analyste SOC'){
        link = 'Images/Analyste SOC.jpg';
    }
    if(type =='Architecte Big Data'){
        link = 'Images/Architecte Big Data.png';
    }
    if(type =='Community manager'){
        
        link = 'Images/Community manager.jpg';
    }
    img.src = link;
  
});

const btnupload = document.getElementById("envoi");
btnupload.addEventListener('click', () => {
    var database_ref = database.ref()
    Com = document.getElementById('comm').value
    if(Com ==''){
        alert('écrivez votre commentaire !');
        return
    }
    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            var user = firebase.auth().currentUser;
            if (user != null) {

                firebase.database().ref('users/' + user.uid+ '/nome').on('value',(snap)=>{
                   var id = Date.now();
                    var user_data = {
                        auteur: snap.val(),
                        Commentaire : Com,
                        UID: user.uid,
                        IDCom:id
            
                       }
                       // Push to Firebase Database
                       database_ref.child('Forum/').child(b).child('com').child(id).set(user_data)
                  });
                  
                  alert("Le Commentaire A bien Ete Envoyé ! ")
               
            }
        }
       
      
    });
   
})
//-----------------------------------------

const tableUsers = document.querySelector('.table-com');

let id;

// Create element and render users
const renderUser = doc => {
  const tr = `
    <tr class="comid" data-id='${doc.key}'>
    <td>
    <img src='Images/profile-svgrepo-com.svg' alt="Italian Trulli" class="top-logo">
    
    </td>
      <td>${doc.val().auteur}</td>
      <td>:</td>
      <td>${doc.val().Commentaire}</td>
      <td>
      <button  class="btn btn-del">Supprimer</button>
      
      </td>

      
    </tr>
  `;

  tableUsers.insertAdjacentHTML('beforeend', tr);


  firebase.auth().onAuthStateChanged(function(user) {
    if(user){
        var user = firebase.auth().currentUser;
        if (user != null) {
            var idui = user.uid;
            
            if(idui == doc.val().UID){
                document.querySelector(`[data-id='${doc.key}'] .btn-del`).style.display = "block";
            }
    
           
        }
    }
   
  
});




  const btnDelete = document.querySelector(`[data-id='${doc.key}'] .btn-del`);
  btnDelete.addEventListener('click', () => {
      alert('Votre Commentaire A bien Ete Supprimé !')
    firebase.database().ref('Forum').child(b).child('com').child(doc.val().IDCom).remove();
  });

}




//---------------------------
const riff = firebase.database().ref('Forum/'+b).child('com');
riff.on('child_added', function(doc){
    if (doc.val().Commentaire != null) {
        renderUser(doc);
    }

    
  })
