import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react'; 
import App, {calcularNovoSaldo} from './App';

describe('Componente principal', () => {
    describe('Quando abro o app do banco', () => {
        it('o nome do banco é exibido', () =>{
            render(<App/>);
            expect(screen.getByText('ByteBank')).toBeInTheDocument();
        })
        it('saldo é exibido', () =>{
            render(<App/>);
            expect(screen.getByText('Saldo:')).toBeInTheDocument();
        })
        it('botão realizar transação é exibido', () =>{
            render(<App/>);
            expect(screen.getByText('Realizar operação')).toBeInTheDocument();
        })
    })
    describe('Quando realizo transação', () => {
        it('que é um saque, o valor do saldo diminui', () =>{
            const valores = {
                transacao: 'saque',
                valor: 50
            };
            const novoSaldo = calcularNovoSaldo(valores, 100);
            expect(novoSaldo).toBe(50);
        })
        it('que é um deposito, o valor do saldo aumenta', () =>{
            const valores = {
                transacao: 'deposito',
                valor: 50
            };
            const novoSaldo = calcularNovoSaldo(valores, 150);
            expect(novoSaldo).toBe(200);
        })
        it('que é um saque, a transação deve ser realizada', () =>{
            const {
                getByText, 
                getByTestId, 
                getByLabelText
            } = render(<App />);
            const saldo = getByText('R$ 1000');
            const transacao = getByLabelText('Saque');
            const valor = getByTestId('valor');
            const botaoTransacao = getByText('Realizar operação');
            
            expect(saldo.textContent).toBe('R$ 1000');
            
            fireEvent.click(transacao, {target: {value: 'saque'}});
            fireEvent.change(valor, {target: {value: 10}});
            fireEvent.click(botaoTransacao);

            expect(saldo.textContent).toBe('R$ 990');
        })

        it('que é um saque, a transação deve ser realizada usando screen', () =>{
            render(<App />);
            const saldo = screen.getByText('R$ 1000');
            const transacao = screen.getByLabelText('Saque');
            const valor = screen.getByTestId('valor');
            const botaoTransacao = screen.getByText('Realizar operação');
            
            expect(saldo.textContent).toBe('R$ 1000');
            
            fireEvent.click(transacao, {target: {value: 'saque'}});
            fireEvent.change(valor, {target: {value: 10}});
            fireEvent.click(botaoTransacao);

            expect(saldo.textContent).toBe('R$ 990');
        })
    })
})
