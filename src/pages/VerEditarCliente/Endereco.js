import React, { useEffect, useState } from "react";
import Axios from "axios";
import { toast } from 'react-toastify';
import { IMaskInput } from "react-imask";
import { useParams } from "react-router-dom";

export default function Endereco({ onButtonClick }) {
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [city, setCity] = useState('');
    const [estado, setEstado] = useState('');
    const [comp, setComp] = useState('');

    const [cepP, setCepp] = useState('');
    const [ruaP, setRuap] = useState('');
    const [bairroP, setBairrop] = useState('');
    const [cityP, setCityp] = useState('');
    const [estadoP, setEstadop] = useState('');
    const [compP, setCompp] = useState('');

    const {id} = useParams();

    useEffect(() => {
        Axios.get(`http://127.0.0.1:9080/selecionar/cliente/${id}`).then((resp) => {
        let cliente = resp.data;
        let endereco = cliente.endereco;
        setCepp(endereco.cep);
        setRuap(endereco.logradouro);
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

                <div class="campo">
                    <IMaskInput mask="00.000-000" placeholder={cepP} maxLength='11' className="fixo" value={cep} onBlur={checkCEP} onChange={(e) => setCep(e.target.value)} />
                    <span>CEP</span>
                </div>
                <div class="campo">
                    <input type="text" placeholder={ruaP} className="fixo" value={rua} onChange={(e) => setRua(e.target.value)}/>
                    <span>Logradouro</span>
                </div>
                <div class="campo">
                    <input type="text" placeholder={bairroP} className="fixo" value={bairro} onChange={(e) => setBairro(e.target.value)}/>
                    <span>Bairro</span>
                </div>
                <div class="campo row">
                    <div className="cidade">
                        <input type="text" placeholder={cityP} className="fixo" value={city} onChange={(e) => setCity(e.target.value)}/>
                        <span>Localidade</span>
                    </div>

                    <div className="uf">
                        <input type="text" placeholder={estadoP} className="fixo" maxLength='2' value={estado} onChange={(e) => setEstado(e.target.value)} />
                        <span>UF</span>
                    </div>
                </div>

                <div class="campo">
                    <input type="text" placeholder={compP} className="fixo" value={comp} onChange={(e) => setComp(e.target.value)} />
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