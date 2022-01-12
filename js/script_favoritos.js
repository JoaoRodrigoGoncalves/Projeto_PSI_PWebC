'use strict';

function apresentar_dados(dados)
{
    $('#teste').text(dados.data.id);
}
obterMoeda('nome', apresentar_dados);