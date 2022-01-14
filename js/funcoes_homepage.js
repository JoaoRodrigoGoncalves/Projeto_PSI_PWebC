'use strict';

function apresentar_dados(dados)
{
    $.each(dados.data,function(index,value){
        console.log(value);
        var img_final = value.image.replace("large", "thumb");
        $('#tabela_homepage > tbody').append(`<tr><td>${apresentarBotaoFavoritos(value.id)}</td><td>${value.market_cap_rank}</td><td><img src="${img_final}"></td><td>${value.name}</td><td>${value.symbol}</td><td>${value.current_price}€</td><td>${analise_mudanca_preco(value.price_change_24h, value.price_change_percentage_24h)}</td></tr>`);
    })
}
obterTop100(apresentar_dados);
