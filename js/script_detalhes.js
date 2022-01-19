'use scrict';

$(document).ready(function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const idPesquisa = urlParams.get('id')

    pesquisa(idPesquisa);
}); 

function pesquisa(id){
    var resPesquisa = id;
    var criptomoeda = resPesquisa.toLowerCase();
    var temp = JSON.parse(localStorage.getItem('favoritos'));
    var index = 0;

    obterFavoritos();
    
    if(temp[index] != criptomoeda)
    {
        console.log(temp[index]);
    }

    //console.log(criptomoeda); 
    obterMoeda(criptomoeda, detalhes);
}


function detalhes(res){  
    console.log(res);
    /*
    console.log(res.data.name);
    console.log(res.data.market_cap_rank);
    console.log(res.data.image.large);
    console.log(res.data.description.pt);
    console.log(res.data.market_data.current_price.eur);
    console.log(res.data.market_data.price_change_24h);
    */

    
    $('#titulo').text(res.data.name + " | MyCoinSpace");
    $('#nome').text("Nome: " + res.data.name);
    //$('#imagemFav').attr('src', addFavoritos(res.data.id));
    $('#rank').text("Rank no Mercado: " + res.data.market_cap_rank);
    $('#desc').html("Descrição: " + res.data.description.en);
    $('#precoAtual').text("Preço Atual: " + res.data.market_data.current_price.eur + "€");
    $('#precoChance').text("Alteração do Preço nas Ultimas 24h: " + res.data.market_data.price_change_24h + "€");
    $('#image').attr('src', res.data.image.large);
    $('#link').attr('href', res.data.links.homepage[0])
}


