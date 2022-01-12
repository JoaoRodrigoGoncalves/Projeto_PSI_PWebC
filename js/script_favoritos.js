'use strict';

var dadosMoedas = [];
var simbolo_monetario;

var favoritos = obterFavoritos();
if(favoritos.length > 0)
{
    $.each(favoritos, function (index, value) { 
        obterMoeda(value, receberDados);
    });
}
else
{
    //desenhar uma só linha na tabela a informar o utilizador que não tem favoritos
    $('#tabela_favoritos > tbody').append('<tr><td colspan="6" style="text-align: center;">Não existem criptomoedas na sua lista de favoritos</td></tr>');
}

if(obterPreferenciaMoeda() == "eur")
{
    simbolo_monetario = "€";
}
else
{
    simbolo_monetario = "$";
}

function receberDados(dados)
{
    if(dados.success)
    {
        console.log(dados);
        console.log(dados.data.id);
        $('#tabela_favoritos > tbody')
        .append('<tr><td>' + apresentarBotaoFavoritos(dados.data.id) + '</td><td>' + dados.data.market_cap_rank + '</td><td><img class="thumb_img_tabela" src="' + dados.data.image.thumb + '"/> ' + dados.data.name + '</td><td>' + dados.data.symbol + '</td><td>' + dados.data.market_data.current_price[obterPreferenciaMoeda()] + simbolo_monetario + '</td><td>' + analise_mudanca_preco(dados.data.market_data.price_change_24h_in_currency[obterPreferenciaMoeda()], dados.data.market_data.price_change_percentage_24h_in_currency[obterPreferenciaMoeda()]) + '</td></tr>');
    }
    else{
        $('#tabela_favoritos > tbody').append('<tr><td colspan="6" style="text-align: center;">Não foi possível obter detalhes sobre uma moeda na lista de favoritos<br><small>Erro: ' + dados.data + '</small></td></tr>');
    }
}

/**
 * 
 */
function analise_mudanca_preco(valor_mudanca, percentagem)
{
    if(valor_mudanca < 0)
    {
        // valor desceu
        return '<span style="color: red;">' + valor_mudanca + ' (' + percentagem + '%)</span>';
    }
    else
    {
        if(valor_mudanca > 0)
        {
            // valor subiu
            return '<span style="color: green;">+' + valor_mudanca + ' (' + percentagem + '%)</span>';
        }
        else
        {
            return '=' + valor_mudanca + ' (' + percentagem + '%)';
        }
    }
}
