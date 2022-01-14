'use scrict';

function obterMoeda(id, callback)
{
    $.ajax({
        method: "GET",
        url: 'https://api.coingecko.com/api/v3/coins/' + id + '/?localization=true&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true'
    })
    .done(function(res){
        callback(JSON.parse('{"success": true, "data": ' + JSON.stringify(res) + '}'));
    })
    .fail(function(res){
        console.error("Erro: " + res.responseJSON.error);
        callback(JSON.parse('{"success": false, "data": "' + res.responseJSON.error + '"}'));
    });
}
