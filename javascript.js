let receita = {
    'id': 0,
    'nome': '',
    'fotoSrc': '',
    'tempoPreparo': 0,
    'numeroPorcao': 0,
    'categoria': '',
    'ingredientes': '',
    'modoPreparo': '',
    'setDados': function (nome, fotoSrc, tempoPreparo, numeroPorcao, categoria, ingredientes, modoPreparo) {
        this.id = idReceita;
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
        document.querySelector('.custom-file-label').innerHTML = "Insira uma foto";
        document.querySelector('#img-resultado').src = "";
        document.getElementById('categoria').value = "";
        document.getElementById('nome-receita').value = "";
        document.getElementById('tempo-preparo').value = "";
        document.getElementById('numero-porcao').value = "";
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
        enviarReceita();
    }

    form.classList.add('was-validated');
}

function enviarReceita() {
    let novaReceita = { ...receita };

    novaReceita.setDados(
        document.getElementById('nome-receita').value,
        document.getElementById('img-resultado').src,
        document.getElementById('tempo-preparo').value,
        document.getElementById('numero-porcao').value,
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
};

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
    let findIdReceita = receitas.find(x => x.id == idReceita);
    let index = receitas.indexOf(findIdReceita);
    let receita = receitas[index];

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
    document.getElementById('hid-receita').value = idReceita;

    $('#visualizarModal').modal('show');
}

//Excluir receita
function excluirReceita() {
    let idReceita = document.getElementById('hid-receita').value
    let receita = receitas.find(x => x.id == idReceita)
    let index = receitas.indexOf(receita);

    if (confirm('Tem certeza de deseja excluir a receita?')) {
        receitas.splice(index, 1)
        $('#visualizarModal').modal('hide');
        $(`div[id-receita='${idReceita}'`).fadeOut('slow').remove();
    };

};

function criarMock() {
    for (let i = 0; i < 10; i++) {
            document.getElementById('nome-receita').value = `Bolo ${i}`,
            document.getElementById('img-resultado').src = './images/bolo-de-cenoura.jpeg',
            document.getElementById('tempo-preparo').value = 30 + i,
            document.getElementById('numero-porcao').value = 5 + i,
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
            enviarReceita();
    }
}