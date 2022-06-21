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
      <td>${doc.val().prenom}</td>
      <td class="iddiscri">${doc.val().last_login}</td>
      <td>${doc.val().email}</td>
      <td>
        <button class="btn btn-edit">Modifier</button>
        <button  class="btn btn-delete">Supprimer</button>
      </td>
    </tr>
  `;
  tableUsers.insertAdjacentHTML('beforeend', tr);
  var prenom = doc.val().prenom;
  var email = doc.val().email;
  
  // Click edit user
  var btn = document.querySelector(`[data-id='${doc.key}'] .btn-edit`);
  btn.addEventListener('click', () => {
    editModal.classList.add('modal-show');
    id = doc.key;
    document.getElementById("lastName").value = prenom;
    document.getElementById("emaill").value = email;
  });
  
  // Click delete user
  const btnDelete = document.querySelector(`[data-id='${doc.key}'] .btn-delete`);
  btnDelete.addEventListener('click', () => {
    firebase.database().ref("users").child(doc.val().last_login).remove();
  });

}

// Click add user button
btnAdd.addEventListener('click', () => {
  addModal.classList.add('modal-show');

});




// User click anyware outside the modal
window.addEventListener('click', e => {
  if(e.target === addModal) {
    addModal.classList.remove('modal-show');
  }
  if(e.target === editModal) {
    editModal.classList.remove('modal-show');
  }
});


var type = '';
rif.on('child_added', function(doc){

  type = doc.val().ty;
  if(type ==='Admin'){
    renderUser(doc);
  }
  
})
// Click submit in add modal
addModalForm.addEventListener('submit', e => {
  e.preventDefault();
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  prenom = document.getElementById('psdo').value


  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Case Vide Email OU bien Mots de passe')
    return
    // Don't continue running the code
  }
  if ( validate_field(prenom) == false ) {
    alert('Case Vide pseudo...')
    return
  }
 
  
 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()
    var stt = 'Admin';
    var sta = 'Actived';

    // Create User data
    var user_data = {
      email : email,
      prenom : prenom,
      pass : password,
      ty : stt,
      activ: sta,
      last_login : user.uid
      
    }
    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)
    
    // DOne
    alert('Le compte a bien ete cree')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })

  modalWrapper.classList.remove('modal-show');
});

// Click submit in edit modal
editModalForm.addEventListener('submit', e => {
  e.preventDefault();
  var lastName =  document.getElementById("lastName").value;
  var ID =  document.getElementById("ID").value;
  var email =  document.getElementById("emaill").value;
  var list =  document.getElementById("list").value;
  var nomee = document.getElementById("firstName").value;
   firebase
    .database()
    .ref("users/" + id)
    .update({
      //   rollNo: rollV,
      email : email,
      nome : nomee,
      prenom : lastName,
      filier : list,
      last_login : ID
    });
  alert("Data Update");
  editModal.classList.remove('modal-show');
  
});

  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
   }
  
function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    }  else {
      return true
    }
}
  
function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
}
      
