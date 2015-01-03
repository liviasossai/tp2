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
    console.log(n);
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