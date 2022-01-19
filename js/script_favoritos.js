'use strict';

var dadosMoedas = [];
var dadosMoedas_sorted = [];

var favoritos = obterFavoritos();
if(favoritos.length > 0)
{
    $.each(favoritos, function (index, value) { 
        obterMoeda(value.id, receberDados);
    });
}
else
{
    //desenhar uma só linha na tabela a informar o utilizador que não tem favoritos
    var linha = '<tr><td colspan="6" style="text-align: center;">Não existem criptomoedas na sua lista de favoritos</td></tr>';
    $(linha).hide().appendTo('#tabela_favoritos > tbody').fadeIn(800);
}

function receberDados(dados)
{
    if(dados.success)
    {
        dadosMoedas.push(dados);
        if(dadosMoedas.length == obterFavoritos().length)
        {
            ordenarMostrar(); // ordenar por marketcap
        }
    }
    else{
        var linha = '<tr><td colspan="6" style="text-align: center;">Não foi possível obter detalhes sobre uma moeda na lista de favoritos<br><small>Erro: ' + dados.data + '</small></td></tr>';
        $(linha).hide().appendTo('#tabela_favoritos > tbody').fadeIn(800);
    }
}

/**
 * 
 */
function ordenarMostrar(market_cap = true)
{
    dadosMoedas_sorted = [];
    $("#tabela_favoritos > tbody").empty();
    if(market_cap)
    {
        $.each(dadosMoedas, function(index, value){
            dadosMoedas_sorted[value.data.market_cap_rank] = value;
        });
    }
    else
    {
        dadosMoedas_sorted = dadosMoedas.slice().sort((a, b) => a.data - b.data); // sort pela data?
    }

    $.each(dadosMoedas_sorted, function(index, value){
        if(value != undefined)
        {
            var linha = `<tr id="line-${value.data.id}"><td>${apresentarBotaoFavoritos(value.data.id)}</td><td>${value.data.market_cap_rank}</td><td><img class="thumb_img_tabela" src="${value.data.image.thumb}"/> <a class="link_tabela" href="./detalhes.html?id=${value.data.id}">${value.data.name}</a></td><td class="d-none d-sm-table-cell">${value.data.symbol.toUpperCase()}</td><td>${value.data.market_data.current_price[obterPreferenciaMoeda()]}${obterSimboloMonetario()}</td><td>${analise_mudanca_preco(value.data.market_data.price_change_24h_in_currency[obterPreferenciaMoeda()], value.data.market_data.price_change_percentage_24h_in_currency[obterPreferenciaMoeda()])}</td></tr>`;
            $(linha).hide().appendTo('#tabela_favoritos > tbody').fadeIn(800);
        }
    });
}