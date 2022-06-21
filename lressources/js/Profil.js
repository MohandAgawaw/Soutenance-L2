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
   const btnup = document.getElementById("upload");
 var spc ='';
   btnup.addEventListener('click', () => {
   //---- up data
   namee = document.getElementById('titrefr').value;
frname = document.getElementById("titrefrs").value;
 if(ValueMS != ''||ValueMS !='-sélectionnez votre Spécialité.'){
    spc = ValueMS;
    console.log(spc);
 }
 if(ValueLC != ''||ValueLC !='-sélectionnez votre Spécialité.'){
    spc = ValueLC;
 }

 if(ValueMS !=''){
    
    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            var user = firebase.auth().currentUser;
            if (user != null) {
                firebase
    .database()
    .ref("users/" + user.uid)
    .update({
      //   rollNo: rollV,
      Spécialité: ValueMS
    });
            }
        }
    });
  }else if(ValueLC !=''){
    console.log(spc);
    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            var user = firebase.auth().currentUser;
            if (user != null) {
                firebase
    .database()
    .ref("users/" + user.uid)
    .update({
      //   rollNo: rollV,
      Spécialité: ValueLC
    });
            }
        }
    });
  }

if(namee !='' ){
 firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            var user = firebase.auth().currentUser;
            if (user != null) {
                firebase
    .database()
    .ref("users/" + user.uid)
    .update({
      //   rollNo: rollV,
      nome : namee
    });
            }
        }
       
      
    });
}
if(frname !='' ){
    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            var user = firebase.auth().currentUser;
            if (user != null) {
                
                firebase
    .database()
    .ref("users/" + user.uid)
    .update({
      //   rollNo: rollV,
      prenom: frname
    });
            }
        }
       
      
    });
}

    if(selectedValue != false || selectedValue != '-sélectionnez votre Grade.'){
        firebase.auth().onAuthStateChanged(function(user) {
            if(user){
                var user = firebase.auth().currentUser;
                if (user != null) {
                    firebase
        .database()
        .ref("users/" + user.uid)
        .update({
          //   rollNo: rollV,
          grade: selectedValue
        });
                }
            }
           
          
        });
        
          

    }

  
    
  
})
   const btnmod = document.getElementById("mod");

   btnmod.addEventListener('click', () => {
    document.getElementById("modal").style.display = "block";
   })
var Name ='';
var pName ='';
var Grade ='';
var email ='';
var Spécialité= '';
const loader = document.querySelector('.loader');
firebase.auth().onAuthStateChanged(function(user) {
    if(user){
        var user = firebase.auth().currentUser;
        if (user != null) {
            database.ref('users/' + user.uid).on('value',(snap)=>{
                Name = snap.val().nome;
                pName = snap.val().prenom;         
                Grade = snap.val().grade;
                email = snap.val().email;
                Spécialité= snap.val().Spécialité;
                document.getElementById('Full_Name').innerHTML = "Name : "+Name;
                document.getElementById("titrefr").value = Name;
                document.getElementById("titrefrs").value = pName;
                document.getElementById('Full_Prenom').innerHTML = "Prenom : "+pName;
                document.getElementById('Grade').innerHTML = "Grade : "+Grade;
                document.getElementById('Spécialité').innerHTML = "Spécialité : "+ Spécialité;
                document.getElementById('email').innerHTML = "email : "+email;
              });
           
        }
    }
   
  
});
document.getElementById("modal").style.display = "none";
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
  console.log(ValueLC)
}
      
var ValueMS = '';
function getSelectValueMS(){
  ValueMS = document.getElementById("listmstr").value;

}

//----- exite

const btnexit = document.getElementById("exit");
btnexit.addEventListener('click', () => {
    document.getElementById("modal").style.display = "none";

})