function logout(){
    
  auth.signOut();
  window.open("index.html", "_self");
  

}
const modalWrapper = document.querySelector('.modal-wrapper');


const tableUsers = document.querySelector('.table-users');

let id;

// Create element and render users
const renderUser = doc => {
  const tr = `
    <tr data-id='${doc.key}'>
      <td class="iddiscri">${doc.val().nome}</td>
      <td class="iddiscri">${doc.val().prenom}</td>
      <td class="iddiscri">${doc.val().last_login}</td>
      <td class="iddiscri">${doc.val().email}</td>
      <td class="iddiscri">${doc.val().filier}</td>
      <td class="iddiscri">${doc.val().activ}</td>
      <td class="iddiscri">${doc.val().CBCHAT}</td>
      
    </tr>
  `;
  tableUsers.insertAdjacentHTML('beforeend', tr);
  
  
}

rif.on('child_added', function(doc){
    renderUser(doc);  
})