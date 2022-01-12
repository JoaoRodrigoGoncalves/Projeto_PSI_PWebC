'use scrict';

function obterMoeda(id, callback)
{
    $.ajax({
        method: "GET",
        url: 'https://api.coingecko.com/api/v3/coins/' + id + '/?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true'
    })
    .done(function(res){
        callback(JSON.parse('{"success": true, "data": ' + JSON.stringify(res) + '}'));
    })
    .fail(function(res){
        console.error("Erro: " + res.responseJSON.error);
        callback(JSON.parse('{"success": false, "data": "' + res.responseJSON.error + '"}'));
    });
}

function obterTop100(callback)
{
    $.ajax({
        method: "GET",
        url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h%2C7d'
    })
    .done(function(res){
        callback(JSON.parse('{"success": true, "data": ' + JSON.stringify(res) + '}'));
    })
    .fail(function(res){
        callback(JSON.parse('{"success": false, "data": "' + res.responseJSON.error + '"}'));
    })
}