
function criarCard() {
    let divPrincipal = document.createElement('div');
    divPrincipal.classList.add('col', 'mb-4');
    divPrincipal.setAttribute('id-receita', idReceita);
    divPrincipal.setAttribute('onclick', `visualizarReceita(${idReceita})`)

    let divImagem = document.createElement('div');
    divImagem.classList.add('card');

    let divConteudo = document.createElement('div');
    divConteudo.classList.add('card-body', 'text-center', 'p-2');

    document.getElementById('card-receita').appendChild(divPrincipal);

    divPrincipal.append(divImagem);
    divImagem.append(divConteudo);
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

    cardCategoria.classList.add('mb-1','mx-4', 'text-black-50', 'border-bottom', 'border-warning');
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
    cardTempo.innerHTML = `<i class="fas fa-clock text-warning pr-2"></i>`;

    tempoPreparo = `${tempoPreparo} Min`;

    cardTempo.append(tempoPreparo);
    document.querySelector(`div[id-receita='${idReceita}'] > div > .card-body`).appendChild(cardTempo);
}

function criarCardPorções() {
    let porcaoReceita = receitas[idReceita].numeroPorcao;
    let cardPorcao = document.createElement('span');
    cardPorcao.innerHTML = `<i class="fas fa-concierge-bell pl-4 text-warning pr-2"></i>`;

    porcaoReceita = `${porcaoReceita} Porções`;
    cardPorcao.append(porcaoReceita);
    document.querySelector(`div[id-receita='${idReceita}'] > div > .card-body`).appendChild(cardPorcao);
}