// var db = firebase.firestore();

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
        app.views.main.router.navigate({ name: 'register-done' });
      })
      .catch(function (error) {
        if (error) {
          console.log(error)
        } else {
          console.log("Usuario creado");
        }
      });
  }

  login(email, password) {
    console.log("Hola")
    console.log(email)
    console.log(password)
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function () {
        console.log("Usuario Logeado");
        userEmail = email;
        app.views.main.router.navigate({ name: 'index' });
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(error)
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

  // Recibo los datos
  getEventsDataIndexCards() {
    var db = firebase.firestore();

    db.collection("eventos").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());

        $$('#feed-container').append(`
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
            <div class="card-footer"><a class="link sheet-open" data-sheet=".my-sheet">Mas info</a><a href="#" class="link">Asistir</a></div>
          </div>
  `);
      });
    });

  }

}

