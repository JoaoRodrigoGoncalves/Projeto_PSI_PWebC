'use strict';

//Criação e atribuição dos campos da tabela
function apresentar_dados(dados)
{
    if(dados.success)
    {
        $.each(dados.data,function(index, value){
            var img_final = value.image.replace("large", "thumb");
            var linha = `<tr id="line-${value.id}"><td>${apresentarBotaoFavoritos(value.id)}</td><td>${value.market_cap_rank ?? 'N/A'}</td><td><img class="thumb_img_tabela" src="${img_final}"> <a class="link_tabela" href="./detalhes.html?id=${value.id}">${value.name}</a></td><td class="d-none d-sm-table-cell">${value.symbol.toUpperCase()}</td><td class="d-none d-sm-table-cell">${value.current_price}${obterSimboloMonetario()}</td><td class="d-sm-table-cell d-sm-none">${value.current_price}€<br>${mudanca_preco_percentagem(value.price_change_24h, value.price_change_percentage_24h)}</td><td class="d-none d-sm-table-cell">${analise_mudanca_preco(value.price_change_24h, value.price_change_percentage_24h)}</td></tr>`;
            $(linha).hide().appendTo('#tabela_homepage > tbody').fadeIn(800);
        });
    }
    else
    {
        console.error(dados.data);
        var linha = '<tr><td colspan="6" style="text-align: center;">Não foi possível obter dados sobre o top de criptomoedas.<br><small>Erro: ' + dados.data + '</small></td></tr>';
        $(linha).hide().appendTo('#tabela_homepage > tbody').fadeIn(800);
    }
}

var quantidade_linhas = localStorage.getItem('homepage_shown') ?? 100; // obtém o número de linhas a ser pedido, default é 100
var order_type = localStorage.getItem('coin_order') ?? 'market_cap_desc'; // obtém o tipo de ordem a apresentar, default é 'market_cap_desc'
$(`#show_${quantidade_linhas}`).prop("checked", true); // marcar o botão consoante a definição da quantidade de linhas a mostrar
$(`#order_${order_type}`).prop("checked", true); // marcar o botão consoante a definição do tipo de ordem a apresentar
obterTopMoedas(apresentar_dados, order_type, quantidade_linhas); // fazer o pedido das moedas


function toggleShowed()
{
    if(quantidade_linhas == 100)
    {
        localStorage.setItem("homepage_shown", 10);
    }
    else
    {
        localStorage.setItem("homepage_shown", 100);
    }
}

function toggleOrder()
{
    if(order_type == "market_cap_desc")
    {
        localStorage.setItem('coin_order', 'volume_desc');
    }
    else
    {
        localStorage.setItem('coin_order', 'market_cap_desc');
    }
}