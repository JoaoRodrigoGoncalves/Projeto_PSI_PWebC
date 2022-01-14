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
function adicionarFavoritos(id_moeda)
{
    var lista_moedas = [];
    var temp = JSON.parse(localStorage.getItem('favoritos'));
    lista_moedas = temp ?? []; // lista_moedas é igual a temp caso este não seja nulo. Se este for nulo, lista_moedas é uma array vazia

    if(idNaLista(lista_moedas, id_moeda))
    {
        return JSON.parse('{"success": false, "message": "Esta criptomoeda já se encontra guardada"}');
    }
    else
    {
        var novaMoeda = {id: id_moeda, data: Date()};
        lista_moedas.push(novaMoeda);
        localStorage.setItem('favoritos', JSON.stringify(lista_moedas));
        return JSON.parse('{"success": true}');
    }
}

/**
 * Remove uma criptomoeda da lista de favoritos
 * do utilizador (localstorage)
 * @param id_moeda O ID da moeda (tal como indicado pela API da CoinGecko)
 */
function removerFavoritos(id_moeda)
{
    var lista_moedas = [];
    var temp = JSON.parse(localStorage.getItem('favoritos'));
    lista_moedas = temp ?? []; // lista_moedas é igual a temp caso este não seja nulo. Se este for nulo, lista_moedas é uma array vazia

    if(idNaLista(lista_moedas, id_moeda))
    {
        lista_moedas = lista_moedas.filter(item => item.id !== id_moeda);
        localStorage.setItem('favoritos', JSON.stringify(lista_moedas));
        return JSON.parse('{"success": true}');
    }
    else
    {
        return JSON.parse('{"success": false, "message": "Esta criptomoeda não está na lista de favoritos"}');
    }
}

/**
 * Devolve a array com todas as criptomoedas guardadas
 */
function obterFavoritos()
{
    var favoritos = JSON.parse(localStorage.getItem('favoritos'));
    return favoritos ?? [];
}

/**
 * Alterna a moeda entre Euro e Dólar Americano
 */
function toggleMoeda()
{
    var moeda = localStorage.getItem('moeda');
    if(moeda == null)
    {
        // assumimos que a moeda está na padrão (eur) e trocamos para USD
        moeda = "usd";
    }
    else
    {
        moeda == "eur" ? moeda = "usd" : moeda = "eur";
    }
    localStorage.setItem('moeda', moeda);
}

/**
 * Obtém a moeda de preferência do utilizador.
 * Caso a preferência não esteja guardada, assume Euro.
 */
function obterPreferenciaMoeda()
{
    var moeda = localStorage.getItem('moeda');
    return moeda ?? 'eur'; // devolve moeda se não nulo. devolve 'eur' se nulo
}

/**
 * 
 */
function idNaLista(lista, id){
    var naLista = false;
    $.each(lista, function(index, value){
        if(value.id == id)
        {
            naLista = true;
        }
    });
    return naLista;
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
        return '<a href="#" onclick="abrirModalRemocao(\'' + id + '\')"><img class="favoritos_remover" src="./images/estrela_pre.png" /></a>'; // remover dos favoritos
    }
    else
    {
        return '<a href="#" onclick="adicionarFavoritos(\'' + id + '\')"><img class="favoritos_adicionar" src="./images/estrela_npre.png" /></a>'; // adicionar aos favoritos
    }
}