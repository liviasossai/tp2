var login = document.getElementById("log");
login.addEventListener("click", function(){ // Obs.: Encontrar uma maneira mais segura de enviar a senha
                       httpPost("login", JSON.stringify({"username": document.getElementById("username").value,
                                          "password": document.getElementById("password").value}), callback_login);
                                    });




var login = document.getElementById("reg");
login.addEventListener("click", function(){ // Obs.: Encontrar uma maneira mais segura de enviar a senha
                       
                       
    if((document.getElementById("password_reg").value == document.getElementById("password2_reg").value) && document.getElementById("password2_reg").value.length >= 6){
                       httpPost("registrar", JSON.stringify({"username": document.getElementById("username_reg").value,
                                                        "password": document.getElementById("password_reg").value}), callback_registrar);
                       
                       }
                       else if(document.getElementById("password_reg").value != document.getElementById("password2_reg").value){
                       document.getElementById("mes_erro_reg").innerText = "As senhas inseridas não conferem";
                       }

                        else if((document.getElementById("password_reg").value == document.getElementById("password2_reg").value) && document.getElementById("password2_reg").value.length < 6){
                        document.getElementById("mes_erro_reg").innerText = "A senha deve conter mais do que 6 caracteres";
                        }

                       
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

function callback_login(){
    
    if(this.responseText == "Unauthorized"){
        document.getElementById("mes_erro").innerText = "Usuário ou senha incorretos";
    }
    else{
    document.write(this.responseText);
    }

}


function callback_registrar(){
    
    if(this.responseText == "Unauthorized"){
        document.getElementById("mes_erro").innerText = "Usuário ou senha incorretos";
    }
    else{
        document.write(this.responseText);
    }
    
}

function callback_registrar(){
    
    if(this.responseText == "Unauthorized"){
        document.getElementById("mes_erro_reg").innerText = "Usuário já existe";
    }
    else{
        document.write(this.responseText);
    }
    
}
