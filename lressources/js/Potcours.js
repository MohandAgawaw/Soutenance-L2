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
    const rif = firebase.database().ref('Cours');
    
    

    
var bb = localStorage.getItem("myValuee");



var modul = '';
var link = '';
var titre = '';
var discri = '';
firebase.database().ref('Cours/' + bb).on('value',(snap)=>{
    modul = " Modul :" +snap.val().Modul;
    titre = snap.val().Titre;
    discri = snap.val().Text;
    
    document.getElementById('mdl').innerHTML = modul;
    document.getElementById('titr').innerHTML = titre;
    document.getElementById('dicri').innerHTML = discri;

  
});
document.getElementById("qstn").style.display = "none";
firebase.auth().onAuthStateChanged(function(user) {
    if(user){
        var user = firebase.auth().currentUser;
        if (user != null) {

            firebase.database().ref('users/' + user.uid).on('value',(snap)=>{
                var ty = snap.val().ty;
                if(ty !='professeur'){
                    
                        document.getElementById("qstn").style.display = "block";
                    
                }
               
              });
              
           
        }
    }
   
  
});
const btnupload = document.getElementById("envoi");
btnupload.addEventListener('click', () => {
    var database_ref = database.ref()
    Com = document.getElementById('comm').value

    if(Com ==''){
        alert('écrivez votre Question !');
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
                       var user_dataa = {
                     
                        reponse:'Aucune Reponse Pour Le moment !',
                        nom:'',
                        preno:''
                      }
                       // Push to Firebase Database
                       database_ref.child('Cours/').child(bb).child('com').child(id).set(user_data)

                       //--------------

                       // Push to Firebase Database
                       database_ref.child('Cours/').child(bb).child('com').child(id).child('rp').child(id).set(user_dataa)
                     
                  });
                  
                  alert("La Question A bien Ete Envoyé ! ")
               
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
      <td>
      <div id="rpns" class="content">
            <div class="rpns">
                <div class="rpns-card">
                    <input  class="comrp" type="text" id="comm" placeholder="Votre Reponse...">
                    <button id="envoi" type="button" class="buttonenv">Envoyer !</button>
                </div>
            </div>
        </div>
        <tr  class="rpnsid">
            <th>Reponse.!</th>
          </tr>
          <td >${doc.child('rp').child(doc.val().IDCom).val().nom}</td>
          <td>${doc.child('rp').child(doc.val().IDCom).val().preno}</td>
          <td>:</td>
          <td>${doc.child('rp').child(doc.val().IDCom).val().reponse}</td>
          <td>
    </tr>
    
  `;
 


  tableUsers.insertAdjacentHTML('beforeend', tr);
  firebase.auth().onAuthStateChanged(function(user) {
    if(user){
        var user = firebase.auth().currentUser;
        if (user != null) {

            firebase.database().ref('users/' + user.uid).on('value',(snap)=>{
                var ty = snap.val().ty;
                var id = snap.val().last_login;
               
                if(ty !='professeur'){
                   
                    document.querySelector(`[data-id='${doc.key}'] .comrp`).style.display = "none";
                    document.querySelector(`[data-id='${doc.key}'] .buttonenv`).style.display = "none";
                   
                }else{
                    firebase.database().ref('Cours/' + bb).on('value',(snap)=>{
                        var uid = snap.val().Auteurid;
                        if(uid !=id){
                            document.getElementById("sup").style.display = "none";
                            document.querySelector(`[data-id='${doc.key}'] .comrp`).style.display = "none";
                            document.querySelector(`[data-id='${doc.key}'] .buttonenv`).style.display = "none";
                        }
            
                    
                      
                    });
                }
               
               
              });
              
           
        }
    }
   
  
});

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
//--------------------
const btnupload = document.getElementById("sup");

btnupload.addEventListener('click', () => {
    alert('Votre Cours A bien Ete Supprimé !')
    firebase.database().ref('Cours').child(bb).remove();
  })

//---------------
const btnrp = document.querySelector(`[data-id='${doc.key}'] .buttonenv`);
var fmrp = document.querySelector(`[data-id='${doc.key}'] .comrp`);
btnrp.addEventListener('click', () => {
    var database_ref = database.ref()
    if(fmrp.value ==''){
        alert('Merci D ecrire votre reponse !');
        return
    }
   
    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            var user = firebase.auth().currentUser;
            if (user != null) {

                firebase.database().ref('users/' + user.uid).on('value',(snap)=>{
                    var nom = snap.val().nome;
                    var pnom = snap.val().prenom;
                    
                    var user_data = {
                     
                        reponse:fmrp.value,
                        nom:nom,
                        preno:pnom
                      }
                      var id = doc.val().IDCom;
                
                       // Push to Firebase Database
                       database_ref.child('Cours/').child(bb).child('com').child(id).child('rp').child(id).set(user_data)
                     
                  });
                  
               alert('Reponse Envoyé !')
            }
        }
       
      
    });
});



  const btnDelete = document.querySelector(`[data-id='${doc.key}'] .btn-del`);
  btnDelete.addEventListener('click', () => {
      alert('Votre Question A bien Ete Supprimé !')
    firebase.database().ref('Cours').child(bb).child('com').child(doc.val().IDCom).remove();
  });

}




//---------------------------
const riff = firebase.database().ref('Cours/'+bb).child('com');
riff.on('child_added', function(doc){
    if (doc.val().Commentaire != null) {
        renderUser(doc);
    }

    
  })


  //--------------------