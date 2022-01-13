'use strict';

var dadosMoedas = [];
var dadosMoedas_sorted = [];
var simbolo_monetario;

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
            var linha = '<tr><td>' + apresentarBotaoFavoritos(value.data.id) + '</td><td>' + value.data.market_cap_rank + '</td><td><img class="thumb_img_tabela" src="' + value.data.image.thumb + '"/> <a class="link_tabela" href="./detalhes.html?id=' + value.data.id + '">' + value.data.name + '</a></td><td>' + value.data.symbol + '</td><td>' + value.data.market_data.current_price[obterPreferenciaMoeda()] + simbolo_monetario + '</td><td>' + analise_mudanca_preco(value.data.market_data.price_change_24h_in_currency[obterPreferenciaMoeda()], value.data.market_data.price_change_percentage_24h_in_currency[obterPreferenciaMoeda()]) + '</td></tr>';
            $(linha).hide().appendTo('#tabela_favoritos > tbody').fadeIn(800);
        }
    });
}

/**
 * Altera a cor consoante a alteração do preço (em 0)
 * Verde: Alteração positiva
 * Vermelho: Alteração negativa
 * Cor padrão: Sem alteração
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

function abrirModalRemocao(id)
{
    var modal = new bootstrap.Modal(document.getElementById("confirmacaoModal"));
    $("#confirmarRemocaoBTN").attr("onclick", "removerFavoritos('" + id + "')");
    modal.show();
}