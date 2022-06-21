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
//---
const listlic = document.querySelector('.selectedic');
const listmstr = document.querySelector('.selectedid');
let id;

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
        <button class="btn btn-edit">Modifier</button>
        <button  class="btn btn-delete">Supprimer</button>
      </td>
    </tr>
  `;
  tableUsers.insertAdjacentHTML('beforeend', tr);
  var nome = doc.val().nome;
  var prenom = doc.val().prenom;
  var email = doc.val().email;
  var grade = doc.val().grade;
  var Spécialité = doc.val().Spécialité;
  
  // Click edit user
  var btn = document.querySelector(`[data-id='${doc.key}'] .btn-edit`);
  btn.addEventListener('click', () => {
    editModal.classList.add('modal-show');
    id = doc.key;
    document.getElementById("firstName").value = nome;
    document.getElementById("lastName").value = prenom;

    document.getElementById("emaill").value = email;
    document.getElementById("list").value = grade;
    document.getElementById("listlic").value = Spécialité;
    document.getElementById("listmstr").value = Spécialité;
   
    if(grade =="Licence"){
     
      document.getElementById("listlic").style.display = "block";
     }else if(grade =="Master"){
      
      document.getElementById("listmstr").style.display = "block";

     }
  });
  
  // Click delete user
  const btnDelete = document.querySelector(`[data-id='${doc.key}'] .btn-delete`);
  btnDelete.addEventListener('click', () => {
    
    firebase.database().ref("users").child(doc.val().last_login).remove();
    alert('Compte Supprimé !')
  });

}

// Click add user button
btnAdd.addEventListener('click', () => {
  addModal.classList.add('modal-show');

});

var selectedValue = '';

function getSelectValue(){
         selectedValue = document.getElementById("list").value;
       
}


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
  if(type ==='étudiant'){
    renderUser(doc);
  }
  
})
// Click submit in add modal
addModalForm.addEventListener('submit', e => {
  e.preventDefault();
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  prenom = document.getElementById('prenom').value

 //-----------
 
  if(selectedValue == false || selectedValue == '-sélectionnez votre Grade.'){
    alert('Merci De Selectionner le Grade');
    return

  }
  if(selectedValue == 'Licence'){
    if(ValueLC == false || ValueLC == '-sélectionnez votre Spécialité.'){
      alert('Merci De Selectionner la Spécialité');
      return

    }
  }
  if(selectedValue == 'Master'){
    if(ValueMS == false || ValueMS == '-sélectionnez votre Spécialité.'){
      alert('Merci De Selectionner la Spécialité');
      return

    }
  }
  var spec;
  
  if(ValueLC ==''){
    spec = ValueMS;
  }
  if(ValueMS ==''){
    spec = ValueLC;
  }



 //-----
  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Case Vide Email OU bien Mots de passe')
    return
    // Don't continue running the code
  }
  if (validate_field(full_name) == false || validate_field(prenom) == false ) {
    alert('Case Vide Nom OU bien prenom')
    return
  }

 
  
 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()
    var stt = 'étudiant';
    var activ = 'Actived';
    // Create User data
    var user_data = {
      email : email,
        nome : full_name,
        prenom : prenom,
        pass : password,
        ty : stt,
        activ: activ,
        grade : selectedValue,
        Spécialité :spec,
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
  selectedValue = document.getElementById("list").value;
  
//------
if(selectedValue == false || selectedValue == '-sélectionnez votre Grade.'){
  console.log('Merci De Selectionner le Grade');
  return

}
if(selectedValue == 'Licence'){
  ValueLC1 = document.getElementById("listlic").value;
  if(ValueLC1 == false || ValueLC1 == '-sélectionnez votre Spécialité.'){
    console.log('Merci De Selectionner la Spécialité');
    return

  }
}
if(selectedValue == 'Master'){
  ValueMS1 = document.getElementById("listmstr").value;
  if(ValueMS1 == false || ValueMS1 == '-sélectionnez votre Spécialité.'){
    console.log('Merci De Selectionner la Spécialité');
    return

  }
}
var spec;

if(ValueLC1 ==''){
  spec = ValueMS1;
}
if(ValueMS1 ==''){
  spec = ValueLC1;
}

//-----

  var lastName =  document.getElementById("lastName").value;

  var email =  document.getElementById("emaill").value;
  var list =  document.getElementById("list").value;
  var nomee = document.getElementById("firstName").value;
   firebase.database()
    .ref("users/" + id)
    .update({
      //   rollNo: rollV,
      email : email,
      nome : nomee,
      prenom : lastName,
      grade : list,
      Spécialité :spec
      
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

 
document.getElementById("listlic").style.display = "none";
document.getElementById("listmstr").style.display = "none";
document.getElementById("listlic2").style.display = "none";
document.getElementById("listmstr2").style.display = "none";
var selectedValue = '';

function getSelectValue(){
         selectedValue = document.getElementById("list").value;
       console.log(selectedValue);

       if(selectedValue =="Licence"){
        document.getElementById("listmstr").style.display = "none";
        document.getElementById("listlic").style.display = "block";
       }else if(selectedValue =="Master"){
        document.getElementById("listlic").style.display = "none";

        document.getElementById("listmstr").style.display = "block";

       }
}
function getSelectValuez(){
  selectedValue = document.getElementById("listz").value;
console.log(selectedValue);

if(selectedValue =="Licence"){
 document.getElementById("listmstr2").style.display = "none";
 document.getElementById("listlic2").style.display = "block";
}else if(selectedValue =="Master"){
 document.getElementById("listlic2").style.display = "none";

 document.getElementById("listmstr2").style.display = "block";

}
}
var ValueLC = '';
function getSelectValueLC(){
  ValueLC = document.getElementById("listlic2").value;
 
}
      
var ValueMS = '';
function getSelectValueMS(){
  ValueMS = document.getElementById("listmstr2").value;

}



var ValueLC1 = '';
function getSelectValueLC1(){
  ValueLC1 = document.getElementById("listlic").value;
  
 
}
      
var ValueMS1 = '';
function getSelectValueMS1(){
  ValueMS1 = document.getElementById("listmstr").value;
 

}