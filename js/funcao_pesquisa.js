'use scrict';

var CloneMedia = $('.media').clone();

$('#btSearch').on('click', function(){
    $.ajax({
        method: "GET",
        url: 'https://api.coingecko.com/api/v3/coins/' + id + '/?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true'
    })
    .done(function(res){
        console.log(res);
    
        $.each(res.Search, function(result){
    
            console.log(result.name);
            
        })
    })
})
