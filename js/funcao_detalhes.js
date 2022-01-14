'use scrict';

var CloneMedia = $('.media').clone();

function pesquisa(){
    var resPesquisa = document.getElementById("pesquisa").value;
    var criptomoeda = resPesquisa.toLowerCase();

    console.log(criptomoeda);   
    obterMoeda(criptomoeda, detalhes);
}

function detalhes(res){
    console.log(res);
    
    console.log(res.data.name);
    console.log(res.data.market_cap_rank);
    console.log(res.data.image.large);
    console.log(res.data.description.pt);
    console.log(res.data.market_data.current_price.eur);
    console.log(res.data.market_data.ath_change_percentage.eur);


    $('.nome', CloneMedia).text("Nome: " + res.data.name);
    $('.rank', CloneMedia).text("Rank no Mercado: " + res.data.market_cap_rank);
    $('.desc', CloneMedia).html("Descrição: " + res.data.description.en);
    $('.precoAtual', CloneMedia).html("Preço Atual: " + res.data.market_data.current_price.eur);
    $('.precoChance', CloneMedia).html("Alteração do Preço Total: " + res.data.market_data.ath_change_percentage.eur);
    $('#image', CloneMedia).attr('src', res.data.image.large);
    $('.link', CloneMedia).attr('href', res.data.links.homepage[0])

    $('.media-list').replaceWith(CloneMedia);
}