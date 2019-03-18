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
  ],
  // ... other parameters
  panel: {

  }
});


var mainView = app.views.create('.view-main');


// CLASES DECLARATIONS
// THIS USE FOR THE AUTH WITH MAIL
emailProvider = new emailProvider;
console.log('db' + db)
// var emailProvider = new emailProvider();

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
  console.log("Device is ready!");
  automaticGenerateEvents();

});

// ###########
// VARIABLES GLOBALES
// ###########

// EMAIL DE LA SESION

var userEmail = ''



// ###########
// INIT
// ###########

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {

  console.log(e)

  if (userEmail) {
    // Aca me traigo los datos de ese usuario
  } else {
    app.views.main.router.navigate({ name: 'register' });
  }



})

// ###########
// INDEX
// ###########
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  // Esto genera el feed

  // Asigna el nombre en el panel
  $$('#user-email-panel').text(userEmail);


  for (var i = 0; i < 3; i++) {

    // Esto genera las card de los posteos.
    $$('#feed-container').append(`
    <div class="card demo-card-header-pic">
      <div style="background-image:url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRptiPOrwVa5w_tmxE5lF_S1i9sIrx8ZAQHqBPptzt4Qk01EX0M)"
        class="card-header align-items-flex-end">Journey To Mountains</div>
      <div>
          <!-- Aca va la parte del organizador. -->
      </div>
      <div class="card-content card-content-padding">
        <p class="date">Posted on January 21, 2015</p>
        <p>Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies efficitur vitae non felis.
            Phasellus quis nibh hendrerit...</p>
      </div>
      <div class="card-footer"><a class="link sheet-open" data-sheet=".my-sheet">Mas info</a><a href="#" class="link">Asistir</a></div>
    </div>
  `);
  }

  $$('#mas-info-header').click(function (e) {
    e.preventDefault();
    console.log("Evento Button Click")
    app.views.main.router.navigate({ name: 'evento' })
  });
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
    });
  });

  $$('#done-continue').click(function (e) {
    e.preventDefault();
    app.views.main.router.navigate({ name: 'index' })
  });



})

// ###########
// MAIN SCREN
// ###########
$$(document).on('page:init', '.page[data-name="main-screen"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);


})


var db = firebase.firestore();

function automaticGenerateEvents() {
  db.collection("users").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
  })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });


  // db.collection("eventos").add({
  //     title: 'No Te Va Gustar',
  //     organizador: 'No Te Va Gustar',
  //     descrip: "Presentan su nuevo disco.",
  //     foto: 'https://www.diariocol.com/wp-content/uploads/2017/09/notevag.jpg',
  // //    tags: ['rock', 'musica', 'rosario'],
  //     lugar: 'Salon Metropolitano',
  //     Dia: '21/4/2019',
  //     hora: '23:00',
  //     asistentes: 0,
  //  //   tipoDeEntrada: ['general S/A'],
  //  //   boleterias: ['https://www.ticketek.com.ar/no-te-va-gustar/teatro-gran-rex', 'www.notevagustar.com']

  // })
  // .then(function(docRef) {
  //     console.log("Document written with ID: ", docRef.id);
  // })
  // .catch(function(error) {
  //     console.error("Error adding document: ", error);
  // });

  // db.collection("eventos").add({
  //     title: 'Aladin, una aventura magica',
  //     organizador: '@aladinelshow',
  //     descrip: 'Un evento magico para disfrutar en familia', 
  //     foto: 'http://am1300lasalada.com.ar/wp-content/uploads/2018/07/aladin-portada.jpg',
  //     tags: ['niños', 'teatro', 'rosario'],
  //     lugar: 'Teatro Broadway',
  //     Dia: '12/6/2019',
  //     hora: '15:30',
  //     asistentes: 0,
  //     tipoDeEntrada: ['Fila 1/3 Numeradas', 'Fila 4/6 Numeradas', 'Tertulia ', 'Palcos Izq y Der'],
  //     boleterias: ['https://www.ticketek.com.ar/aladin/teatro-gran-rex']

  // })
  // .then(function(docRef) {
  //     console.log("Document written with ID: ", docRef.id);
  // })
  // .catch(function(error) {
  //     console.error("Error adding document: ", error);
  // });

  // db.collection("eventos").add({
  //     title: 'Rosario Central - Gremio',
  //     organizador: 'Copa Libertadores',
  //     descrip: 'Partido por la copa mas importante de america!.', 
  //     foto: 'https://futbolete.com/wp-content/uploads/2016/05/rosario-central-gremio-copa-libertadores.jpg',
  //     tags: ['deportes', 'futbol', 'rosario', 'copa'],
  //     lugar: 'Estadio de Rosario Central',
  //     Dia: '16/3/2019',
  //     hora: '21:30',
  //     asistentes: 0,
  //     tipoDeEntrada: ['Fila 1/3 Numeradas', 'Fila 4/6 Numeradas', 'Tertulia ', 'Palcos Izq y Der'],
  //     boleterias: ['https://www.ticketek.com.ar/aladin/teatro-gran-rex']

  // })
  // .then(function(docRef) {
  //     console.log("Document written with ID: ", docRef.id);
  // })
  // .catch(function(error) {
  //     console.error("Error adding document: ", error);
  // });



}