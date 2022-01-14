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


function responsivenavbar() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
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
        return `<span style="color: red;">${valor_mudanca}${obterSimboloMonetario()} (${Math.round((percentagem + Number.EPSILON) * 1000) / 1000}%)</span>`;
    }
    else
    {
        if(valor_mudanca > 0)
        {
            // valor subiu
            return `<span style="color: green;">+${valor_mudanca}${obterSimboloMonetario()} (${Math.round((percentagem + Number.EPSILON) * 1000) / 1000}%)</span>`;
        }
        else
        {
            return `=${valor_mudanca}${obterSimboloMonetario()} (${Math.round((percentagem + Number.EPSILON) * 1000) / 1000}%)`;
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

    if(idNaLista(lista_moedas, id))
    {
        return `<a href="#" onclick="abrirModalRemocao(\'${id}\')"><img class="favoritos_remover" src="./images/estrela_pre.png" /></a>`; // remover dos favoritos
    }
    else
    {
        return `<a href="#" onclick="adicionarFavoritos(\'${id}\')"><img class="favoritos_adicionar" src="./images/estrela_npre.png" /></a>`; // adicionar aos favoritos
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
        $(`#line-${id} > td:first-child > a`).attr("onclick", `abrirModalRemocao('${id}')`)
    }
    else
    {
        console.error(response.message);
    }
}