const editModal = document.querySelector('.edit-modal');
const editModalForm = document.querySelector('.edit-modal .form');
const modalWrapper = document.querySelector('.modal-wrapper');

const btnanul = document.getElementById('annul');
const btnsend = document.getElementById('envoi');
const tableUsers = document.querySelector('.table-users');

let id;
var nomeen = '';
  var prenomen = '';
// Create element and render users
const renderUser = doc => {
  const tr = `
    <tr data-id='${doc.key}'>
    <td>${doc.val().nome}</td>
    <td>${doc.val().prenom}</td>
    <td class="iddiscri">${doc.val().last_login}</td>
    <td>${doc.val().email}</td>
    <td>${doc.val().grade}</td>
    <td>${doc.val().Spécialité}</td>
      <td>
        <button class="btn btn-edit">Contacter</button>
      </td>
      
    </tr>
  `;
  tableUsers.insertAdjacentHTML('beforeend', tr);
  var btn = document.querySelector(`[data-id='${doc.key}'] .btn-edit`);
  btn.addEventListener('click', () => {
    editModal.classList.add('modal-show');
    id = doc.key;
    nomeen = doc.val().nome;
    prenomen = doc.val().prenom;
  });
  
}

var idps = '';
var type = '';
rif.on('child_added', function(doc){
  idps = doc.val().last_login;
  type = doc.val().ty;
  if(type ==='étudiant'){
    renderUser(doc);
  }
  
})

btnanul.addEventListener('click', e => {
    editModal.classList.remove('modal-show');
  
});

btnsend.addEventListener('click', e => {
  text = document.getElementById('discri').value
  var database_ref = database.ref();
  var nome = '';
  var prenom = '';
  if(text === ''){
    alert('Ecrivez Votre Message !')
    return
  }
  firebase.auth().onAuthStateChanged(function(user) {
    if (user != null) {
      
      if(user){
          var user = firebase.auth().currentUser;
          
          if (user != null) {
            firebase.database().ref('users/' + user.uid).on('value',(snap)=>{
              nome = snap.val().nome;
              prenom = snap.val().prenom;
              var userr_dataa = {
                id : id,
                idrecu:user.uid,
                nome:nome,
                prenom:prenom,
                msg: text,
                Anom:nomeen,
                Aprenom:prenomen,
          
              }
              var userr_data = {
                id : id,
                idrecu:user.uid,
                nome:nome,
                prenom:prenom,
                msg: text,
                Anom:nomeen,
                Aprenom:prenomen,
          
              } 
             

              // Push to Firebase Database
               database_ref.child('Messagerie/' + id).child(user.uid).set(userr_data)
              database_ref.child('Messagerie/' + user.uid).child(id).set(userr_dataa)
             
              sendMessage()
              function sendMessage() {
                var message = document.getElementById('discri').value
                database_ref.child("Messagerie").child(id).child(user.uid).child('msg').push().set({
                  "message": message,
                  "sender": 'envoi'
                  
                });
                database_ref.child("Messagerie").child(user.uid).child(id).child('msg1').push().set({
                  "message": message,
                  "sender": 'recu'
                  
                });
                return false;
              }
       
         });
                 
                    editModal.classList.remove('modal-show');
                alert("Message Envoyé !")
             
          }
         
      }
     }
    })
});


window.addEventListener('click', e => {
  if(e.target === editModal) {
    editModal.classList.remove('modal-show');
  }
});