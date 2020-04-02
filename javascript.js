function carregarImagem(event) {
    let input = event.target;

    let reader = new FileReader();
    
    reader.onload = function(){
        let imgResultado = document.getElementById('img-resultado');
        imgResultado.src = reader.result;
    };

    reader.readAsDataURL(input.files[0]);
};