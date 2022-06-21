
var Type = '';
const loader = document.querySelector('.loader');
firebase.auth().onAuthStateChanged(function(user) {
    if(user){
        var user = firebase.auth().currentUser;
        if (user != null) {
          firebase.database().ref('users/' + user.uid+ '/ty').on('value',(snap)=>{
            Type = snap.val();
             if(Type !=='Admin'){
            window.open("Accueil.html", "_self");
              }else{
          window.open("admin/admin.html", "_self");
               }
          
          });
           
        }
    }
   
  
});
