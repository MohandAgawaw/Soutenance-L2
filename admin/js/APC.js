function logout(){
    
  auth.signOut();
  window.open("index.html", "_self");
  

}
const modalWrapper = document.querySelector('.modal-wrapper');

// modal add
const addModal = document.querySelector('.add-modal');
const addModalForm = document.querySelector('.add-modal .form');

// modal edit
const editModal = document.querySelector('.edit-modal');
const editModalForm = document.querySelector('.edit-modal .form');

const btnAdd = document.querySelector('.btn-add');

const tableUsers = document.querySelector('.table-users');

let id;

// Create element and render users
const renderUser = doc => {
  const tr = `
    <tr data-id='${doc.key}'>
      <td>${doc.val().nome}</td>
      <td>${doc.val().prenom}</td>
      <td>${doc.val().email}</td>
      <td>${doc.val().ty}</td>
      <td>${doc.val().grade}</td>
      <td>${doc.val().Spécialité}</td>

      <td>
        <button  class="btn btn-delete">Approuver</button>
      </td>
    </tr>
  `;
  tableUsers.insertAdjacentHTML('beforeend', tr);
  
  
  // Click delete user
  const btnDelete = document.querySelector(`[data-id='${doc.key}'] .btn-delete`);
  btnDelete.addEventListener('click', () => {
    var us = "Actived";
    firebase
    .database()
    .ref("users/" + doc.key)
    .update({
      //   rollNo: rollV,
      activ:us
    });
  alert("Compte A pprouvé !");
  });

}

var type = '';
rif.on('child_added', function(doc){

  type = doc.val().activ;


  admin = doc.val().ty;
  if(type !='Actived'){
    if(admin !='Admin'){
      renderUser(doc);
    }
   
  }
  
})

