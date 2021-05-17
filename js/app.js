const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciasCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCusrsos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListener();
function cargarEventListener(){
    // Cuando agregas un curso presionando "Agregar al carrito"
    listaCusrsos.addEventListener('click',agregarCurso)
    carrito.addEventListener('click', eliminarCurso)

    //Muestra los cursos de Local Storage
    carrito.addEventListener('DOMContentLoaded', () =>{
        articulosCarrito = JSON.parse( localStorage.getItem('carrito') || [])

        CarritoHTML();
    })

    vaciasCarritoBtn.addEventListener('click', () => {
         articulosCarrito = [];

         limpiarHTML(); //eliminamos todo el html 
    });

    
}


//FUNCIONES

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
     const cusrsoSeleccionado = e.target.parentElement.parentElement;

        leerDatos(cusrsoSeleccionado);

    }
 }



 // Eliminar curso 
 function eliminarCurso(e){
  if (e.target.classList.contains('borrar-curso')) {
      const cursoId = e.target.getAttribute('data-id');

      articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId) ;

      CarritoHTML(); // Iterar sobre el carrito y mostrar su html
  }
 }

//  Lee la informacion del HTML y extrae la informacion del curso

function leerDatos(curso){
// console.log(curso);

// objeto

const infoCurso = { 
      imagen: curso.querySelector('img').src,
      titulo: curso.querySelector('h4').textContent,
      precio: curso.querySelector('span').textContent,
      id: curso.querySelector('a').getAttribute('data-id'),
      cantidad: 1
}


// Revisa si un elemento ya esta en el carrito

const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
if(existe){
   curso = articulosCarrito.map(curso=>{
       if (curso.id === infoCurso.id) {
           curso.cantidad++;
           return curso; //returna el objeto actualizado
       }else{
           return curso; // retorna los objetos que no son duplicados
       }
   });

articulosCarrito = [...curso];

}else{
    //agregar elementos al carrito
   articulosCarrito = [...articulosCarrito,infoCurso]; 
}

console.log(articulosCarrito)

CarritoHTML();
}

//Muestra los curso en el HTML
function CarritoHTML(){


    //  Limpiar el Html
    limpiarHTML();


    //Recorre el carrito 
    articulosCarrito.forEach( curso =>{
    const {imagen, titulo, precio, cantidad,id} = curso;
    const row = document.createElement('tr');
    row.innerHTML = `
     <td><img src = "${imagen}" width = "80"></td>
     <td>${titulo}</td>
     <td>${precio}</td>
     <td>${cantidad}</td>
     <td> <a href='#' class="borrar-curso" data-id="${id}"> X </td>  </a>
     `;
    // Agrega el HTML del carrito en el Tbody 
    contenedorCarrito.appendChild(row);
    });


    // Agregar el carrito de compras al LocalStorage

    sicronizarStorage();
}

function  sicronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}



//Eliminar los cursos

function limpiarHTML(){
    //forma lenta de limpiar html
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
         contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}



