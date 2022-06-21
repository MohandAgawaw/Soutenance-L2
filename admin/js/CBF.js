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
 function logout(){
    
  auth.signOut();
  window.open("index.html", "_self");
  

}
 const database = firebase.database()
  const rif = firebase.database().ref('Forum');
  const bani = document.getElementById('btnbn');
const deban = document.getElementById('btnbn2');
  const tableeUsers = document.getElementById('tbfd');
const tableUsers = document.getElementById('tbfa');
document.getElementById('TBTW').style.display = "none";

let id;


bani.addEventListener('click', () => {
   
  document.getElementById('TBTW').style.display = "none";
  document.getElementById('TBON').style.display = "block";

})
deban.addEventListener('click', () => {
  document.getElementById('TBON').style.display = "none";
  document.getElementById('TBTW').style.display = "block";
})








const renderUser = doc => {
  const tr = `
  <br>
    <tr class="post" data-id='${doc.key}'>
    <td class="discri">${doc.val().Text}</td>
      <td>${doc.val().Titre}</td>
      <td>${doc.val().Them}</td>
      <td>${doc.val().Auteur}</td>
      <td>

        <button  class="btn btn-delete">Bannir</button>
      </td>
      <br>
    </tr>
  `;
  tableUsers.insertAdjacentHTML('beforeend', tr);
  
  
  // Click delete user
  const apbtn = document.querySelector(`[data-id='${doc.key}'] .btn-delete`);
  apbtn.addEventListener('click', () => {
    var us = "Banned";
    firebase
    .database()
    .ref("Forum/" + doc.key)
    .update({
      //   rollNo: rollV,
      activ:us
    });
  alert("Forum Banni !");
  });


}


rif.on('child_added', function(doc){

    img = doc.val().Them;
  type = doc.val().activ;
  if(type =='Actived'){
   
      renderUser(doc);
  }
  
})




const reenderUser = doc => {
  const tr = `
  <br>
    <tr class="post" data-id='${doc.key}'>
    <td class="discri">${doc.val().Text}</td>
      <td>${doc.val().Titre}</td>
      <td>${doc.val().Them}</td>
      <td>${doc.val().Auteur}</td>
      <td>
        <button  class="btn btn-delete">Débannir</button>
      </td>
      <br>
    </tr>
  `;
  tableeUsers.insertAdjacentHTML('beforeend', tr);
  
  
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
  alert("Forum Activé !");
  });

}


rif.on('child_added', function(doc){


  type = doc.val().activ;
  if(type =='Banned'){
   
      reenderUser(doc);
  }
  
})
