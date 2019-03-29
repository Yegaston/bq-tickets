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
      name: 'evento',
      path: '/evento/',
      url: 'evento.html'
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
    UserGet.get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          $$('#cuenta-name').text(doc.data().name);
          $$('#cuenta-email').text(userEmail);
          if(doc.data().img){
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
          <div class="item-inner">
            <div id="${amigo}" class="item-title">${amigo}</div>
          </div>
        </div>
      </li>`
    );
  });

  amigos.forEach(amigo => {
    $$(`#${amigo}`).click(function (e) {
      e.preventDefault();
      console.log(amigo)
    });
  });

})