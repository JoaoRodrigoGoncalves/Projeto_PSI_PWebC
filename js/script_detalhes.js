'use strict';

$(document).ready(function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idPesquisa = urlParams.get('id');

    if(idPesquisa)
    {
        obterMoeda(idPesquisa.toLocaleLowerCase(), carregar_detalhes);
    }
    else
    {
        history.back(); // Nenhum valor válido (string diferente de null, undefined, vazio)
    }
}); 

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
        alert(`Erro!\n${response.message}`);
    }
}

function adicionar(id)
{
    var response = adicionarFavoritos(id);
    if(response.success)
    {
        $('#imagemFav').addClass("favoritos_remover");
        $('#imagemFav').attr('src', "./images/estrela_pre.png");
        $('#imagemFav').attr('onclick', `avisoRemover('${id}')`);
    }
    else
    {
        console.error(response.message);
        alert(`Erro!\n${response.message}`);
    }
}

function carregar_detalhes(dados)
{
    var lista_favoritos = obterFavoritos();
   
    document.title = `${dados.data.name} | MyCoinSpace`;  

    $('#nome').text("Nome: " + dados.data.name);

    if(lista_favoritos.includes(dados.data.id))
    {
        $('#imagemFav').addClass("favoritos_remover");
        $('#imagemFav').attr('src', "./images/estrela_pre.png");
        $('#imagemFav').attr('onclick', `avisoRemover('${dados.data.id}')`);
    }
    else
    {
        $('#imagemFav').attr('src', "./images/estrela_npre.png");
        $('#imagemFav').attr('onclick', `adicionar('${dados.data.id}')`);
    }

    $('#rank').text(`Rank no Mercado: ${dados.data.market_cap_rank ?? 'N/A'}`);
    $('#desc').html(dados.data.description.en);
    $('#precoAtual').text("Preço Atual: " + dados.data.market_data.current_price[obterPreferenciaMoeda()] + obterSimboloMonetario());
    $('#precoChance').html(`Alteração do Preço nas Ultimas 24h: ${analise_mudanca_preco(dados.data.market_data.price_change_24h_in_currency[obterPreferenciaMoeda()], dados.data.market_data.price_change_percentage_24h_in_currency[obterPreferenciaMoeda()])}`);
    
    if(dados.data.categories.length > 0)
    {
        var escrita = "<br><span>Categorias:</span><ul>";

        $.each(dados.data.categories, function(index, value){
            if(value) // não apresentar valores inválidos que a API envia
            {
                escrita += `<li>${value}</li>`;
            }
        });

        escrita += "</ul>";

        $("#dadosMoeda").append(escrita);
    }
    
    $('.logo_criptomoeda').attr('href', dados.data.links.homepage[0]);
    $('.logo_criptomoeda > img').hide().attr('src', dados.data.image.large).fadeIn(800);
    
    /////// Gráfico Sparkline /////////
    
    const ctx = $('#sparkline_canvas');

    var valores = [], labels = [];
    // https://stackoverflow.com/a/5741780/10935376
    var date = new Date();
    date.setTime(date.getTime() - (168*60*60*1000)); // rewind do tempo até 168 horas atrás visto que o sparkline devolve 168 entradas
    $.each(dados.data.market_data.sparkline_7d.price, function(index, value){
        labels.push(`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} - ${date.getHours()}h`);
        date.setTime(date.getTime() + (1*60*60*1000)); // adicionar 1 hora
        valores.push(value);
    });

    const spark_chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels : labels,
            datasets: [{
                label: dados.data.name,
                data: valores,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Valorização Últimos 7 Dias (USD)'
                },
                legend: {
                    display: false
                }
            }
        }
    });
}


