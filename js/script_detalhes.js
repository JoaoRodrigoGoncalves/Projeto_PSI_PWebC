'use scrict';

var fav;

$(document).ready(function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idPesquisa = urlParams.get('id');

    pesquisa(idPesquisa);
}); 

function pesquisa(id){
    var resPesquisa = id;
    var criptomoeda = resPesquisa.toLowerCase();

    //console.log(criptomoeda); 
    obterMoeda(criptomoeda, detalhes);
}

function avisoRemover(id)
{
    modal_remover = new bootstrap.Modal(document.getElementById("confirmacaoModal"));
    $("#confirmarRemocaoBTN").attr("onclick", `remover('${id}')`);
    modal_remover.show();
}

function remover(id)
{
    var response = removerFavoritos(id);
    if(response.success)
    {
        $('#imagemFav').attr('src', "./images/estrela_npre.png");
        $('#imagemFav').attr('onclick', `adicionar('${id}')`);
        $('#imagemFav').removeClass("favoritos_remover");
        modal_remover.hide();
    }
    else
    {
        console.error(response.message);
    }
}

function adicionar(id)
{
    var response = adicionarFavoritos(id);
    if(response.success)
    {
        console.log(1);
        $('#imagemFav').addClass("favoritos_remover");
        $('#imagemFav').attr('src', "./images/estrela_pre.png");
        $('#imagemFav').attr('onclick', `avisoRemover('${id}')`);
    }
    else
    {
        console.error(response.message);
    }
}

function detalhes(res){  
    obterFavoritos();
    var lista_moedas = [];
    var temp = JSON.parse(localStorage.getItem('favoritos'));
    lista_moedas = temp ?? [];

    console.log(res);
    var id = res.data.id;
    /*
    console.log(res.data.name);
    console.log(res.data.market_cap_rank);
    console.log(res.data.image.large);
    console.log(res.data.description.pt);
    console.log(res.data.market_data.current_price.eur);
    console.log(res.data.market_data.price_change_24h);
    */

    
    $('#titulo').text(res.data.name + " | MyCoinSpace");
    $('#nome').text("Nome: " + res.data.name);
    //$('#imagemFav').attr('src', addFavoritos(res.data.id));
    if(idNaLista(lista_moedas, res.data.id))
    {
        $('#imagemFav').addClass("favoritos_remover");
        $('#imagemFav').attr('src', "./images/estrela_pre.png");
        $('#imagemFav').attr('onclick', `avisoRemover('${id}')`);
    }
    else
    {
        $('#imagemFav').attr('src', "./images/estrela_npre.png");
        $('#imagemFav').attr('onclick', `adicionar('${id}')`);
    }

    $('#rank').text("Rank no Mercado: " + res.data.market_cap_rank);
    $('#desc').html(res.data.description.en);
    $('#precoAtual').text("Preço Atual: " + res.data.market_data.current_price[obterPreferenciaMoeda()] + obterSimboloMonetario());
    $('#precoChance').text("Alteração do Preço nas Ultimas 24h: " + res.data.market_data.price_change_24h_in_currency[obterPreferenciaMoeda()] + obterSimboloMonetario());
    $('#image').attr('src', res.data.image.large);
    $('#link').attr('href', res.data.links.homepage[0]);
}


