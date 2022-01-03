'use scrict';

function obterMoeda(id)
{
    var resposta = null;
    $.ajax({
        method: "GET",
        url: 'https://api.coingecko.com/api/v3/coins/' + id + '/?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true'
    })
    .done(function(res){
        resposta = JSON.parse('{"success": true, "data": ' + JSON.stringify(res) + '}');
    })
    .fail(function(res){
        console.error("Erro: " + res.responseJSON.error);
        resposta = JSON.parse('{"success": false, "data": "' + res.responseJSON.error + '"}');
    });
    while (resposta == null) {
        console.log("Wait...");
    }
    return resposta;
}
