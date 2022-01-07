'use strict';

var dadosMoedas = [];

var favoritos = obterFavoritos();
if(favoritos.length > 0)
{
    $.each(favoritos, function (index, value) { 
        obterMoeda(value, receberDados);
    });
}
else
{
    //desenhar uma só linha na tabela a informar o utilizador que não tem favoritos
}

function receberDados(dados)
{
    dadosMoedas.push(dados);
    console.log(dados);
}
