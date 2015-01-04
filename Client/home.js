var expandidos = [];
var t = document.getElementsByName("desc");

var botao = document.getElementsByName("botao_detalhes");

for(var j = 0; j < botao.length; j++){
    expandidos[j]=false;
}


for(var i = 0; i < botao.length; i++){
    adiciona(i);
}

function adiciona(n){
 botao[n].addEventListener("click", function(){ expandir_retrair(n); });
 }


function expandir_retrair(n){
    if(expandidos[n] == true){ // Se está expandido, retrair
        
        t[n].className = "desc retraido";
        botao[n].innerHTML = "+"; // Alterar o símbolo do botão
    }
    else{ // Se está retraído, expandir
        
        t[n].className = "desc expandido";
        botao[n].innerHTML = "-"; // Alterar o símbolo do botão
    }
    expandidos[n] = !expandidos[n]; // Alterna o estado
    
}

// -- Logout --

var logout = document.getElementById("logout");
logout.addEventListener("click", function(){ alert("Até breve!"); });


// -- Exibir/editar --

// Para paper stickers
/*var popup = document.getElementsByName("paper_sticker");

for(var i = 0; i < popup.length; i++){
    adiciona2(i, popup);
}*/


// Para elementos contidos na agenda:

var editar = document.getElementsByName("botao_editar");
for(var i = 0; i < editar.length; i++){
    adiciona2(i, editar);
}
function adiciona2(n, elem){
    elem[n].addEventListener("click", function(){ document.getElementById("editar_conteudo").className = "visivel";});
}


var excluir = document.getElementsByName("botao_excluir");
for(var i = 0; i < excluir.length; i++){
    adiciona3(i, excluir);
}
function adiciona3(n, elem){
    elem[n].addEventListener("click", function(){  alert("excluir?")});
}

// Para fechar a popup de edição:
var fecha_edicao = document.getElementById("fechar_edicao");
fecha_edicao.addEventListener("click", function(){ document.getElementById("editar_conteudo").className = "escondido"; });




/*
function httpGet(theUrl)
{
    var xmlHttp = null;
    
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
*/