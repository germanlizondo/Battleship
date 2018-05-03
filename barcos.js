
var Ship = function(name, size, id,stade) {

    this.name = name;
    this.size = size;
    this.id = id; 
    this.stade = stade;
  }

var ships = [

    new Ship("Portaaviones","4", "portaaviones", "entero"),

    new Ship("Submarino","3", "submarino1", "entero"),
    new Ship("submarino","3", "submarino2", "entero"),

    new Ship("Destructor","2", "destructor1", "entero"),
    new Ship("Destructor", "2", "destructor2", "entero"),
    new Ship("Destructor","2", "destructor3", "entero"),


    new Ship("Fragata","1", "fragata1", "entero"),
    new Ship("Fragata","1", "fragata2", "entero"),
    new Ship("Fragata","1", "fragata3", "entero"),
    new Ship("Fragata","1", "fragata4", "entero")

];



var casillas = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35",
    "36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80",
"81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","96","97","98","99"];

var tablero_mio = [

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

]


var tablaIA  = [

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

]

  var db;

var barcomovido = 0;

var context = new AudioContext(),
request = new XMLHttpRequest();

request.open('GET', 'battleshipgamesound.mp3', true);
request.responseType = 'arraybuffer';

request.onload = function () {
var undecodedAudio = request.response;

context.decodeAudioData(undecodedAudio, function (buffer) {
    var sourceBuffer = context.createBufferSource();
    
 

    sourceBuffer.buffer = buffer;
    sourceBuffer.connect(context.destination);
   
    sourceBuffer.start(context.currentTime);
    sourceBuffer.loop = true;
});
};
function animacio(e) {

    var tamany_menos = 70;

    var tamany = 0;



    e.target.className += " transform";



}

function start(){

    var cache = window.applicationCache;

 
    document.getElementById('alertas').innerHTML = "Et toca!";
    document.getElementById('restart').addEventListener("click",function(){
        location.reload(true);
    },false);

    document.getElementById('inicia').addEventListener("click",juegocontralaIA,false);

    mitabla();
    tablaenemy();
    draganddrop();
    aleatorio_enemigo();
    emmagatzematge();

   




    
//     for ( i = 0; i < ships.length; i++) {
//     document.write((ships[i]).name+"/ ");
//      document.write((ships[i]).id+"/ ");
//      document.write((ships[i]).size+"/ ");
//    document.write((ships[i]).stade+"<br>");
        
//   }
   
}


function tablaenemy(){
    var tabla_enemy = document.getElementById("tableenemy");
    var tabla   = document.createElement("table");
    var tblBody = document.createElement("tbody");


    for (var i = 0; i < 10; i++) {
      var hilera = document.createElement("tr");
     
      for (var j = 0; j < 10; j++) {
       
        var celda = document.createElement("td");
        hilera.appendChild(celda);
        celda.className += "casilla";
        celda.id = "celdaenemy"+i+j;  
      
      }
   
      tblBody.appendChild(hilera);


    }
   
    tabla.appendChild(tblBody);
    tabla_enemy.appendChild(tabla);
}





function mitabla(){
    var mitabla = document.getElementById("mitabla");
    var thetabla   = document.createElement("table");
    var mitblBody = document.createElement("tbody");
    for (var i = 0; i < 10; i++) {
    
      var mihilera = document.createElement("tr");
   
      for (var j = 0; j < 10; j++) {
       
        var micelda = document.createElement("td");
    
        mihilera.appendChild(micelda);
        micelda.className += "micasilla";
        micelda.id = "micelda"+i+j;
        
        
      }
      mitblBody.appendChild(mihilera);
      
    }
    thetabla.appendChild(mitblBody);
    mitabla.appendChild(thetabla);
}

function draganddrop(){
     
  
      var  miscasillas = document.querySelectorAll(".micasilla"); 
      var barco = document.querySelectorAll("img");

      for (i = 0; i < barco.length; i++) {
        barco[i].addEventListener("dragstart",empezar_arrastre,false);
          
      }


    
   [].forEach.call(miscasillas,function(item){

       item.addEventListener("dragenter",function(e){
           e.preventDefault();
       },false);

       item.addEventListener("dragover",function(e){
           e.preventDefault();
       },false);
   
       item.addEventListener("drop",soltar,false);
   },false);


   function empezar_arrastre(e){
        

       e.dataTransfer.setData("imatge",e.target.id);
   }

   function soltar(e){
       e.preventDefault();
       data= e.dataTransfer.getData("imatge");

       if (this.childNodes.length < 1) {
           e.target.appendChild(document.getElementById(data));
          
        if(data == "barco21"|| data=="barco23"|| data=="barco22"){
            
         
            var row1 = e.target.id.substring(7, 8);
            var col1 = e.target.id.substring(8, 9);
            var next_col = parseInt(col1)+1;
           
            
            var next_casilla_id = e.target.id.replace(col1,next_col);

         
            var casilla_next = document.getElementById(next_casilla_id);
           casilla_next.appendChild(document.getElementById(data).cloneNode(true));
           var rowcasilla = casilla_next.id.substring(7, 8);

           var colcasilla = casilla_next.id.substring(8, 9);
           
        
          
           tablero_mio[rowcasilla][colcasilla] = 1;
        }
    else if(data =="barco31" || data == "barco32"){

   
        var row1 = e.target.id.substring(7, 8);
        var col1 = e.target.id.substring(8, 9);
        var next_col = parseInt(col1)+1;
        var next_col2 = parseInt(col1)+2;
      
        
        var next_casilla_id = e.target.id.replace(col1,next_col);
        var next_casilla_id2 = e.target.id.replace(col1,next_col2);
       
        var casilla_next = document.getElementById(next_casilla_id);
        var casilla_next2 = document.getElementById(next_casilla_id2);
       casilla_next.appendChild(document.getElementById(data).cloneNode(true));
       casilla_next2.appendChild(document.getElementById(data).cloneNode(true));
       var rowcasilla = casilla_next.id.substring(7, 8);

       var colcasilla = casilla_next.id.substring(8, 9);
       var rowcasilla2 = casilla_next2.id.substring(7, 8);

       var colcasilla2 = casilla_next2.id.substring(8, 9);
      
       tablero_mio[rowcasilla][colcasilla] = 1;
       tablero_mio[rowcasilla2][colcasilla2] = 1;
    }
    else if(data =="barco4"){
       
        var row1 = e.target.id.substring(7, 8);
        var col1 = e.target.id.substring(8, 9);
        var next_col = parseInt(col1)+1;
        var next_col2 = parseInt(col1)+2;
        var next_col3 = parseInt(col1)+3;
       
        
        var next_casilla_id = e.target.id.replace(col1,next_col);
        var next_casilla_id2 = e.target.id.replace(col1,next_col2);
        var next_casilla_id3 = e.target.id.replace(col1,next_col3);
     
        var casilla_next = document.getElementById(next_casilla_id);
        var casilla_next2 = document.getElementById(next_casilla_id2);
        var casilla_next3 = document.getElementById(next_casilla_id3);
       casilla_next.appendChild(document.getElementById(data).cloneNode(true));
       casilla_next2.appendChild(document.getElementById(data).cloneNode(true));
       casilla_next3.appendChild(document.getElementById(data).cloneNode(true));
       var rowcasilla = casilla_next.id.substring(7, 8);

       var colcasilla = casilla_next.id.substring(8, 9);
       var rowcasilla2 = casilla_next2.id.substring(7, 8);

       var colcasilla2 = casilla_next2.id.substring(8, 9);
       var rowcasilla3 = casilla_next3.id.substring(7, 8);

       var colcasilla3 = casilla_next3.id.substring(8, 9);
      
      
       tablero_mio[rowcasilla][colcasilla] = 1;
       tablero_mio[rowcasilla2][colcasilla2] = 1;
       tablero_mio[rowcasilla3][colcasilla3] = 1;

    }
    
           var row = e.target.id.substring(7, 8);

           var col = e.target.id.substring(8, 9);
            
          
           tablero_mio[row][col] = 1;
         
           barcomovido++;
           
       }

   }
}


function aleatorio_enemigo() {
    var barcos_size = [];
    for (var z = 0; z < ships.length; z++) {

        barcos_size.push(ships[z].size);

    }
   
    var horizontal_vertical = ["1", "2"];
    var i = 0;
    while (i < barcos_size.length) {


        x = Math.floor(Math.random() * 7);
        y = Math.floor(Math.random() * 7);
       
        if (tablaIA[x][y] == 0) {
            var numhorizontal = Math.floor(Math.random() * horizontal_vertical.length);


            var aleatorio = Math.floor(Math.random() * 6);
         
            if (horizontal_vertical[numhorizontal] == "1") {

                if (barcos_size[aleatorio] == "1") {

                    tablaIA[x][y] = 2;


                }
                else if (barcos_size[aleatorio] == "2") {

                    tablaIA[x][y] = 2;
                    tablaIA[x + 1][y] = 2;

                }
                else if (barcos_size[aleatorio] == "3") {

                    tablaIA[x][y] = 2;
                    tablaIA[x + 1][y] = 2;
                    tablaIA[x + 2][y] = 2;

                }
                else if (barcos_size[aleatorio] == "4") {

                    tablaIA[x][y] = 2;
                    tablaIA[x + 1][y] = 2;
                    tablaIA[x + 2][y] = 2;
                    tablaIA[x + 3][y] = 2;

                }

            }
            else if (horizontal_vertical[numhorizontal] == "2") {
                if (barcos_size[aleatorio] == 2) {

                    tablaIA[x][y] = 2;

                }
                else if (barcos_size[aleatorio] == "2") {

                    tablaIA[x][y] = 2;
                    tablaIA[x][y + 1] = 2;

                }
                else if (barcos_size[aleatorio] == "3") {

                    tablaIA[x][y] = 2;
                    tablaIA[x][y + 1] = 2;
                    tablaIA[x][y + 2] = 2;

                }
                else if (barcos_size[aleatorio] == "4") {

                    tablaIA[x][y] = 2;
                    tablaIA[x][y + 1] = 2;
                    tablaIA[x][y + 2] = 2;
                    tablaIA[x][y + 3] = 2;

                }
            }

            i++;

        }
    }
    console.log(tablaIA);
}


function juegocontralaIA(){
  
    

    var barco = document.querySelectorAll("img");

   request.send();
   

     var nom_jugador;

  
    var mitablero = document.getElementById("mitabla");
    var tocado_mio = 0;
        var contador = 0;


    var tablero_enemigo = document.getElementById("tableenemy");

    var tocado = 0;
    



     
      
        tablero_enemigo.addEventListener("click",disparar,false);
       
     
   

   
    
     
            
    






function disparar(e){

    var row = e.target.id.substring(10,11);

    var col = e.target.id.substring(11,12);
    
  animacio(e);
    
    document.getElementById('alertas').innerHTML = "Et toca!";

    contador++;

    
   if(tablaIA[row][col]==0){
    e.target.style.background = '#2171E3';
       animacio(e);
       document.getElementById('alertas').innerHTML = "Aigua!";
     
   }
   else if (tablaIA[row][col]==2) {
    e.target.style.background = 'red';

       e.target.className += " shake_move";
        animacio(e);
       tocado++;
       document.getElementById('alertas').innerHTML = "Tocat!";

			if (tocado == 20) {
               
                document.getElementById('alertas').innerHTML = "Guanyes!";
                tablero_enemigo.removeEventListener("click",disparar,false);
               

               



			}
       
   } else {


       document.getElementById('alertas').innerHTML = "Ya has disparat aqui!";
       
   }
  
   document.getElementById('marcador').innerHTML = tocado;
   document.getElementById('contador').innerHTML = contador;

  
    localStorage.setItem("Tocats per el jugador", tocado);
  
   dispararIA(e);
}


function dispararIA(e){

    var row = e.target.id.substring(7,8);
    var col = e.target.id.substring(8,9);
    var aleatorio = Math.floor(Math.random()*(casillas.length));
 
    
    var x_aleatorio = casillas[aleatorio].toString().substr(0,1);
    var y_aleatorio = casillas[aleatorio].toString().substr(1,2);
    
    var casillaenemy = document.getElementById("micelda"+x_aleatorio+y_aleatorio);
   if(tablero_mio[x_aleatorio][y_aleatorio]==0){
    casillaenemy.style.background = '#2171E3';
   
    
   }
   else if (tablero_mio[x_aleatorio][y_aleatorio]==1) {
   casillaenemy.style.background = 'red';
    
       casillaenemy.className += " shake_move";
       tocado_mio++;
       

			if (tocado_mio == 20) {

                document.getElementById('alertas').innerHTML = "Has Perdut";
                tablero_enemigo.removeEventListener("click",dispararIA,false);
                tablero_enemigo.removeEventListener("click",disparar,false);
			}
       
   } else {
  
       
   }
   casillas.splice(aleatorio,1);
   localStorage.setItem("Tocats per la IA", tocado_mio);

   document.getElementById('marcador').innerHTML = tocado+tocado_mio;
   document.getElementById('contador').innerHTML = contador;

   
}

console.log(tablero_mio);



    

}






function emmagatzematge(){
    
    window.indexedDB = window.indexedDB || window.mozIndexedDB ||
        window.webkitIndexedDB || window.msIndexedDB;

    window.IDBTransaction = window.IDBTransaction ||
        window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange ||
        window.msIDBKeyRange

    if (!window.indexedDB) {
        window.alert("El teu navegador no funciona amb IndexedDB.")
    }

    const datosBarcos = [{
        nombre: "Fragata",
        size: "1"
    }, {
        nombre: "Submarino",
        size: "2"
    },
    {
        nombre: "Destructor",
        size: "3"
    },
    {
        nombre: "Portaaviones",
        size: "4"
    }];
    var db;
    var request = window.indexedDB.open("Battleship", 1);

    request.onerror = function (event) {
        console.log("error: ");
    };

    request.onsuccess = function (event) {
        db = request.result;
        console.log("success: " + db);
    };

    request.onupgradeneeded = function (event) {
        var db = event.target.result;
        var objectStore = db.createObjectStore("barco", { keyPath: "nombre" });

        for (var i in datosBarcos) {
            objectStore.add(datosBarcos[i]);
        }
    }


}






window.addEventListener("load",start,false);