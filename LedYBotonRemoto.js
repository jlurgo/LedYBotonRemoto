var main = function(){
    var btn_prender = $("#btn_prender");
    var btn_apagar = $("#btn_apagar");
    var led = $("#led");
    
    DivConsola.start();
    var abrirPuertoSerie = function(){
		serial.open ({baudRate: 115200},
			function(successMessage) {
				console.log("puerto serie abierto:", successMessage);
				
                btn_prender.click(function(){
                    serial.write(
						"1",
						function(successMessage) {
							console.log(successMessage);
						},
						function(err){
							console.log("error al enviar por puerto serie:", err);
						}
					);	
                });
                
                btn_apagar.click(function(){
                    serial.write(
						"0",
						function(successMessage) {
							console.log(successMessage);
						},
						function(err){
							console.log("error al enviar por puerto serie:", err);
						}
					);	
                });
			
				serial.registerReadCallback(
					function(data){
						var view = new Uint8Array(data);
						var recibido = String.fromCharCode.apply(null, view);
						if(recibido == "1") led.addClass("encendido");
                        if(recibido == "0") led.removeClass("encendido");
					},
					function(err){
						console.log("error al registrar callback:", err);
					}
				);
			},
			function(err){
				console.log("error al abrir puerto serie:", err);
			}
		);
	};
	
	serial.requestPermission(
		 function(successMessage) {
			console.log("permiso concedido para usar puerto serie:", successMessage);
			serial.close(function(){
				console.log("puerto serie cerrado");
				abrirPuertoSerie();
			}, function(err){
				console.log("error al cerrar puerto serie");
				abrirPuertoSerie();
			});
		},
		function(err){
			console.log("error al pedir permiso para usar puerto serie:", err);
		}
	); 
    
};


$(document).ready(function() {  
    //toda esta garcha es para detectar si la aplicacion esta corriendo en un celular o en una pc.
    //En el celular para arrancar la app hay que esperar al evento deviceReady, en la pc solo al documentReady
    window.isphone = false;
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        window.isphone = true;
    }

    if(window.isphone) {
        document.addEventListener("deviceready", main, false);
    } else {
        main();
    }
});