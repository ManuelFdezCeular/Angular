// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  jsonEqual: function(a, b){
    return JSON.stringify(a) === JSON.stringify(b);
  },

  SeleccionaObj: function(lista, obj){
    let res;
    lista.forEach(valor => {
      if(environment.jsonEqual(valor, obj))
        res = valor;
    });
    return res;
  },

  SeleccionaArrObj: function(lista:Array<Object>, listaSeleccionada:Array<Object>){
    let res = new Array();
    listaSeleccionada.forEach(element => {
      lista.forEach(valor => {
        if(environment.jsonEqual(valor, element))
          res.push(valor);
      });
    });
    return res;
  }

};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
