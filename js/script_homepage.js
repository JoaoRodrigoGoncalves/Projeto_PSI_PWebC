'use strict';

function apresentar_dados(dados)
{
    if(dados.success)
    {
        $.each(dados.data,function(index, value){
            var img_final = value.image.replace("large", "thumb");
            $('#tabela_homepage > tbody').append(`<tr><td>${apresentarBotaoFavoritos(value.id)}</td><td>${value.market_cap_rank}</td><td><img class="thumb_img_tabela" src="${img_final}"> <a class="link_tabela" href="./detalhes.html?id=${value.id}">${value.name}</a></td><td class="d-none d-sm-table-cell">${value.symbol.toUpperCase()}</td><td class="d-none d-sm-table-cell">${value.current_price}€</td><td class="d-sm-table-cell d-sm-none">${value.current_price}€<br>${mudanca_preco_percentagem(value.price_change_24h, value.price_change_percentage_24h)}</td><td class="d-none d-sm-table-cell">${analise_mudanca_preco(value.price_change_24h, value.price_change_percentage_24h)}</td></tr>`);
        });
    }
    else
    {
        console.error(dados.data);
        var linha = '<tr><td colspan="6" style="text-align: center;">Não foi possível obter dados sobre o top de criptomoedas.<br><small>Erro: ' + dados.data + '</small></td></tr>';
        $(linha).hide().appendTo('#tabela_homepage > tbody').fadeIn(800);
    }
}
obterTop100(apresentar_dados);

function abrirModalRemocao(id)
{
    var modal = new bootstrap.Modal(document.getElementById("confirmacaoModal"));
    $("#confirmarRemocaoBTN").attr("onclick", "removerFavoritos('" + id + "')");
    modal.show();
}