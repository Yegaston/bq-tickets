// Initialize app

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

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
    }
  ]
  // ... other parameters
});

var mainView = app.views.create('.view-main');



emailProvider = new emailProvider;

// var emailProvider = new emailProvider();

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
  console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {

  console.log(e)

  // Registro

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

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="about"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
})

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


$$(document).on('page:init', '.page[data-name="main-screen"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);

  // Esto genera el feed
  for (var i = 0; i < 3; i++) {

    // Esto genera las card de los posteos.
    $$('#feed-container').append(`
      <div class="card demo-card-header-pic">
        <div style="background-image:url(http://lorempixel.com/1000/600/nature/3/)"
          class="card-header align-items-flex-end">Journey To Mountains</div>
        <div>
            <!-- Aca va la parte del organizador. -->
        </div>
        <div class="card-content card-content-padding">
          <p class="date">Posted on January 21, 2015</p>
          <p>Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies efficitur vitae non felis.
              Phasellus quis nibh hendrerit...</p>
        </div>
        <div class="card-footer"><a href="#" class="link">Mas info</a><a href="#" class="link">Asistir</a></div>
      </div>
    `);
  }

  $$('#mas-info-header').click(function (e) {
    e.preventDefault();
    console.log("Evento Button Click")
    app.views.main.router.navigate({ name: 'evento' })
  });

})