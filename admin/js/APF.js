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

function logout(){
    
  auth.signOut();
  window.open("index.html", "_self");
  

}

const tableUsers = document.querySelector('.table-Forum');

let id;

const renderUser = doc => {
  const tr = `
  <br>
    <tr class="post" data-id='${doc.key}'>
    <td class="discri">${doc.val().Text}</td>
      <td>${doc.val().Titre}</td>
      <td>${doc.val().Them}</td>
      <td>${doc.val().Auteur}</td>
      <td>
      <button class="btn btn-edit">Supprimer</button>
        <button  class="btn btn-delete">Approuver</button>
      </td>
      <br>
    </tr>
  `;
  tableUsers.insertAdjacentHTML('beforeend', tr);
  
  
  // Click delete user
  const apbtn = document.querySelector(`[data-id='${doc.key}'] .btn-delete`);
  apbtn.addEventListener('click', () => {
    var us = "Actived";
    firebase
    .database()
    .ref("Forum/" + doc.key)
    .update({
      //   rollNo: rollV,
      activ:us
    });
  alert("Forum Approuvé !");
  });
  const btnDelete = document.querySelector(`[data-id='${doc.key}'] .btn-edit`);
  btnDelete.addEventListener('click', () => {
    firebase.database().ref("Forum").child(doc.key).remove();
    alert("Forum Supprimé !");
  });

}


rif.on('child_added', function(doc){

    img = doc.val().Them;
  type = doc.val().activ;
  if(type !='Actived'){
   
      renderUser(doc);
  }
  
})
