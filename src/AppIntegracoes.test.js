import React from 'react';
import { render, screen } from '@testing-library/react'; 
import api from './api';
import App from './App';

jest.mock('./api');

describe('Requisições para API', () => {
    //colocamos o async pois o metodo mockado é assíncrono
    it('Exibir lista de transações através da API', async () =>{
        api.listaTransacoes.mockResolvedValue([
            {
                "valor": "10",
                "transacao": "saque",
                "data": "10/08/2020",
                "id": 1
            },
            {
                "transacao": "deposito",
                "valor": "20",
                "data": "26/09/2020",
                "id": 2
            }
         ]);

         render(<App/>);

         //Este método retorna uma promisse que será concluído 
         //quando o método assíncrono for finalizado.
         //Buscamos algo que só se renderizará quando a chamada for concluída.
         //Como o texto 'saque'. Não faz nenhum assertion, apenas busca.
         expect(await screen.findByText('saque')).toBeInTheDocument();

         expect(screen.getByTestId('transacoes')
            .children.length).toBe(2);
    })
})