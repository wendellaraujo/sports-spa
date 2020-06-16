import React, { useEffect } from 'react';
import Card from '../components/Card';
import Table from '../components/Table'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router";
import axios from 'axios';
import { setPessoas } from '../actions/pessoaActions'
import { cpfMask, cnpjMask, cepMask } from '../utils/mask'

export default function Home(props) {
    const history = useHistory();
    //const [pessoas, setPessoas] = useState ([])
    const pessoas = useSelector(state => state.pessoa.pessoas);
    const dispatch = useDispatch()

    useEffect(() => {
        async function getPessoas(){
            fetch('https://localhost:5001/api/pessoa/')
            .then(response => response.json())
            .then(json => dispatch(setPessoas(json)))
            
        }
        console.log(pessoas)
        getPessoas()
    });

    const excluir = (id) => {
        axios.delete(`https://localhost:5001/api/pessoa/excluir/${id}`)
        .then(response => {
            const pessoasLista = pessoas.filter( pessoa => pessoa.id !== id);
            dispatch(setPessoas(pessoasLista))
            alert("Excluido com sucesso");
        })
        .catch(e => {
            alert(e);
        })
    }

    const editar = (pessoa) => {
        pessoa.cpf ? history.push(`/editar-pessoa-fisica/${pessoa.id}`) : history.push(`/editar-pessoa-juridica/${pessoa.id}`)
    }

    return(
        <div>
            <h1 className="text-white">Pessoas</h1>
            <Card>
                <div className="mb-3">
                    <button className="btn btn-outline-primary mr-3" onClick={() => history.push("/cadastrar-pessoa-fisica")}>Cadastra pessoa Fisica</button>
                    <button className="btn btn-outline-primary" onClick={() => history.push("/cadastrar-pessoa-juridica")}>Cadastra pessoa Juridica</button>
                </div>
                <Table tablestriped="table-striped" tablebordered="table-bordered">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome/Razão social</th>
                        <th>CPF/CNPJ</th>
                        <th>CEP</th>
                        <th>Email</th>
                        <th>Telefones</th>
                        <th>Classificação</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {pessoas.map( pessoa =>
                            <tr key={pessoa.id}>
                                <td>{pessoa.id}</td>
                                <td>{pessoa.nome}</td>
                                <td>{pessoa.cpf ? cpfMask(pessoa.cpf) : cnpjMask(pessoa.cnpj)}</td>
                                <td>{cepMask(pessoa.cep)}</td>
                                <td>{pessoa.email}</td>
                                <td>{pessoa.telefones.map(telefone => 
                                    <p key={telefone.id}>{ telefone.numero }</p>
                                    )}
                                </td>
                                <td>{pessoa.classificacao}</td>
                                <td>
                                    <button className="btn btn-primary mr-2 mb-2" onClick={() => editar(pessoa)}>Editar</button>
                                    <button className="btn btn-outline-danger" onClick={() => excluir(pessoa.id)}>Excluir</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card>
        </div>
    )
}