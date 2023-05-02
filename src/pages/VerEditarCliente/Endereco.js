import React, { useEffect, useState } from "react";
import Axios from "axios";
import { toast } from 'react-toastify';
import { IMaskInput } from "react-imask";
import { useParams } from "react-router-dom";
import VerificaToken from '../../script/verificaToken';

export default function Endereco({ onButtonClick }) {
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [city, setCity] = useState('');
    const [estado, setEstado] = useState('');
    const [comp, setComp] = useState('');

    const [cepP, setCepp] = useState('');
    const [ruaP, setRuap] = useState('');
    const [numeroP, setNumerop] = useState('');
    const [bairroP, setBairrop] = useState('');
    const [cityP, setCityp] = useState('');
    const [estadoP, setEstadop] = useState('');
    const [compP, setCompp] = useState('');

    const {id} = useParams();

    useEffect(() => {
        Axios.get(`http://127.0.0.1:9080/selecionar/cliente/${id}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
        }).catch(function (error) {
            VerificaToken(error)
        }).then((resp) => {
            let cliente = resp.data;
            let endereco = cliente.endereco;
            setCepp(endereco.cep);
            setRuap(endereco.logradouro);
            setNumerop(endereco.numero);
            setBairrop(endereco.bairro);
            setCityp(endereco.localidade);
            setEstadop(endereco.uf);
            setCompp(endereco.complemento);
        });
      }, [])

      const checkCEP = (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        console.log(cep);
        fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
          console.log(data);
          // register({ name: 'address', value: data.logradouro });
          setRua(data.logradouro);
          setBairro(data.bairro);
          setCity(data.localidade);
          setEstado(data.uf);
        }).catch((err) => console.log(err)) 
        toast.warning("CEP inválido ou clicado e não editado");
      }

    function handleSubmit(e) {
        e.preventDefault()
        var endereco =  {
            cep: cep,
            numero: numero,
            logradouro: rua,
            bairro: bairro,
            localidade: city,
            uf: estado,
            complemento: comp
        }
        localStorage.setItem("endereco", JSON.stringify(endereco));
        return  onButtonClick("pagethree")
    }

    return (
        <div>

            <h3>Dados de endereço</h3>

            <form onSubmit={handleSubmit}>

            <div className="inputs">

                <div className="campo">
                    <IMaskInput mask="00.000-000" className="fixo" maxLength="11" placeholder={cepP}
                    value={cep} onBlur={checkCEP} onChange={(e) => setCep(e.target.value)} />
                    <span>CEP</span>
                </div>
                <div className="campo row">
                    <div className="endereco1">
                        <input type="text" className="fixo" placeholder={ruaP}
                        value={rua} onChange={(e) => setRua(e.target.value)} />
                        <span>Logradouro</span>
                    </div>

                    <div className="endereco2">
                        <input type="number" id="num" className="fixo" placeholder={numeroP}
                        value={numero} onChange={(e) => setNumero(e.target.value)} />
                        <span>Número</span>
                    </div>
                </div>
                <div className="campo">
                    <input type="text" className="fixo" placeholder={bairroP}
                    value={bairro} onChange={(e) => setBairro(e.target.value)} />
                    <span>Bairro</span>
                </div>
                <div className="campo row">
                    <div className="endereco1">
                        <input type="text" className="fixo" placeholder={cityP}
                        value={city} onChange={(e) => setCity(e.target.value)} />
                        <span>Localidade</span>
                    </div>

                    <div className="endereco2">
                        <input type="text" className="fixo" maxLength='2' placeholder={estadoP}
                        value={estado} onChange={(e) => setEstado(e.target.value)} />
                        <span>UF</span>
                    </div>
                </div>

                <div className="campo">
                    <input type="text" className="fixo" placeholder={compP}
                    value={comp} onChange={(e) => setComp(e.target.value)} />
                    <span>Complemento</span>
                </div>

                <div className='button-color'>
                    <button className='button-green'
                        onClick={() => handleSubmit()}>
                        PRÓXIMO</button>
                </div>
            </div>

            </form>

        </div>

    )
}