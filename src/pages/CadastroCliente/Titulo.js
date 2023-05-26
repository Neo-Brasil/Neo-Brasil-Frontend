import React, { useState } from "react";
import Axios from "axios";
import { toast } from 'react-toastify';
import MaskedInput from "react-text-mask";
import { createNumberMask } from "text-mask-addons";
import VerificaToken from '../../script/verificaToken';
import { useEffect } from "react";

export default function Titulo({ onButtonClick }) {  const [nome, setNome] = useState('');
const [preco, setPreco] = useState('');
const [dataVenc, setDataVenc] = useState('');
const [prazo, setPrazo] = useState('');
const [titulos, setTitulos] = useState([]);
const [chave, setCheve] = useState(true);
const id_usuario = localStorage.getItem('id_usuario');

const currencyMask = createNumberMask({
  prefix: 'R$ ',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: '.',
  allowDecimal: false,
  decimalSymbol: ',',
  decimalLimit: 2,
  integerLimit: 13,
  requireDecimal: true,
  allowNegative: false,
  allowLeadingZeroes: false,
});

useEffect(() => {
  if (titulos.length > 0 && chave) {
    var endereco = localStorage.getItem('endereco');
    endereco = JSON.parse(endereco);

    var nomeCliente = localStorage.getItem('nome');
    var cpfCliente = localStorage.getItem('cpf');
    var emailCliente = localStorage.getItem('email');

    let valor = preco.replace('R$ ', '').replace('.', '');

    Axios.post(`http://localhost:9080/cadastro/cliente/${id_usuario}`, {
      nome: nomeCliente,
      cpf: cpfCliente,
      email: emailCliente,
      endereco: endereco,
      titulos: titulos,
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .catch(function (error) {
        VerificaToken(error);
      })
      .then((res) => {
        console.log(res);
      });

    toast.success('Cadastrado com sucesso!');
    onButtonClick('pageone');
  }
}, [titulos]);

function handleSubmit(e) {
  e.preventDefault();
  setCheve(true)
  if (prazo !== '') {
    let titinho = {
      titulo: nome,
      preco: parseFloat(preco.replace('R$ ', '').replaceAll('.', '').replace(',', '.')),
      data_vencimento: dataVenc,
      tempo_credito: prazo,
      situacao: 'Em aberto'
    };
    setTitulos((prevTitulos) => [...prevTitulos, titinho]);

    var endereco = localStorage.getItem('endereco');
    endereco = JSON.parse(endereco);

    var nomeCliente = localStorage.getItem('nome');
    var cpfCliente = localStorage.getItem('cpf');
    var emailCliente = localStorage.getItem('email');

    let valor = preco.replace('R$ ', '').replace('.', '');

    console.log(titulos);
  } else {
    toast.error('Preencha os campos corretamente');
  }
}

function handleReturn(e) {
    return onButtonClick('pagetwo');
}

function addTitulo() {
  let titinho = {
    titulo: nome,
    preco: parseFloat(preco.replace('R$ ', '').replaceAll('.', '').replace(',', '.')),
    data_vencimento: dataVenc,
    tempo_credito: prazo,
    situacao: 'Em aberto'
  };
  setNome('')
  setPreco('')
  setDataVenc('')
  setPrazo('')
  setCheve(false)
  setTitulos((prevTitulos) => [...prevTitulos, titinho]);
}
  
    return (
        <div>

            <h3>Dados do plano</h3>

            <form onSubmit={handleSubmit}>

                <div className="inputs">

                    <div className='plano'>

                        <div className="campo">
                            <input className="fixo" type="text" required
                                value={nome} onChange={(e) => setNome(e.target.value)} />
                            <span>Título</span>
                        </div>

                        <div className="campo">
                            
                            <MaskedInput mask={currencyMask} id="preco" className="fixo" type="text" placeholder="R$" required
                                value={preco} onChange={(e) => setPreco(e.target.value)} />
                            <span>Preço</span>
                        </div>

                        <div className="campo">
                            <input className="fixo" type="date" required
                                value={dataVenc} onChange={(e) => setDataVenc(e.target.value)} />
                            <span>Data de vencimento</span>
                        </div>

                        <div className="campo">
                            <input className="fixo" id="prazo"
                                type="number" min={0} max={5} required
                                value={prazo} onChange={(e) => setPrazo(e.target.value)} />
                            <span>Prazo de crédito (em dias)</span>
                        </div>

                        <div className="buttonsRow">
                            <div className='button-color'>
                                <button className='button-green'
                                    onClick={() => handleReturn()}>
                                    VOLTAR</button>
                            </div>

                            <div className='button-color'>
                                <button className='button-green'
                                    onClick={() => handleSubmit()}>
                                    ENVIAR</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div className='button-color'>
                <button className='button-green'
                    onClick={() => addTitulo()}>
                    +</button>
            </div>
        </div>
    )
}