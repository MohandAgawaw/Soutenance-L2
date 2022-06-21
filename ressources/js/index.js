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
  
  

  // Set up our register function
function register () {
    // Get all our input fields

    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value
    prenom = document.getElementById('prenom').value
    passwordtow = document.getElementById('passwordtow').value
   
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false || validate_field(passwordtow) == false) {
      alert('Case Vide Email OU bien Mots de passe')
      return
      // Don't continue running the code
    }
    if (validate_field(full_name) == false || validate_field(prenom) == false ) {
      alert('Case Vide Nom OU bien prenom')
      return
    }
    if(this.checkboxValue == 'étudiant'){
    if(selectedValue == false || selectedValue == '-sélectionnez votre Grade.'){
      alert('Merci De Selectionner Votre Grade');
      return

    }
    if(selectedValue == 'Licence'){
      if(ValueLC == false || ValueLC == '-sélectionnez votre Spécialité.'){
        alert('Merci De Selectionner Votre Spécialité');
        return
  
      }
    }
    if(selectedValue == 'Master'){
      if(ValueMS == false || ValueMS == '-sélectionnez votre Spécialité.'){
        alert('Merci De Selectionner Votre Spécialité');
        return
  
      }
    }
    
  }
    if(passwordtow !== password){
      alert('Merci De bien confirmer votre mot de passe.')
      return
    }
    
   
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
      var spec;
      var stt = 'étudiant';
      var activ = 'NoActived';
     
      if(ValueLC ==''){
        spec = ValueMS;
      }
      if(ValueMS ==''){
        spec = ValueLC;
      }
     
     if(!this.checkboxValue==0){
      stt = this.checkboxValue;
     }

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
      database_ref.child('users/' + user.uid ).set(user_data)
      
      // DOne
      alert('Le compte a bien ete cree')
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
}
  
  // Set up our login function
function login () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Case Vide Email OU bien Mots de passe')
      return
      // Don't continue running the code
    }
  

    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  

      // DOne
      var Type = '';
firebase.auth().onAuthStateChanged(function(user) {
    if(user){
        var user = firebase.auth().currentUser;
        if (user != null) {
          firebase.database().ref('users/' + user.uid+ '/activ').on('value',(snap)=>{
            Type = snap.val();
             if(Type =='NoActived'){
             alert('Votre Compte Pas Encore Approuvé Par L ADMINISTRATEUR...')
              }else if(Type =='Banned'){
                alert('Votre Compte Est Banni Par L ADMINISTRATEUR...')
    
               }else{
                window.open("scroll.html", "_self");
               }
          
          });
           
        }
    }
   
  
});
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
}



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
var ValueLC = '';
function getSelectValueLC(){
  ValueLC = document.getElementById("listlic").value;
}
      
var ValueMS = '';
function getSelectValueMS(){
  ValueMS = document.getElementById("listmstr").value;

}