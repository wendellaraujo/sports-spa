import React, { useState } from 'react';
import Card from '../components/Card/index';
import FormGroup from '../components/Form/FormGroup';
import Row from '../components/Layout/Row';
import Col from '../components/Layout/Col';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from "react-router";

export default function PessoaFisica(props) {
  const history = useHistory();
  const [telefone, setTelefone] = useState({ numero: '' });
  const [pessoa, setPessoa] = useState({
    nome: '',
    cpf: '',
    cep: '',
    email: '',
    classificacao: '',
    telefones: []
  })

  const handleInput = (event) => {
    setTelefone({
      ...telefone, 
      numero: event.target.value
    })
  }

  const addTelefone = () => {
    if(telefone.numero.length >= 8 && telefone.numero.length <= 11){
      pessoa.telefones.push(telefone);
      setPessoa({
        ...pessoa,
        telefones: pessoa.telefones
      });
      setTelefone({ numero: '' })
    } else {
      alert("Telefone invalido");
    }
  }

  const cadastrar = (values) => {
    pessoa.nome = values.nome;
    pessoa.cpf = values.cpf;
    pessoa.cep = values.cep
    pessoa.email = values.email;
    pessoa.classificacao= values.classificacao;
    setPessoa(pessoa);

    axios.post('https://localhost:5001/api/pessoa/cadastrar-pessoa-fisica', pessoa)
    .then(response => history.push("/"))
    .catch(err => alert(err.errors))
  }
  const formik = useFormik({
    initialValues: {
      nome: '',
      cpf: '',
      cep: '',
      email: '',
      classificacao: '',
    },
    validationSchema: Yup.object({
      nome: Yup.string()
        .max(100, 'Maximo 100 caracteres')
        .required( 'Nome é obrigatorio' ),
      cep: Yup.string()
        .length(8, 'CEP valido deve conter 8 caracteres')
        .required('CEP é obrigatorio'),
      cpf: Yup.string()
        .length(11, 'CPF valido deve conter 11 caracteres')
        .required('CPF é obrigatorio'),
      email: Yup.string()
        .email('Insira um email valido')
        .required('Email é obrigatorio'),
      classificacao: Yup.string()
        .required('classificacao é obrigatorio')
    }),
    onSubmit: values => {
      
      cadastrar(values);
    },
  });
  return(
      <div>
        <h1 className="text-white">Cadastrar Pessoa Fisica</h1>
          <Card sizeCard="w-50">
            <form onSubmit={formik.handleSubmit}>
              <Row>
                <Col sm="12" md="12" lg="12" xl="12">
                  <FormGroup>
                    <label htmlFor="begin" >Nome</label>
                    <input type="text" className="form-control" name="nome" onChange={formik.handleChange} value={formik.values.nome} />
                    {formik.errors.nome ? <p className="text-danger">{formik.errors.nome}</p> : null}
                  </FormGroup>
                </Col>
                <Col sm="12" md="12" lg="12" xl="12">
                  <FormGroup>
                    <label htmlFor="begin" >CPF</label>
                    <input type="text" className="form-control" name="cpf" onChange={formik.handleChange} value={formik.values.cpf}/>
                    {formik.errors.cpf ? <p className="text-danger">{formik.errors.cpf}</p> : null}
                  </FormGroup>
                </Col>
                <Col sm="12" md="12" lg="12" xl="12">
                  <FormGroup>
                    <label htmlFor="end">CEP</label>
                    <input type="text" className="form-control" name="cep" onChange={formik.handleChange} value={formik.values.cep}/>
                    {formik.errors.cep ? <p className="text-danger">{formik.errors.cep}</p> : null}
                  </FormGroup>
                </Col>
                <Col sm="12" md="12" lg="12" xl="12">
                  <FormGroup>
                    <label htmlFor="end">Email</label>
                    <input type="text" className="form-control" name="email" onChange={formik.handleChange} value={formik.values.email}/>
                    {formik.errors.email ? <p className="text-danger">{formik.errors.email}</p> : null}
                  </FormGroup>
                </Col>
                <Col sm="12" md="12" lg="12" xl="12">
                  <FormGroup>
                    <label htmlFor="end">Classificação</label>
                    <select className="form-control" name="classificacao" onChange={formik.handleChange} value={formik.values.classificacao}>
                      <option value="" disabled>Selecione uma classificação</option>
                      <option value="1">Ativo</option>
                      <option value="2">Inativo</option>
                      <option value="3">Preferencial</option>
                    </select>
                    {formik.errors.classificacao ? <p className="text-danger">{formik.errors.classificacao}</p> : null}
                  </FormGroup>
                </Col>
                <Col sm="10" md="10" lg="10" xl="10">
                  <FormGroup>
                    <label htmlFor="end">Telefones</label>
                    <input type="text" className="form-control" name="numero" value={telefone.numero} onChange={handleInput}/>
                  </FormGroup>
                    {pessoa.telefones.map(tel => <p>{tel.numero}</p>)}
                </Col>
                <Col>
                    <span href="#" className="btn btn-primary mt-4" onClick={addTelefone}>+</span>
                </Col>
              </Row>
              <button type="submit" className="btn btn-outline-primary btn-block">Cadastrar</button>
            </form>
          </Card>
      </div>
  )
}

