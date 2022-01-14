'use strict';

function mudarImagem(){
    if( document.getElementById("myImg").src == "images/estrela_npre.png" ){
        document.getElementById("myImg").src = "images/estrela_pre.png";
    }
    else if( document.getElementById("myImg").src == "images/estrela.png" ){
        var resposta="Tem a certeza que deseja remover de favorito?";
        confirm(resposta);
    }
}
function apresentar_dados(dados)
{
    $.each(dados.data,function(index,value){
        console.log(value);
        var img_final = value.image.replace("large", "thumb");
        $('#tabela_homepage > tbody').append('<tr><td><button onclick="mudarImagem()" style="border:none"><img id="imagem" src="images/estrela_npre.png"></button></td><td>' + value.market_cap_rank + '</td><td><img src="'+ img_final +'"></td><td>'+value.name+'</td><td>'
        +value.symbol+'</td><td>'+value.current_price+'€</td><td>'+value.price_change_24h+'€('+value.price_change_percentage_24h+'%)</td></tr>');
    })
}
obterTop100(apresentar_dados);