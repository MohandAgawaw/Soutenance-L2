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
      <td class="iddiscri">${doc.val().nome}</td>
      <td class="iddiscri">${doc.val().prenom}</td>
      <td class="iddiscri">${doc.val().last_login}</td>
      <td class="iddiscri">${doc.val().email}</td>
      
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
  if(type ==='professeur'){
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
                msg: text
          
              }
              var userr_data = {
                id : id,
                type:'Recu',
                nome:nome,
                prenom:prenom,
                msg: text
          
              }
              // Push to Firebase Database
              database_ref.child('Messagerie/' + user.uid).child(id).child(Date.now()).set(user_data)
              database_ref.child('Messagerie/' + id).child(user.uid).child(Date.now()).set(userr_data)
            });
                 
                    editModal.classList.remove('modal-show');
                alert("Message Envoyé !")
             
          }
      }
     
    
  });
});
window.addEventListener('click', e => {
  if(e.target === editModal) {
    editModal.classList.remove('modal-show');
  }
});