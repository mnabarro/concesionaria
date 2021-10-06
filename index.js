/* requerir módulo autos */
let autos = require('./autos.js');

let comprador = {
nombre: 'Juan',
capacidadDePagoEnCuotas: 20000,
capacidadDePagoTotal: 100000
}

let concesionaria = {
   autos: autos,

   buscarAuto: function (patente) {
     let res = null;
     
     for (let i = 0; i<autos.length; i++) {
       if (autos[i].patente == patente) {
        res = autos[i];
       }
      }
      return res;
     }, 

   venderAuto : function (patente) {
      let auto = this.buscarAuto(patente);
      if(  auto ) {
         auto.vendido=true;
      }
   },

   autosParaLaVenta : function () {
    return autos.filter( e => e.vendido == false);
  },   
   
  autosNuevos : function () {
    autos0KM = this.autosParaLaVenta();
    return autos0KM.filter(e => e.km < 100);
  } ,

  listaDeVentas : function () {
    let vendidos = autos.filter(a => a.vendido == true );
      return vendidos.map(a => a.precio );
  } ,

    totalDeVentas : function () {
    let ventas = this.listaDeVentas();
    if( ventas.length > 0) {
    return ventas.reduce( (ant, actual) => ant + actual); 
    } else {
      return 0;
    }
  },

  puedeComprar : function (auto, persona) {
    return (auto.precio <= persona.capacidadDePagoTotal) && ( (auto.precio / auto.cuotas) <= persona.capacidadDePagoEnCuotas)
  } ,

  autosQuePuedeComprar : function ( persona ) {
    let enVenta = this.autosParaLaVenta();
    
    return enVenta.filter(auto => this.puedeComprar(auto, persona));
  }      
}

console.log(concesionaria.autosQuePuedeComprar(comprador));