'use strict';

var modal_remover;

function obterSimboloMonetario()
{
    if(obterPreferenciaMoeda() == "eur")
    {
        return "€";
    }
    else
    {
        return "$";
    }
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
        return `<span style="color: red;">${Math.round((valor_mudanca + Number.EPSILON) * 1000) / 1000}${obterSimboloMonetario()} (${Math.round((percentagem + Number.EPSILON) * 1000) / 1000}%)</span>`;
    }
    else
    {
        if(valor_mudanca > 0)
        {
            // valor subiu
            return `<span style="color: green;">+${Math.round((valor_mudanca + Number.EPSILON) * 1000) / 1000}${obterSimboloMonetario()} (${Math.round((percentagem + Number.EPSILON) * 1000) / 1000}%)</span>`;
        }
        else
        {
            return `=${Math.round((valor_mudanca + Number.EPSILON) * 1000) / 1000}${obterSimboloMonetario()} (${Math.round((percentagem + Number.EPSILON) * 1000) / 1000}%)`;
        }
    }
}

function mudanca_preco_percentagem(valor_mudanca, percentagem)
{
    if(valor_mudanca < 0)
    {
        // valor desceu
        return `<span style="color: red;">${Math.round((percentagem + Number.EPSILON) * 1000) / 1000}%</span>`;
    }
    else
    {
        if(valor_mudanca > 0)
        {
            // valor subiu
            return `<span style="color: green;">+${Math.round((percentagem + Number.EPSILON) * 1000) / 1000}%</span>`;
        }
        else
        {
            return `${Math.round((percentagem + Number.EPSILON) * 1000) / 1000}%`;
        }
    }
}

/**
 * Apresenta o botão de favoritos correto, juntamente
 * com as funções necessárias.
 */
function apresentarBotaoFavoritos(id)
{
    var lista_moedas = [];
    var temp = JSON.parse(localStorage.getItem('favoritos'));
    lista_moedas = temp ?? []; // lista_moedas é igual a temp caso este não seja nulo. Se este for nulo, lista_moedas é uma array vazia

    if(lista_moedas.includes(id))
    {
        return `<a href="javascript:void(0);" onclick="abrirModalRemocao(\'${id}\')"><img class="favoritos_remover" src="./images/estrela_pre.png" /></a>`; // remover dos favoritos
    }
    else
    {
        return `<a href="javascript:void(0);" onclick="acionarAdicao(\'${id}\')"><img class="favoritos_adicionar" src="./images/estrela_npre.png" /></a>`; // adicionar aos favoritos
    }
}

function abrirModalRemocao(id)
{
    modal_remover = new bootstrap.Modal(document.getElementById("confirmacaoModal"));
    $("#confirmarRemocaoBTN").attr("onclick", `acionarRemocao('${id}')`);
    modal_remover.show();
}

function acionarRemocao(id)
{
    var response = removerFavoritos(id);
    if(response.success)
    {
        $(`#line-${id} > td:first-child > a > img`).attr("src", "./images/estrela_npre.png");
        $(`#line-${id} > td:first-child > a`).attr("onclick", `acionarAdicao('${id}')`);
        $(`#line-${id} > td:first-child > a > img`).removeClass("favoritos_remover");
        modal_remover.hide();
    }
    else
    {
        console.error(response.message);
    }
}

function acionarAdicao(id)
{
    var response = adicionarFavoritos(id);
    if(response.success)
    {
        $(`#line-${id} > td:first-child > a > img`).attr("src", "./images/estrela_pre.png");
        $(`#line-${id} > td:first-child > a > img`).addClass("favoritos_remover");
        $(`#line-${id} > td:first-child > a`).attr("onclick", `abrirModalRemocao('${id}')`);
    }
    else
    {
        console.error(response.message);
    }
}

function mudar_pagina() {
    var idPesquisa = document.getElementById("pesquisa").value;
    $(location).attr('href', './detalhes.html?id=' + idPesquisa);
}

$(document).ready(function(){
    $(`#${obterPreferenciaMoeda()}`).prop("checked", true);
});