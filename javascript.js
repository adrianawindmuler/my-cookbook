function onLoad() {
    $("#receitaModal").on('show.bs.modal', function () {
        document.getElementById('nome-receita').value = "";
            
    });
    $("#receitaModal").on('shown.bs.modal', function () {
        document.getElementById('nome-receita').focus();
    });
};

var idReceita = 1;
function inserirReceita() {
    criarCard();
    criarImagem();
    criarCardTitulo();


    idReceita++;
}

function criarCard() {
    let cardFora = document.createElement('div');
    cardFora.classList.add('col', 'mb-4');
    cardFora.setAttribute('id-receita', idReceita);

    let cardDentro = document.createElement('div');
    cardDentro.classList.add('card');

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'text-center');

    document.getElementById('card-receita').appendChild(cardFora);

    cardFora.append(cardDentro);
    cardDentro.append(cardBody);

}

function criarImagem() {
    let cardImagem = document.createElement('img')
    let imagem = document.getElementById('img-resultado').src;
    
    cardImagem.classList.add('card-img-top');
    cardImagem.setAttribute('src', imagem);
    cardImagem.append(imagem);
    
    let card =  document.querySelector(`div[id-receita='${idReceita}'] .card`)
    card.appendChild(cardImagem);
    
    card.insertBefore(cardImagem, card.childNodes[0]);

}

function criarCardTitulo() {
    let cardTitulo = document.createElement('h2');
    let titulo = document.getElementById('nome-receita').value;
    cardTitulo.append(titulo);
    document.querySelector(`div[id-receita='${idReceita}'] > div > .card-body`).appendChild(cardTitulo)

}


function carregarImagem(event) {
    let input = event.target;

    let reader = new FileReader();

    reader.onload = function () {
        let imgResultado = document.getElementById('img-resultado');
        imgResultado.src = reader.result;
    };

    reader.readAsDataURL(input.files[0]);
};
