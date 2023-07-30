let numeroSecreto = numeroAleatorio();
let palpite = "1524";

// BOTAO PARA ENVIAR PALPITE
let botaoSallet = document.querySelector("#Enviar");

// keypress para teclado click para apertar mouse
botaoSallet.addEventListener("click", function(event){
        event.preventDefault();

        // ACESSAR FORMULARIO PELO ID RespostaUsuario
        let respostaUsuario = document.querySelector("#RespostaUsuario");
        let palpite = respostaUsuario.numero.value;  

        if(numeroValido(palpite)){

            let QtdeFixos = fixos(numeroSecreto, palpite);
            let QtdeProvaveis = provaveis(numeroSecreto, palpite);

            let linhaPFP = criarLinha(palpite, QtdeFixos, QtdeProvaveis);

            // Obtem a tabela
            let tabelaResultados = document.querySelector("#tabela-Resultado").querySelector("tbody");

            // coloca a linha dentro da tabela
            tabelaResultados.appendChild(linhaPFP);
        
            // limpar caixa de texto após enviar o palpite
            document.getElementById("palpite").value = "";

            if (QtdeFixos == 4){
                // REFRESH NA PÁGINA HTML
                alert("VOCÊ ADIVINHOU EIN! O NÚMERO REALMENTE É " + numeroSecreto);
                location.reload();
            }

        } else {
            alert("DIGITE UM NÚMERO VÁLIDO");
        }
    });

function criarLinha(palpite, QtdeFixos, QtdeProvaveis){

    // cria a linha da tabela
    let linhaPFP = document.createElement("tr");

    // cria as celulas colunas da tabela
    let celulaPalpite = document.createElement("td");
    let celulaFixos = document.createElement("td");
    let celulaProvaveis = document.createElement("td");

    // Adicionar conteudo a celula
    celulaPalpite.textContent = palpite;
    celulaFixos.textContent = QtdeFixos;
    celulaProvaveis.textContent = QtdeProvaveis;

    //  coloca as celulas dentro da linha
    linhaPFP.appendChild(celulaPalpite);
    linhaPFP.appendChild(celulaFixos);
    linhaPFP.appendChild(celulaProvaveis);

    return linhaPFP;
}

function numeroAleatorio(){

    digitos = ["0", "1", "2","3", "4", "5", "6", "7", "8", "9"];

    let indice = gerarIndiceValido(digitos);
    const digito1 = digitos[indice];
    digitos.splice(indice,1);

    indice = gerarIndiceValido(digitos);
    const digito2 = digitos[indice];
    digitos.splice(indice, 1);

    indice = gerarIndiceValido(digitos);
    const digito3 = digitos[indice];
    digitos.splice(indice,1);

    indice = gerarIndiceValido(digitos);
    const digito4 = digitos[indice];
    digitos.splice(indice, 1);

    return digito1 + digito2 + digito3 + digito4;
}

function gerarIndiceValido(array){
    let min = 0;
    let max = array.length-1;
    let indiceValido = Math.floor(Math.random()*(max-min+1)) + min;
    return indiceValido;
}

function numeroValido(numero) {
    let numeroValido = true;
    let digitosPermitidos = ["0","1","2","3","4","5","6","7","8","9"];
    for (let x = 0; x < 4; x++){
        for (let y = 0; y < 4; y++){
           if (x !== y){
             if (numero[x] == numero[y] || numero.length !== 4 || digitosPermitidos.includes(numero[x]) !== true){
                numeroValido = false;
                }                
           }
        }
    }
    return numeroValido;
}

function fixos(numero, palpite) {

    let qtdeFixos = 0;
    for (let i = 0; i < 4; i++) {

        if (numero[i] == palpite [i]){
            qtdeFixos++;
        }
    } 
    return qtdeFixos;
}

function provaveis(numero, palpite){
    let qtdeProvaveis = 0;
    for (let x = 0; x < 4; x++) {

    for (let y = 0; y < 4; y++){

        if (numero[x] !== palpite[x] && numero[x] == palpite[y]){
                qtdeProvaveis++;       
            }

       }
    }
    return qtdeProvaveis;
} 