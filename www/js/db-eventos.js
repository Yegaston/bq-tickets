 var db = firebase.firestore();

 function automaticGenerateEvents() { 
    
     db.collection("eventos").add({
         title: 'No Te Va Gustar',
         organizador: 'No Te Va Gustar',
         descrip: "Presentan su nuevo disco.",
         foto: 'https:www.diariocol.com/wp-content/uploads/2017/09/notevag.jpg',
         tags: ['rock', 'musica', 'rosario'],
         lugar: 'Salon Metropolitano',
         Dia: '21/4/2019',
         hora: '23:00',
         asistentes: 0,
         tipoDeEntrada: ['general S/A'],
         boleterias: ['https:www.ticketek.com.ar/no-te-va-gustar/teatro-gran-rex', 'www.notevagustar.com']
    
     })
     .then(function(docRef) {
         console.log("Document written with ID: ", docRef.id);
     })
     .catch(function(error) {
         console.error("Error adding document: ", error);
     });
    
     db.collection("eventos").add({
         title: 'Aladin, una aventura magica',
         organizador: '@aladinelshow',
         descrip: 'Un evento magico para disfrutar en familia', 
         foto: 'http:am1300lasalada.com.ar/wp-content/uploads/2018/07/aladin-portada.jpg',
         tags: ['niños', 'teatro', 'rosario'],
         lugar: 'Teatro Broadway',
         Dia: '12/6/2019',
         hora: '15:30',
         asistentes: 0,
         tipoDeEntrada: ['Fila 1/3 Numeradas', 'Fila 4/6 Numeradas', 'Tertulia ', 'Palcos Izq y Der'],
         boleterias: ['https:www.ticketek.com.ar/aladin/teatro-gran-rex']
    
     })
     .then(function(docRef) {
         console.log("Document written with ID: ", docRef.id);
     })
     .catch(function(error) {
         console.error("Error adding document: ", error);
     });

     db.collection("eventos").add({
         title: 'Rosario Central - Gremio',
         organizador: 'Copa Libertadores',
         descrip: 'Partido por la copa mas importante de america!.', 
         foto: 'https:futbolete.com/wp-content/uploads/2016/05/rosario-central-gremio-copa-libertadores.jpg',
         tags: ['deportes', 'futbol', 'rosario', 'copa'],
         lugar: 'Estadio de Rosario Central',
         Dia: '16/3/2019',
         hora: '21:30',
         asistentes: 0,
         tipoDeEntrada: ['Fila 1/3 Numeradas', 'Fila 4/6 Numeradas', 'Tertulia ', 'Palcos Izq y Der'],
         boleterias: ['https:www.ticketek.com.ar/aladin/teatro-gran-rex']
    
     })
     .then(function(docRef) {
         console.log("Document written with ID: ", docRef.id);
     })
     .catch(function(error) {
         console.error("Error adding document: ", error);
     });

 

 }