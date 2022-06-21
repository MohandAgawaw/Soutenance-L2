const medias = document.querySelectorAll('.bulle');
window.addEventListener('load', () => {

    const TL = gsap.timeline({paused: true});

    TL
    .staggerFrom(medias, 1, {left: -200, ease: "power2.out"}, 0.3, '-=1');

    TL.play();
})


const btnCircle = document.querySelector('.btn-circle');
const circleMenu = document.querySelector('.circle-menu');


btnCircle.addEventListener('click', () => {

    btnCircle.classList.toggle('menu-anim');
    circleMenu.classList.toggle('circle-anim');
    

})

function logout(){
    
    auth.signOut();
    window.open("index.html", "_self");
    
  
  }
  firebase.database().ref("messages").on("child_removed", function (snapshot) {
    document.getElementById("message-" + snapshot.key).innerHTML = "This message has been deleted";
  });

  function deleteMessage(self) {
    var messageId = self.getAttribute("data-id");
    firebase.database().ref("messages").child(messageId).remove();
  }

  function sendMessage() {
    var message = document.getElementById("message").value;
    firebase.database().ref("messages").push().set({
      "message": message,
      "sender": myName,
      "name" : mynom
    });
    return false;
  }

  document.getElementById("clik1").style.display = "none";
  document.getElementById("clik2").style.display = "none";
  document.getElementById("clik4").style.display = "none";
  document.getElementById("cercle").style.display = "none";
  document.getElementById("bul1").style.display = "none";
  document.getElementById("bul11").style.display = "none";
  document.getElementById("bul2").style.display = "none";
  document.getElementById("bul22").style.display = "none";

  document.getElementById("bulm").style.display = "none";
              document.getElementById("bulmm").style.display = "none";
              document.getElementById("clik5").style.display = "none";
              document.getElementById("clik6").style.display = "none";
var Type = '';
firebase.auth().onAuthStateChanged(function(user) {
    if(user){
        var user = firebase.auth().currentUser;
        if (user != null) {
          firebase.database().ref('users/' + user.uid+ '/ty').on('value',(snap)=>{
            Type = snap.val();
            console.log(Type);
            if(Type =='étudiant'){
             
              document.getElementById("clik1").style.display = "block";
              document.getElementById("clik2").style.display = "block";
              document.getElementById("clik4").style.display = "block";
              document.getElementById("cercle").style.display = "block";
              document.getElementById("bul1").style.display = "block";
              document.getElementById("bul11").style.display = "block";
              document.getElementById("bul2").style.display = "block";
              document.getElementById("bul22").style.display = "block";
            }else{
            
             
              document.getElementById("bulm").style.display = "block";
              document.getElementById("bulmm").style.display = "block";
              document.getElementById("clik5").style.display = "block";
              document.getElementById("clik6").style.display = "block";
            }
          });
          
        }
        
    }
    
  
});
