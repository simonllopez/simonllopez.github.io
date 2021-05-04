

function mostrar() {
    document.getElementById("sidebar").style.width = "300px";
    // document.getElementById("contenido").style.marginLeft = "300px";

}

function ocultar() {
    document.getElementById("sidebar").style.width = "0";
    // document.getElementById("contenido").style.marginLeft = "0";

}

function mostrar2() {
    document.getElementById("sidebar2").style.width = "300px";
    // document.getElementById("contenido").style.marginLeft = "300px";

}

function ocultar2() {
    document.getElementById("sidebar2").style.width = "0";
    // document.getElementById("contenido").style.marginLeft = "0";

}




function fn(val)
{
    mostrar()
    ocultar2()
}


function fn2(val)
{
    mostrar2()
    ocultar()

}

function oc()
{
    ocultar()
    ocultar2()
}