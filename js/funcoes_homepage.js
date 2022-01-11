'use strict';

function apresentar_dados(dados)
{
    $('#nome').text(dados.data.id);
}
obterMoeda('bitcoin', apresentar_dados);