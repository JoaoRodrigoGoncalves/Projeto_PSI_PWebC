'use scrict';

function obterMoeda(id, callback)
{
    $.ajax({
        method: "GET",
        url: `https://api.coingecko.com/api/v3/coins/${id}/?localization=true&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`
    })
    .done(function(res){
        callback(JSON.parse('{"success": true, "data": ' + JSON.stringify(res) + '}'));
    })
    .fail(function(res){
        var error;
        switch (res.status) {
            case 429:
                error = "Limite de ~50 pedidos/min excedido. Tente novamente mais tarde.";
                break;
            
            case 200:
                error = res.responseJSON.error;
                break;

            default:
                if(res.responseJSON == undefined)
                {
                    error = "Um erro desconhecido occoreu. Mensagem do servidor: " + res.responseText;
                }
                else
                {
                    error = res.responseJSON.error;
                }
                break;
        }
        callback(JSON.parse('{"success": false, "data": "' + error + '"}'));
    });
}

function obterTopMoedas(callback, order = "market_cap_desc", max_per_page = 100)
{
    $.ajax({
        method: "GET",
        url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${obterPreferenciaMoeda()}&order=${order}&per_page=${max_per_page}&page=1&sparkline=true&price_change_percentage=24h%2C7d`
    })
    .done(function(res){
        callback(JSON.parse('{"success": true, "data": ' + JSON.stringify(res) + '}'));
    })
    .fail(function(res){
        var error;
        switch (res.status) {
            case 429:
                error = "Limite de ~50 pedidos/min excedido. Tente novamente mais tarde.";
                break;
            
            case 200:
                error = res.responseJSON.error;
                break;

            default:
                if(res.responseJSON == undefined)
                {
                    error = "Um erro desconhecido occoreu. Mensagem do servidor: " + res.responseText;
                }
                else
                {
                    error = res.responseJSON.error;
                }
                break;
        }
        callback(JSON.parse('{"success": false, "data": "' + error + '"}'));
    })
}