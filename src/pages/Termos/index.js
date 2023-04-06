import './Termos.css';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';

export default function Termos() {
    return (
        <div>
            <div id='x'>
                <Link to={'/criar_conta'}>
                <FiX color='#000' size={40} /></Link>
            </div>
            <p id='tituloTermo'>Termos de Uso</p>

            <div id='text'>
                <p className='espaco'>Estes Termos de Uso entram em vigor em 02 de março de 2023.</p>
                <p className='espaco'>Bem-vindo! Estes Termos de Uso se aplicam ao seu uso da plataforma. Ao usar o Serviço, você concorda que estes termos se tornarão um acordo juridicamente vinculativo entre você e a Entidade Contratante.</p>

                <b>1. Acesso ao Serviço</b>
                <p>Sujeito à sua conformidade com estes Termos, você recebe uma licença não exclusiva, limitada, intransferível e livremente revogável. A Neo-Brasil reserva-se todos os direitos não concedidos expressamente nestes Termos. Cada pessoa deve ter uma conta única e você é responsável por qualquer atividade realizada em sua conta.</p>

                <b>2. Segurança da Informação</b>
                <p>A Neo-Brasil implementa e mantém medidas de segurança físicas, técnicas e administrativas concebidas para proteger as suas informações contra acesso, destruição, utilização, modificação ou divulgação não autorizados.</p>

                <b>3. Isenção de responsabilidade de garantia</b>
                <p>O Serviço é fornecido “no estado em que se encontra” e “conforme disponível”. Na extensão máxima permitida pela lei aplicável e sujeito a quaisquer direitos e recursos não excludentes que você possa ter de acordo com a lei aplicável, a Neo-Brasil, seus licenciadores e seus fornecedores se isentam expressamente de todas e quaisquer garantias de qualquer tipo, expressas ou implícitas, incluindo , mas não limitado a, garantias de comercialização, adequação a uma finalidade específica ou não violação. A Neo-Brasil não garante que seu uso do Serviço seja ininterrupto ou livre de erros. A Neo-Brasil não garante que revisará seus dados quanto à precisão ou que preservará ou manterá seus dados sem perda. Você entende que o uso do Serviço envolve necessariamente a transmissão de seus dados por redes que o Canva não possui, opera ou controla, e que a Neo-Brasil não é responsável por nenhum dos seus dados perdidos, alterados, interceptados ou armazenados nessas redes. A Neo-Brasil não será responsável por atrasos, interrupções, falhas de serviço ou outros problemas inerentes ao uso da internet e comunicações eletrônicas ou outros sistemas fora do controle razoável da Neo-Brasil.</p>

                <b>4. Suas obrigações de indenização</b>
                <p>Você concorda, na medida permitida por lei, em defender, indenizar e isentar a Neo-Brasil e suas afiliadas, executivos, diretores, agentes, licenciadores e funcionários de e contra todas e quaisquer reivindicações, custos, danos, perdas, responsabilidades e despesas (incluindo custos e honorários advocatícios razoáveis) resultantes ou relacionados a (i) sua violação destes Termos ou (ii) seu Conteúdo do Usuário.</p>

                <b>5. Alterações a estes Termos </b>
                <p>Podemos modificar estes Termos (e quaisquer políticas ou acordos mencionados nestes Termos) a qualquer momento. Forneceremos a você um aviso sobre qualquer alteração nos Termos que, em nossa única determinação, afete adversamente seus direitos ou seu uso do Serviço. Podemos fornecer a você este aviso por meio do Serviço e/ou por e-mail para o endereço de e-mail associado à sua conta. Ao continuar a usar o Serviço após a entrada em vigor de quaisquer Termos revisados, você concorda em ficar vinculado aos novos Termos.</p>
            
            </div>
            
        </div>
    )
}