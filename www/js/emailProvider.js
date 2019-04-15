// var db = firebase.firestore();

class emailProvider {
  constructor() {

  }

  registro(email, password) {
    var registerErr = app.toast.create({
      text: 'Register Error: Compruebe los datos ingresados',
      closeButton: true,
      closeButtonText: 'Cerrar',
      closeButtonColor: 'red',
    });
    console.log("Hello world");

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function () {
        console.log("Usuario creado");
        userEmail = email;
        app.views.main.router.navigate({ name: 'register-done' });
      })
      .catch(function (error) {

      });
    registerErr.open();
  }

  login(email, password) {
    console.log("Hola")
    var loginErrMessage = ''
    var loginErrCode = ''
    var loginErr = app.toast.create({
      text: 'Usuario o clave erronea.',
      closeButton: true,
      closeButtonText: 'Cerrar',
      closeButtonColor: 'red',
    });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function () {
        console.log("Usuario Logeado");
        userEmail = email;
        app.views.main.router.navigate({ name: 'index' });
      })
      .catch(function (error) {
        
        // ...
        console.log(error)
        loginErr.open();
      });
  }

  automaticGenerateEvents() {
    var db = firebase.firestore();

    db.collection("eventos").add({
      title: 'No Te Va Gustar',
      organizador: 'No Te Va Gustar',
      descrip: "Presentan su nuevo disco.",
      foto: 'https://www.diariocol.com/wp-content/uploads/2017/09/notevag.jpg',
      tags: ['rock', 'musica', 'rosario'],
      lugar: 'Salon Metropolitano',
      Dia: '21/4/2019',
      hora: '23:00',
      asistentes: 0,
      tipoDeEntrada: ['general S/A'],
      boleterias: ['https://www.ticketek.com.ar/no-te-va-gustar/teatro-gran-rex', 'www.notevagustar.com']

    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

    db.collection("eventos").add({
      title: 'Aladin, una aventura magica',
      organizador: '@aladinelshow',
      descrip: 'Un evento magico para disfrutar en familia',
      foto: 'http://am1300lasalada.com.ar/wp-content/uploads/2018/07/aladin-portada.jpg',
      tags: ['niños', 'teatro', 'rosario'],
      lugar: 'Teatro Broadway',
      Dia: '12/6/2019',
      hora: '15:30',
      asistentes: 0,
      tipoDeEntrada: ['Fila 1/3 Numeradas', 'Fila 4/6 Numeradas', 'Tertulia ', 'Palcos Izq y Der'],
      boleterias: ['https://www.ticketek.com.ar/aladin/teatro-gran-rex']

    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

    db.collection("eventos").add({
      title: 'Rosario Central - Gremio',
      organizador: 'Copa Libertadores',
      descrip: 'Partido por la copa mas importante de america!.',
      foto: 'https://futbolete.com/wp-content/uploads/2016/05/rosario-central-gremio-copa-libertadores.jpg',
      tags: ['deportes', 'futbol', 'rosario', 'copa'],
      lugar: 'Estadio de Rosario Central',
      Dia: '16/3/2019',
      hora: '21:30',
      asistentes: 0,
      tipoDeEntrada: ['Fila 1/3 Numeradas', 'Fila 4/6 Numeradas', 'Tertulia ', 'Palcos Izq y Der'],
      boleterias: ['https://www.ticketek.com.ar/aladin/teatro-gran-rex']

    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

  }

  // getUserEvents(userID) {
  //   var db = firebase.firestore();


  // }

  asistirButton(eventoID, userID) {
    var db = firebase.firestore();

    var docRef = db.collection("users").doc(userID);

    var toastTop = app.toast.create({
      text: 'Evento Agregado',
      position: 'top',
      closeTimeout: 2000,
    });

    var eventsArray = []

    docRef.get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("User events:", doc.data().Asistir);
          if (doc.data().Asistir) {
            var eventsArray = doc.data().Asistir
            eventsArray.push(eventoID)
            return docRef.update({ Asistir: eventsArray })
              .then(function () {
                $$('.open-toast-top').on('click', function () {
                  toastTop.open();
                });
              })
              .catch(function (err) {
                console.log(err)
              });

          } else {
            return docRef.update({ Asistir: [eventoID] })
              .then(function () {

                $$('.open-toast-top').on('click', function () {
                  toastTop.open();
                });

              })
              .catch(function (err) {
                console.log(err)
              });

          }

        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });




  }

  // Recibo los datos
  getEventsDataIndexCards() {
    var db = firebase.firestore();

    $$('#feed-container').html('');

    db.collection("eventos").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());

        $$('#feed-container').append(`
          <div>
            <div class="card demo-card-header-pic">
              <div style="background-image:url(${doc.data().foto})"
                class="card-header align-items-flex-end">${doc.data().title}</div>
              <div>
                  <!-- Aca va la parte del organizador. -->
              </div>
              <div class="card-content card-content-padding">
                <p class="date">El evento es: ${doc.data().Dia}</p>
                <p>${doc.data().descrip}. Organizador: <span><b>${doc.data().organizador}</b></span></p>
              </div>
              <div class="card-footer">
                <a class="link popup-open" data-popup=".popup-${doc.id}" >Mas info</a>
                <a href="#" class="link open-toast-top" onclick="emailProvider.asistirButton('${doc.id}', '${userEmail}')">Asistir</a>
              </div>
            </div>

              <div class="popup popup-${doc.id}">
                
                  <div class="navbar">
                    <div class="navbar-inner">
                      <div class="left">
                          <a href="#" data-panel="left" class="panel-open"><i class="f7-icons">icon-bars</i></a>

                      </div>
                    <div class="title">Inicio</div>
                    <div class="right">
                      <a href="#" class="link  popup-close"><i class="f7-icons">arrow_down</i></a>
                      </div>
                  </div>
              </div>
              <div class="block">
                  <h1>${doc.data().title}</h1>
                  <!-- Close Popup -->
                  
                  <p>${doc.data().descrip}</p>

                  <div class="block-title">Entradas y tipos.</div>
                  <div class="list accordion-list">
                    <ul id="carrousel-${doc.id}">

                    </ul>
                  </div>
                  
              </div>
            </div>
          </div>
  `);

        for (let i = 0; i < doc.data().tipoDeEntrada.length; i++) {
          const element = doc.data().tipoDeEntrada[i];
          $$(`#carrousel-${doc.id}`).append(`
          <li class="accordion-item">
            <a href="#" class="item-content item-link">
              <div class="item-inner">
                <div class="item-title">${element}</div>
              </div>
            </a>
            <div class="accordion-item-content">
              <div class="block boleteria-${doc.id}">

              </div>
            </div>
          </li>
        `);
        }

        doc.data().boleterias.forEach(function (boleteria) {
          $$(`.boleteria-${doc.id}`).append(`
            <p><a href="${boleteria}">${boleteria}</a></p>
        `);
        })

      });
    });

  }


  pushUserData(name, age, tags) {

    const user = {
      name: name,
      age: age,
      tags: tags,
    }

    var db = firebase.firestore();

    db.collection("users").doc(userEmail).set(user)
      .then(function () {
        app.views.main.router.navigate({ name: 'index' });
      })
      .catch(function (err) {
        console.log(err);
      })
  }

  logout() {
    firebase.auth().signOut().then(function () {
      app.views.main.router.navigate({ name: 'login-screen' });
      userEmail = '';
      userTags = [];

    }).catch(function (err) {
      console.log(err);
    });
  }

  getUserByEmail(email) {
    var db = firebase.firestore();

    var usersRef = db.collection("users")

    usersRef.doc(email).get().then(function (doc) {
      if (doc.exists) {
        $$('#cuentaName').text(doc.data().name);
        $$('#cuentaEmail').text(doc.id)
        return doc
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }

  cuentaUserData() {
    var doc = emailProvider.getUserByEmail('messi@barcelona.com');
  }

}

