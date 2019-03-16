class emailProvider {
    constructor() {
      
    }
  
    registro(email, password) {
      console.log("Hello world");
      console.log(email)
      console.log(password)
      
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function () {
          console.log("Usuario creado");
          userEmail = email;
          app.views.main.router.navigate({ name: 'index' });
        })
        .catch(function (error) {
          if (error) {
            console.log(error)
          } else {
            console.log("Usuario creado");
          }
        });
    }
  
    login(email, password){
      console.log("Hola")
      console.log(email)
      console.log(password)
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(){
          console.log("Usuario Logeado");
          userEmail = email;
          app.views.main.router.navigate({ name: 'index' });
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          console.log(error)
        });
    }
  }