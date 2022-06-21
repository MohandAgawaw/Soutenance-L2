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
const tableeUsers = document.querySelector('.tablee-users');
document.getElementById('listetow').style.display = "none";
const tableUsers = document.querySelector('.table-users');
const bani = document.getElementById('btnbn');
const deban = document.getElementById('btnbn2');
let id;

bani.addEventListener('click', () => {
   
    document.getElementById('listetow').style.display = "none";
    document.getElementById('listeton').style.display = "block";
  
})
deban.addEventListener('click', () => {
    document.getElementById('listeton').style.display = "none";
    document.getElementById('listetow').style.display = "block";
})



// Create element and render users
const renderUser = doc => {
    const tr = `
      <tr data-id='${doc.key}'>
        <td>${doc.val().nome}</td>
        <td>${doc.val().prenom}</td>
        <td>${doc.val().email}</td>

        <td>${doc.val().grade}</td>
        <td>${doc.val().Spécialité}</td>
  
        <td>
          <button  class="btn btn-bann">Bannir</button>
        </td>
      </tr>
    `;
    tableUsers.insertAdjacentHTML('beforeend', tr);
    
    
    // Click delete user
    const btnbann = document.querySelector(`[data-id='${doc.key}'] .btn-bann`);
    btnbann.addEventListener('click', () => {
      var us = "Banned";
      firebase
      .database()
      .ref("users/" + doc.key)
      .update({
        //   rollNo: rollV,
        CBCHAT:us
      });
    alert("Compte Banni !");
    });
  
  }
  
  var typee = '';
  rif.on('child_added', function(doc){
     typee = doc.val().CBCHAT;
    var admin = doc.val().ty;
    if(typee !='Banned'){
      if(admin =='étudiant'){
        renderUser(doc);

      }
     
    }
    
    
  })

// Create element and render users
const reenderUser = doc => {
    const tr = `
      <tr data-id='${doc.key}'>
        <td>${doc.val().nome}</td>
        <td>${doc.val().prenom}</td>
        <td>${doc.val().email}</td>

        <td>${doc.val().grade}</td>
        <td>${doc.val().Spécialité}</td>
  
        <td>
          <button  class="btn btn-delete">Débannir</button>
        </td>
      </tr>
    `;
    tableeUsers.insertAdjacentHTML('beforeend', tr);
    
    
    // Click delete user
    const btnDelete = document.querySelector(`[data-id='${doc.key}'] .btn-delete`);
    btnDelete.addEventListener('click', () => {
      var us = "Actived";
      firebase
      .database()
      .ref("users/" + doc.key)
      .update({
        //   rollNo: rollV,
        CBCHAT:us
      });
    alert("Compte Débanned !");
    });
  
  }
  
  var type = '';
  var admin = '';
  rif.on('child_added', function(doc){
  
    type = doc.val().CBCHAT;
  
    admin = doc.val().ty;
    if(type =='Banned'){
      if(admin =='étudiant'){
        
        reenderUser(doc);
      }
     
    }
    
  })
