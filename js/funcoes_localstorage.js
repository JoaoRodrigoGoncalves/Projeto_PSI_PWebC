/**
 * Funções para interagir com a localstorage.
 * O ID da moeda (id dado pela coigecko) é guardado numa array
 * que por sua vez é guardada em JSON no localstorage.
 */

'use strict';

/**
 * Adiciona uma criptomoeda à lista de favoritos
 * do utilizador (localstorage)
 * @param id_moeda O ID da moeda (tal como indicado pela API da CoinGecko)
 */
function adicionar_favoritos(id_moeda)
{
    var lista_moedas = [];
    var temp = JSON.parse(localStorage.getItem('favoritos'));
    lista_moedas = temp ?? []; // lista_moedas é igual a temp caso este não seja nulo. Se este for nulo, lista_moedas é uma array vazia

    if(lista_moedas.includes(id_moeda))
    {
        return JSON.parse('{"success": false, "message": "Esta criptomoeda já se encontra guardada"}');
    }

    lista_moedas.push(id_moeda);
    localStorage.setItem('favoritos', JSON.stringify(lista_moedas));
    return JSON.parse('{"success": true}');
}

/**
 * Remove uma criptomoeda da lista de favoritos
 * do utilizador (localstorage)
 * @param id_moeda O ID da moeda (tal como indicado pela API da CoinGecko)
 */
function remover_favoritos(id_moeda)
{
    var lista_moedas = [];
    var temp = JSON.parse(localStorage.getItem('favoritos'));
    lista_moedas = temp ?? []; // lista_moedas é igual a temp caso este não seja nulo. Se este for nulo, lista_moedas é uma array vazia

    if(lista_moedas.includes(id_moeda))
    {
        lista_moedas = lista_moedas.filter(item => item !== id_moeda);
        localStorage.setItem('favoritos', JSON.stringify(lista_moedas));
        return JSON.parse('{"success": true}');
    }else{
        return JSON.parse('{"success": false, "message": "Esta criptomoeda não está na lista de favoritos"}');
    }
}

/**
 * Devolve a array com todas as criptomoedas guardadas
 */
function obter_favoritos()
{
    return JSON.parse(localStorage.getItem('favoritos'));
}