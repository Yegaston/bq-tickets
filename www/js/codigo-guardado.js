var provider = new firebase.auth.GoogleAuthProvider();
  // El idioma
  firebase.auth().languageCode = 'es';

  $$('#GoogleLogin').on('click', function (e) {
    console.log("Hola")

    // firebase.auth().signInWithPopup(provider).then(function (result) {
    //   // This gives you a Google Access Token. You can use it to access the Google API.
    //   var token = result.credential.accessToken;
    //   // The signed-in user info.
    //   var user = result.user;
    //   // ...
    // }).catch(function (error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // The email of the user's account used.
    //   var email = error.email;
    //   // The firebase.auth.AuthCredential type that was used.
    //   var credential = error.credential;
    //   // ...
    // });

    firebase.auth().signInWithRedirect(provider).then(function() {
      return firebase.auth().getRedirectResult();
    }).then(function(result) {
      // This gives you a Google Access Token.
      // You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  });



  <!-- <div class="col-50 ">
  <a id="GoogleLogin"><img class="icon-google align-self-center" src="./img/Google__G__Logo.svg"
          alt="xd"></a> 
       <a id="GoogleLogin" class="button button-round button-fill">Login Google</a> 
       </div> -->