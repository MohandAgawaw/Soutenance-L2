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
    
    
document.getElementById("modal").style.display = "none";
const btnadd = document.getElementById("addF");
const btnexit = document.getElementById("exit");
const btnupload = document.getElementById("upload");

btnadd.addEventListener('click', () => {

    document.getElementById("modal").style.display = "block";

})
var value= $("input:radio[name=rdoName]:checked").val();
btnupload.addEventListener('click', () => {
    var database_ref = database.ref()
    var value=$("input:radio[name=rdoName]:checked").val();
    var activ = 'NoActived';
    titre = document.getElementById('titrefr').value
    if(titre ==''){
      alert('Remplissez la case Titre')
      return
    }
    if(value.length  ===0){
      alert('Choisissez le Them Du Forum')
      return
    }
    text = document.getElementById('discri').value
    if(text ==''){
      alert('Remplissez le contenu Du Forum !')
      return
    }
    var Type = '';
    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            var user = firebase.auth().currentUser;
            if (user != null) {

                firebase.database().ref('users/' + user.uid+ '/nome').on('value',(snap)=>{
                    Type = snap.val();
                    var user_data = {
                        Titre : titre,
                        Text : text,
                        Them : value,
                        Uid : user.uid,
                        activ : activ,
                        Auteur:Type
                      }
                      // Push to Firebase Database
                      database_ref.child('Forum/' + Date.now() ).set(user_data)
                  });
                  document.getElementById("modal").style.display = "none";
                  alert("Votre Forum A bien Ete Cree veuillez Attendre l'approbation !")
               
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
    <tr data-id='${doc.key}'>
    <td>
    <img src='${link}' alt="Italian Trulli" class="top-img">
    
    </td>
      <td>${doc.val().Titre}</td>
      <td>${doc.val().Them}</td>
      <td>${doc.val().Auteur}</td>
      <td>
        <button  class="btn btn-delete">Ouvrir</button>
      </td>
    </tr>
  `;
  tableUsers.insertAdjacentHTML('beforeend', tr);
  

  // Click delete user
  const btnDelete = document.querySelector(`[data-id='${doc.key}'] .btn-delete`);
  btnDelete.addEventListener('click', () => {
    localStorage.setItem("myValue", doc.key);
    window.open("forumpost.html", "_self");
  });

}



var type = '';
var img = '';
var link = '';
rif.on('child_added', function(doc){

  
    img = doc.val().Them;
  type = doc.val().activ;
  if(type =='Actived'){
    if(img =='Dev Mobile'){
        link = 'Images/dev-mobile.jpg';
      }
      if(img =='Dev Web'){
        link = 'Images/dev-web.jpg';
    }
    if(img =='Administrateur BD'){
        link = 'Images/bdd.jpg';
    }
    if(img =='Analyste SOC'){
        link = 'Images/Analyste SOC.jpg';
    }
    if(img =='Architecte Big Data'){
        link = 'Images/Architecte Big Data.png';
    }
    if(img =='Community manager'){
        
        link = 'Images/Community manager.jpg';
    }
      renderUser(doc);
  }
 
  
})
