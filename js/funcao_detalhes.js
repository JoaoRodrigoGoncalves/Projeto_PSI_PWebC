'use scrict';

var CloneMedia = $('.media').clone();

function detalhes(res){
    console.log(res);
    
    console.log(res.data.name);
    console.log(res.data.market_cap_rank);
    console.log(res.data.image.large);
    console.log(res.data.description.pt);

    $('.nome', CloneMedia).text("Nome: " + res.data.name);
    $('.rank', CloneMedia).text("Rank no Mercado: " + res.data.market_cap_rank);
    $('.desc', CloneMedia).html("Descrição: " + res.data.description.en)
    $('#image', CloneMedia).attr('src', res.data.image.large);
    $('.link', CloneMedia).attr('href', res.data.links.homepage[0])

    $('.media-list').replaceWith(CloneMedia);
}