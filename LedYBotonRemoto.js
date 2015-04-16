var main = function(){
    var btn_prender = $("#btn_prender");
    var btn_apagar = $("#btn_apagar");
    var led = $("#led");
    
    btn_prender.click(function(){
        led.addClass("encendido");
    });
    
    btn_apagar.click(function(){
        led.removeClass("encendido");
    });
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