let receita = {
    'nome': '',
    'fotoSrc': '',
    'tempoPreparo': 0,
    'numeroPorcao': 0,
    'categoria': '',
    'ingredientes': '',
    'modoPreparo': '',
    'setDados': function (nome, fotoSrc, tempoPreparo, numeroPorcao, categoria, ingredientes, modoPreparo) {
        this.nome = nome;
        this.fotoSrc = fotoSrc;
        this.tempoPreparo = tempoPreparo;
        this.numeroPorcao = numeroPorcao;
        this.categoria = categoria;
        this.ingredientes = ingredientes;
        this.modoPreparo = modoPreparo;
    }
};
let idReceita = 0;
let receitas = [];

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

    criarMock();
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

function inserirReceita() {
    let novaReceita = { ...receita };

    novaReceita.setDados(
        document.getElementById('nome-receita').value,
        document.getElementById('img-resultado').src,
        document.getElementById('tempo-preparo').value,
        document.getElementById('porcao-receita').value,
        document.getElementById('categoria').value,
        document.getElementById('ingredientes').value,
        document.getElementById('preparo').value);

    receitas.push(novaReceita);

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
    cardFora.classList.add('col', 'mb-4', 'card-receita');
    cardFora.setAttribute('id-receita', idReceita);
    cardFora.setAttribute('onclick', `visualizarReceita(${idReceita})`)

    let cardDentro = document.createElement('div');
    cardDentro.classList.add('card');

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'text-center', 'p-2');

    document.getElementById('card-receita').appendChild(cardFora);

    cardFora.append(cardDentro);
    cardDentro.append(cardBody);
}

function criarCardImagem() {
    let cardImagem = document.createElement('img');
    let imagem = receitas[idReceita].fotoSrc;

    cardImagem.classList.add('card-img-top');
    cardImagem.setAttribute('src', imagem);
    cardImagem.append(imagem);

    let card = document.querySelector(`div[id-receita='${idReceita}'] .card`)
    card.appendChild(cardImagem);

    card.insertBefore(cardImagem, card.childNodes[0]);
}

function criarCardCategoria() {
    let cardCategoria = document.createElement('p');
    let categoria = receitas[idReceita].categoria;

    cardCategoria.classList.add('mb-1', 'font-weight-light', 'text-black-50', 'border-bottom', 'border-warning', 'ml-4', 'mr-4');
    cardCategoria.append(categoria);

    let card = document.querySelector(`div[id-receita='${idReceita}'] > div > .card-body`);
    card.appendChild(cardCategoria);

    card.insertBefore(cardCategoria, card.childNodes[0]);

}

function criarCardTitulo() {
    let cardTitulo = document.createElement('h4');
    let titulo = receitas[idReceita].nome;

    cardTitulo.classList.add('text-uppercase', 'm-2');
    cardTitulo.append(titulo);
    document.querySelector(`div[id-receita='${idReceita}'] > div > .card-body`).appendChild(cardTitulo)

}

function criarCardTempo() {
    let tempoPreparo = receitas[idReceita].tempoPreparo;
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
    let porcaoReceita = receitas[idReceita].numeroPorcao;
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
function visualizarReceita(idReceita) {
    let receita = receitas[idReceita];
    document.getElementById('visualizar-imagem').src = receita.fotoSrc;
    document.getElementById('visualizar-nome-receita').innerText = receita.nome;
    document.getElementById('visualizar-categoria').innerHTML =
         `<i class='fas fa-bars text-warning'></i> ${receita.categoria}`;
    document.getElementById('visualizar-tempo').innerHTML = 
         `<i class="fas fa-clock text-warning"></i> ${receita.tempoPreparo} Minutos`;
    document.getElementById('visualizar-porcao').innerHTML = 
          `<i class="fas fa-concierge-bell text-warning"></i> ${receita.numeroPorcao} Porções`;
    document.getElementById('visualizar-ingredientes').innerText = receita.ingredientes;
    document.getElementById('visualizar-preparo').innerText = receita.modoPreparo;


    $('#visualizarModal').modal('show');
}

function criarMock() {
    for (let i = 0; i < 10; i++) {
        document.getElementById('nome-receita').value = `Bolo ${i}`,
            document.getElementById('img-resultado').src = './images/bolo-de-cenoura.jpeg',
            document.getElementById('tempo-preparo').value = 30 + i,
            document.getElementById('porcao-receita').value = 5 + i,
            document.getElementById('categoria').value = 'Bolos',
            document.getElementById('ingredientes').value = `
            - 1/2 xícara (chá) de óleo
            - 3 cenouras médias raladas
            - 4 ovos
            - 2 xícaras (chá) de açúcar
            - 2 e 1/2 xícaras (chá) de farinha de trigo
            - 1 colher (sopa) de fermento em pó`,
            document.getElementById('preparo').value = `
            - Em um liquidificador, adicione a cenoura, os ovos e o óleo, depois misture.
            - Acrescente o açúcar e bata novamente por 5 minutos.
            - Em uma tigela ou na batedeira, adicione a farinha de trigo e depois misture novamente.
            - Acrescente o fermento e misture lentamente com uma colher.
            - Asse em um forno preaquecido a 180° C por aproximadamente 40 minutos.`,
            inserirReceita();
    }
}