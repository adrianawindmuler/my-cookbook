function onLoad() {
    $("#receitaModal").on('show.bs.modal', function () {
        document.querySelector('.custom-file-label').innerText = "Insira uma foto";
        document.getElementById('categoria').value = "";
        document.getElementById('nome-receita').value = "";
        document.getElementById('tempo-preparo').value = "";
        document.getElementById('porcao-receita').value = "";
        document.getElementById('ingredientes').value = "";
        document.getElementById('preparo').value = "";
    });

    $("#receitaModal").on('shown.bs.modal', function () {
        document.getElementById('nome-receita').focus();
    });

    $('.needs-validation').on('submit', function (event) {
        validarForm(event);
    });

    $('.needs-validation').find('input,select,textarea').on('focusout', function () {
        $(this).removeClass('is-valid is-invalid');
        $(this).addClass(this.checkValidity() ? 'is-valid' : 'is-invalid');
    });
};

function validarForm(event) {
    event.preventDefault();
    event.stopPropagation();

    let form = event.target;

    if (form.checkValidity()) {
        $('#receitaModal').modal('hide');
        inserirReceita();
    }

    form.classList.add('was-validated');
}

var idReceita = 1;
function inserirReceita() {
    criarCard();
    criarCardImagem();
    criarCardCategoria();
    criarCardTitulo();
    criarCardTempo();
    criarCardPorções();

    idReceita++;
}

function criarCard() {
    let cardFora = document.createElement('div');
    cardFora.classList.add('col', 'mb-4');
    cardFora.setAttribute('id-receita', idReceita);

    let cardDentro = document.createElement('div');
    cardDentro.classList.add('card');
    cardDentro.addEventListener('click', visualizarReceita());

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'text-center', 'p-2');

    document.getElementById('card-receita').appendChild(cardFora);

    cardFora.append(cardDentro);
    cardDentro.append(cardBody);
}

function criarCardImagem() {
    let cardImagem = document.createElement('img')
    let imagem = document.getElementById('img-resultado').src;

    cardImagem.classList.add('card-img-top');
    cardImagem.setAttribute('src', imagem);
    cardImagem.append(imagem);

    let card = document.querySelector(`div[id-receita='${idReceita}'] .card`)
    card.appendChild(cardImagem);

    card.insertBefore(cardImagem, card.childNodes[0]);

}

function criarCardCategoria() {
    let cardCategoria = document.createElement('p');
    let categoria = document.getElementById('categoria').value;

    cardCategoria.classList.add('mb-1', 'font-weight-light', 'text-black-50', 'border-bottom', 'border-warning', 'ml-4', 'mr-4');
    cardCategoria.append(categoria);

    let card = document.querySelector(`div[id-receita='${idReceita}'] > div > .card-body`);
    card.appendChild(cardCategoria);

    card.insertBefore(cardCategoria, card.childNodes[0]);

}

function criarCardTitulo() {
    let cardTitulo = document.createElement('h4');
    let titulo = document.getElementById('nome-receita').value;

    cardTitulo.classList.add('text-uppercase', 'm-2');
    cardTitulo.append(titulo);
    document.querySelector(`div[id-receita='${idReceita}'] > div > .card-body`).appendChild(cardTitulo)

}

function criarCardTempo() {
    let tempoPreparo = document.getElementById('tempo-preparo').value;
    let cardTempo = document.createElement('span');
    let icone = document.createElement('i');

    tempoPreparo = `${tempoPreparo} Min`; // tempoPrerapo + 'Min'

    icone.classList.add('fas', 'fa-clock', 'text-warning', 'pr-2');
    cardTempo.append(tempoPreparo);
    cardTempo.append(icone);
    document.querySelector(`div[id-receita='${idReceita}'] > div > .card-body`).appendChild(cardTempo);

    cardTempo.insertBefore(icone, cardTempo.childNodes[0]);
}

function criarCardPorções() {
    let porcaoReceita = document.getElementById('porcao-receita').value;
    let cardPorcao = document.createElement('span');
    let icone = document.createElement('i');

    porcaoReceita = `${porcaoReceita} Porções`; // tempoPrerapo + 'Min'

    icone.classList.add('fas', 'fa-concierge-bell', 'pl-4', 'text-warning', 'pr-2');
    cardPorcao.append(porcaoReceita);
    cardPorcao.append(icone);
    document.querySelector(`div[id-receita='${idReceita}'] > div > .card-body`).appendChild(cardPorcao);

    cardPorcao.insertBefore(icone, cardPorcao.childNodes[0]);
}

function carregarImagem(event) {
    let input = event.target;
    let reader = new FileReader();

    reader.onload = function () {
        let imgResultado = document.getElementById('img-resultado');
        imgResultado.src = reader.result;
    };
    reader.readAsDataURL(input.files[0]);

    document.querySelector('.custom-file-label').innerText = input.files[0].name;
};

// visualizar receita
function visualizarReceita(){
    
}