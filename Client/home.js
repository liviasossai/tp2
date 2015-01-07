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

var editar_atual;
var excluir_atual;

var editar = document.getElementsByName("botao_editar");
for(var i = 0; i < editar.length; i++){
    adiciona2(i, editar);
}
// Ao editar, completa os campos com os dados atuais do lembrete
function adiciona2(n, elem){
    elem[n].addEventListener("click", function(){ editar_atual = elem[n].id;
                                                  document.getElementById("editar_conteudo").className = "visivel";
                                                  document.getElementById("cont_edit").className = "visivel";
                             document.getElementById("data_edit").value = document.getElementById("data_evento_"+editar_atual).innerText;
                             document.getElementById("titulo_edit").value = document.getElementById("titulo_evento_"+editar_atual).innerText;
                             document.getElementById("lembrete_edit").value = document.getElementById("lem_evento_"+editar_atual).innerHTML;
                             });
}

// -- Excluir --
var excluir = document.getElementsByName("botao_excluir");
for(var i = 0; i < excluir.length; i++){
    adiciona3(i, excluir);
}
function adiciona3(n, elem){
    elem[n].addEventListener("click", function(){
                             excluir_atual = elem[n].id;
                             var exc = excluir_atual.substring(14, excluir_atual.length);
                             document.getElementById(exc).className = "escondido"; // Torna os dados invisíveis, mas os exclui do bd, evitando uma nova requisição

                             
                             httpPost("excluir", JSON.stringify({"id_excluir": exc}), callback_excluir);
                             });
}

// -- Para fechar a popup de edição: --
var fecha_edicao = document.getElementById("fechar_edicao");
fecha_edicao.addEventListener("click", function(){ document.getElementById("editar_conteudo").className = "escondido";
                                                   document.getElementById("cont_edit").className = "escondido";});


// -- Para enviar as modificações --

var modifica = document.getElementById("modificar");
modifica.addEventListener("click", function(){ console.log(editar_atual);
                                               document.getElementById("editar_conteudo").className = "escondido";
                                               document.getElementById("cont_edit").className = "escondido";
                          
                                              httpPost("editar", JSON.stringify({"id_editar": editar_atual,
                                                                                 "data": document.getElementById("data_edit").value,
                                                                                 "importancia": document.getElementById("importancia_edit").value,
                                                                                 "titulo": document.getElementById("titulo_edit").value,
                                                                                 "lembrete": document.getElementById("lembrete_edit").value
                                                                                 }), callback_editar);
                          
                          });



function httpPost(Url, postData, callback)
{
    var xmlHttp = null;
    
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( 'POST', Url, false );
    xmlHttp.onreadystatechange = callback;
    xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xmlHttp.send(postData);
    //return xmlHttp.responseText;
}

function callback_excluir(){
    if (this.readyState === 4) {
        if (this.status === 200) {
            console.log("lembrete excluído"); // Callback apenas para controle
        } else {
            console.log('Erro');
        }
    }
}

function callback_editar(){
    if (this.readyState === 4) {
        if (this.status === 200) {
            var str = this.responseText;
            var spt = str.indexOf("<tabela>");
            var str1 = str.substring(0, spt-1);
            var str2 = str.substring(spt+8, str.length-1);
            document.getElementById("papeis").innerHTML = str1;
            document.getElementById("tabela_agenda").innerHTML = str2;
            
            //editar = document.getElementsByName("botao_editar");
            for(var i = 0; i < editar.length; i++){
                adiciona2(i, editar);
            }
            
            //excluir = document.getElementsByName("botao_excluir");
            for(var i = 0; i < excluir.length; i++){
                adiciona3(i, excluir);
            }
            
            for(var i = 0; i < botao.length; i++){
                adiciona(i);
            }
            
        } else {
            console.log('Erro ao curtir post. Código ' +
                        'da resposta HTTP: ' + this.status);
        }
    }
}





