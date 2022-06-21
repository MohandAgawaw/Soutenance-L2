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
    
    
document.getElementById("modal").style.display = "none";
document.getElementById("scrolll-bg").style.display = "none";
const btnadd = document.getElementById("addF");
const btnmy = document.getElementById("addC");
const btnts = document.getElementById("addT");
const btnexit = document.getElementById("exit");
const btnupload = document.getElementById("upload");

btnadd.addEventListener('click', () => {
 
    document.getElementById("modal").style.display = "block";

});
btnts.addEventListener('click', () => {
  document.getElementById("scroll-bg").style.display = "block";
  document.getElementById("scrolll-bg").style.display = "none";
});
btnmy.addEventListener('click', () => {

  document.getElementById("scroll-bg").style.display = "none";
  document.getElementById("scrolll-bg").style.display = "block";
  

})
btnupload.addEventListener('click', () => {
  var spc ='';
    var database_ref = database.ref()
    if(ValueMS != ''||ValueMS !='-sélectionnez La Spécialité.'){
      spc = ValueMS;
      console.log(spc)
   }else if(ValueLC != ''||ValueLC !='-sélectionnez La Spécialité.'){
      spc = ValueLC;
      console.log(spc)
   }
  
    titre = document.getElementById('titrefr').value
    mdl = document.getElementById('titrmdl').value
    if(spc ==''){
      alert('-sélectionnez La Spécialité.')
      return
    }
    if(mdl ==''){
      alert('Remplissez la case Modul')
      return
    }
    if(titre ==''){
      alert('Remplissez la case Titre')
      return
    }
    text = document.getElementById('discri').value
    if(text ==''){
      alert('Remplissez le contenu Du Cours !')
      return
    }
    var Type = '';
    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            var user = firebase.auth().currentUser;
            if (user != null) {

                firebase.database().ref('users/' + user.uid).on('value',(snap)=>{
                    var nom = snap.val().nome;
                    var pnom = snap.val().prenom;
                    var user_data = {
                      prenom :nom,
                      nome:pnom,
                        Titre : titre,
                        Text : text,
                        Modul : mdl,
                        grade :selectedValue,
                        Spécialité: spc,
                        Auteurid:user.uid
                      }
                      // Push to Firebase Database
                      database_ref.child('Cours/' + Date.now()).set(user_data)
                  });
                  document.getElementById("modal").style.display = "none";
                  alert("Votre Cours A bien Ete Publier !")
               
            }
        }
       
      
    });

})
btnexit.addEventListener('click', () => {
    document.getElementById("modal").style.display = "none";

})

//------------------------------------------------
const tableUsers = document.querySelector('.table-users');

let id;
// Create element and render users
const renderUser = doc => {
  const tr = `
    <tr class="userrn" data-id='${doc.key}'>
    <td>
    <img src='Images/etud.svg' alt="Italian Trulli" class="top-img">
    
    </td>
      <p> Titre  :${doc.val().Titre}</p>
      <p>Modul : ${doc.val().Modul}</p>
      <p>Spécialité : ${doc.val().Spécialité}</p>
      <p>Grade : ${doc.val().grade}</p>
      <p>Par : ${doc.val().nome+' '+doc.val().prenom}</p>
      <td>
      <button  class="btn btn-delete">Consulter !</button>
    </td>
    </tr>
  `;
  tableUsers.insertAdjacentHTML('beforeend', tr);
  const btnDelete = document.querySelector(`[data-id='${doc.key}'] .btn-delete`);
  btnDelete.addEventListener('click', () => {
    localStorage.setItem("myValuee", doc.key);
    window.open("Courspost.html", "_self");
  });


}


rif.on('child_added', function(doc){

    document.getElementById("cards").style.display = "none";
      renderUser(doc);

  
})
//------------------------
const tableUserss = document.querySelector('.tablee-users');

let idd;
// Create element and render users
const renderUserr = dokc => {
  const tr = `
    <tr class="userrn" data-id='${dokc.key}'>
    <td>
    <img src='Images/etud.svg' alt="Italian Trulli" class="top-img">
    
    </td>
      <p> Titre  :${dokc.val().Titre}</p>
      <p>Modul : ${dokc.val().Modul}</p>
      <p>Spécialité : ${dokc.val().Spécialité}</p>
      <p>Grade : ${dokc.val().grade}</p>
      <p>Par : ${dokc.val().nome+' '+dokc.val().prenom}</p>
      
       
      <td>
      <button class="btn btn-edit">Consulter !</button>
      
    </td>
    
    </tr>
  `;
  tableUserss.insertAdjacentHTML('beforeend', tr);
  var btn = document.querySelector(`[data-id='${dokc.key}'] .btn-edit`);
  btn.addEventListener('click', () => {
    localStorage.setItem("myValuee", dokc.key);
    window.open("Courspost.html", "_self");
  });
  
 
  
}

rif.on('child_added', function(dokc){   
  firebase.auth().onAuthStateChanged(function(user) {
    if(user){
        var user = firebase.auth().currentUser;
        if (user != null) {

            firebase.database().ref('users/' + user.uid).on('value',(snap)=>{
                var nom = snap.val().last_login;
                if(nom ==dokc.val().Auteurid){
                  renderUserr(dokc);
                  document.getElementById("cardss").style.display = "none";
                 
                 
                }
               
                
              });
            
        }
    }
   
  
});
  


})

//------------------
document.getElementById("modal").style.display = "none";
document.getElementById("listlic").style.display = "none";
document.getElementById("listmstr").style.display = "none";
var selectedValue = '';

function getSelectValue(){
         selectedValue = document.getElementById("list").value;

       if(selectedValue =="Licence"){
        document.getElementById("listmstr").style.display = "none";
        document.getElementById("listlic").style.display = "block";
       }else if(selectedValue =="Master"){
        document.getElementById("listlic").style.display = "none";

        document.getElementById("listmstr").style.display = "block";

       }
}
var ValueLC = '';
function getSelectValueLC(){
  ValueLC = document.getElementById("listlic").value;
  
}
      
var ValueMS = '';
function getSelectValueMS(){
  ValueMS = document.getElementById("listmstr").value;

}


document.getElementById("btnpr").style.display = "none";
firebase.auth().onAuthStateChanged(function(user) {
    if(user){
        var user = firebase.auth().currentUser;
        if (user != null) {

            firebase.database().ref('users/' + user.uid).on('value',(snap)=>{
                var ty = snap.val().ty;
                if(ty =='professeur'){
                    document.getElementById("btnpr").style.display = "block";
                }
               
              });
              
           
        }
    }
   
  
});