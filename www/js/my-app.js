// Initialize app

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;


// APP SETTINGS
var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'My App',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [
    {
      path: '/about/',
      url: 'about.html',
    },
    {
      name: 'main-screen',
      path: '/main-screen/',
      url: 'main-screen.html'
    },
    {
      name: 'login-screen',
      path: '/login-screen/',
      url: 'login-screen.html'
    },
    {
      name: 'register',
      path: '/register/',
      url: 'register.html'
    },
    {
      name: 'index',
      path: '/index/',
      url: 'index.html'
    },
    {
      name: 'register-done',
      path: '/register-done/',
      url: 'register-done.html'
    },
    {
      name: 'cuenta',
      path: '/cuenta/',
      url: 'cuenta.html'
    },
    {
      name: 'amigos',
      path: '/amigos/',
      url: 'amigos.html'
    },
    {
      name: 'welcome',
      path: '/welcome/',
      url: 'welcome.html'
    },
    {
      name: 'asistir',
      path: '/asistir/',
      url: 'asistir.html'
    },
  ],
  // ... other parameters
  panel: {

  }
});


var mainView = app.views.create('.view-main');


// CLASES DECLARATIONS
// THIS USE FOR THE AUTH WITH MAIL
emailProvider = new emailProvider;
// var emailProvider = new emailProvider();


// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
  console.log("Device is ready!");
  //  automaticGenerateEvents();
});

// ###########
// VARIABLES GLOBALES
// ###########

// EMAIL DE LA SESION

var userEmail = '';
var userTags = [];


// ###########
// INIT
// ###########

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {

  console.log(e)

  if (userEmail) {
    // Aca me traigo los datos de ese usuario
  } else {
    app.views.main.router.navigate({ name: 'welcome' });
  }



})

// ###########
// INDEX
// ###########
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  // Esto genera el feed

  // Asigna el nombre en el panel
  $$('#user-email-panel').text(userEmail);


  emailProvider.getEventsDataIndexCards();

  $$('#mas-info-header').click(function (e) {
    e.preventDefault();
    console.log("Evento Button Click")
    app.views.main.router.navigate({ name: 'evento' })
  });

  $$('#logout').click(function (e) {
    e.preventDefault();
    emailProvider.logout();
  });

  // Tirar y recargar

  $$('.ptr-content').on('ptr:refresh', function (e) {
    console.log("Reloading")
    emailProvider.getEventsDataIndexCards();
  })
})

// ###########
// LOGIN
// ###########
$$(document).on('page:init', '.page[data-name="login-screen"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  console.log("Login Page Loaded")
  $$('#login-button').click(function (e) {
    console.log("login-button");

    var email = $$('#login-email').val();
    var password = $$('#login-password').val();
    emailProvider.login(email, password);
  })
})

// ###########
// REGISTRO
// ###########
$$(document).on('page:init', '.page[data-name="register"]', function (e) {


  $$('#register-button').click(function (e) {
    e.preventDefault();

    var email = $$('#register-email').val();
    var password = $$('#register-password').val();

    emailProvider.registro(email, password);

  });

  $$('#gotologin').click(function (e) {
    e.preventDefault();
    console.log("gotologin")
    app.views.main.router.navigate({ name: 'login-screen' })
  });

})

// ###########
// EVENTO
// ###########
$$(document).on('page:init', '.page[data-name="evento"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);

  for (var i = 0; i < 3; i++) {
    $$('#entradas-options').append(`
        <li class="accordion-item"><a href="#" class="item-content item-link">
            <div class="item-inner">
                <div class="item-title">Opcion 1(General S/A) <!-- Viene desde un objeto --></div>
            </div></a>
            <div class="accordion-item-content">
                <div class="block">
                    <div>
                        <p>Descripcion de la opcion</p>
                        <a href="#">Conseguir en servicio externo</a>
                    </div>
                </div>
            </div>
        </li>
    `);
  }

})

// ###########
// Register done
// ###########
$$(document).on('page:init', '.page[data-name="register-done"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);

  $$('#done-name').text(userEmail);

  const tags = ['rock', 'musica', 'rosario', 'niños', 'teatro', 'deportes', 'futbol', 'copa']

  tags.forEach(tag => {
    $$('#tags-container').append(` 
      <div id="${tag}" class="chip chip-outline">
        <div class="chip-label">${tag}</div>
      </div>
    `);
  });

  tags.forEach(tag => {
    $$(`#${tag}`).click(function (e) {
      e.preventDefault();
      $$(`#${tag}`).removeClass('chip-outline');
      console.log(tag);
      userTags.push(tag);
      console.log(userTags);
    });
  });

  $$('#done-continue').click(function (e) {
    e.preventDefault();
    var userName = $$('#userName').val();
    var userAge = $$('#userAge').val();

    emailProvider.pushUserData(userName, userAge, userTags);
  });



})

// ###########
// MAIN SCREN
// ###########
$$(document).on('page:init', '.page[data-name="main-screen"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);


})

// ###########
// CUENTA SCREEN
// ###########
$$(document).on('page:init', '.page[data-name="cuenta"]', function (e) {

  var db = firebase.firestore();
  console.log(userEmail)
  var user = {}

  var UserGet = db.collection("users").doc(userEmail);
  const storageRef = firebase.storage().ref(`/${userEmail}/profileImage`);
  
  // Set attr to start (Trae los datos del usuario y  los imprime en pantalla)
  UserGet.get()
    .then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        $$('#cuenta-name').text(doc.data().name);
        $$('#cuenta-email').text(userEmail);
        doc.data().tags.forEach(function (tag) {
          $$('#cuenta-tags').append(` 
          <div id="${tag}" class="chip chip-outline">
            <div class="chip-label">${tag}</div>
          </div>
        `);
        })
        if (doc.data().img) {
          $$('#cuenta-img').attr('src', doc.data().img);
        } else {
          $$('#cuenta-img').attr('src', 'https://i.imgur.com/oI9j9pR.jpg');
        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });

  $$('#cuenta-img-button').click(function (e) {
    e.preventDefault();
    console.log("Opening Camera??");
    navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI
    });
  });



  // Success callback function when photo is correct taken
  function onSuccess(imageURI) {
    var image = document.getElementById('myImage');
    image.src = imageURI;
    $$('#cuenta-img').attr('src', imageURI);
    console.log(imageURI);


    storageRef.put(imageURI)

    let task = storageRef.put(imageURI)
    task.on('state_changed', function (snapshot) {
      let percentaje = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log(percentaje)

    },
      function (err) {
        console.log(err)
      },
      function () {
        console.log(task.snapshot.downloadURL)
      }
    )

  }

  // Error photo when is failed the photo taken.
  function onFail(message) {
    alert('Failed because: ' + message);
  }

  function SaveDataInUser(userID) {
    var userToUpdate = db.collection("users").doc(userID);

    console.log(userID);;

    const dataToPush = {
      userTel: $$('#userTel').val(),
      userDireccion: $$('#userDireccion').val()
    }

    return userToUpdate.update({
      userTel: dataToPush.userTel,
      userDireccion: dataToPush.userDireccion
    })
      .then(function () {
        console.log("Camps added");
        $$('#userTel').val(dataToPush.userTel);
        $$('#userDireccion').val(dataToPush.userDireccion);
        toastSuccesUpdate.open()
      })
      .catch(function (err) {
        console.log(err)
      })
    console.log(dataToPush)
  }

  var toastSuccesUpdate = app.toast.create({
    text: 'Cuenta actualizada!. :)',
    position: 'top',
    closeTimeout: 2000,
  });

  $$('#sendDataCuenta').click(function (e) {
    e.preventDefault();
    SaveDataInUser(userEmail);

  });

})


// ###########
// AMIGOS SCREEN
// ###########
$$(document).on('page:init', '.page[data-name="amigos"]', function (e) {
  const amigos = ['Luis Suarez', 'Ousmane Dembele', 'Samuel Umtiti', 'Rafinha', 'Nelson Semedo']



  amigos.forEach(amigo => {
    $$('#contactos').append(
      `<li>
        <div class="item-content">
          <a href="#" data-popup=".chat" class="popup-open chatscreen">
            <div class="item-inner display-flex justify-content-space-between align-items-flex-start">
              <div id="${amigo}" class="item-title flex-shrink-0">
                <span class="friendUser">${amigo}</span> <span class="align-self-flex-end"><i class="f7-icons size-22">chat</i></span>
                
              </div>
            </div>
          </a>
        </div>
      </li>`
    );
  });


  $$('.chatscreen').click(function (e) {
    e.preventDefault();
    const user = $$('.friendUser').text()
    $$('.chatWith').text(user);
  });
  amigos.forEach(amigo => {
    $$(`#${amigo}`).click(function (e) {
      e.preventDefault();
      console.log(amigo)
    });
  });

})

// ##########
// ASISTIR SCREEN
// #########

$$(document).on('page:init', '.page[data-name="asistir"]', function (e) {
  var db = firebase.firestore();
  var UserGet = db.collection("users").doc(userEmail);
  var EventsIds = []

  UserGet.get()
    .then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());

        if (doc.data().Asistir) {
          console.log("Hey, existo!")
          EventsIds = doc.data().Asistir
        } else {
          console.log("El usuario no tiene eventos guardados en asistir.");
          $$('#eventos-asistir').append(`
            <div class="display-flex row">
              <div class="row">
                <h5>Ups... Aparentemente no tienes ningun proximo evento :( .</h5>
              </div>
              <div class="">
                <i class="f7-icons ios-only excl-icon">info</i>
                <i class="material-icons ios-only excl-icon">info</i>
              </div>
                <div class="row"> 
                  <h5> Por que no buscas algo para hacer! </h5>
                </div>
            </div>
          `)
        }
      } else {
        console.log("Doc not found")
      }
      EventsIds.forEach(function (EventId) {
        console.log(EventId);
        db.collection("eventos").doc(EventId).get()
          .then(function (event) {
            $$('#eventos-asistir').append(`
            <div class="card demo-card-header-pic">
                <div style="background-image:url(${event.data().foto})" class="card-header align-items-flex-end">
                  ${event.data().title}
                </div>
                <div class="card-content card-content-padding">
                    <p> ${event.data().descrip} el dia ${event.data().Dia} a las ${event.data().hora} en ${event.data().lugar}
                </div>
                <div class="card-footer"><a href="#" class="link">De-asistir</a>
                </div>
            </div>
            `);
          })
          .catch(function (err) {
            console.log(err);
          })
      })
    })
    .catch(function (err) {
      console.log(err)
    })
})