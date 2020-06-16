import React, { useState, useEffect } from 'react';
import Card from '../components/Card/index';
import FormGroup from '../components/Form/FormGroup';
import Row from '../components/Layout/Row';
import Col from '../components/Layout/Col';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";

export default function PessoaFisica(props) {
  const { id } = useParams()
  const history = useHistory();
  const [pessoa, setPessoa] = useState({
    nome: '',
    cnpj: '',
    cep: '',
    email: '',
    classificacao: '',
    telefones: []
  })

  useEffect(() => {
    async function getPessoas(){
        axios.get(`https://localhost:5001/api/pessoa/obter-juridica-por-id/${id}`)
        .then(response => {
            setPessoa(response.data);
        })
        .catch(e => {
            alert(e);
        })
      }
      getPessoas();
    });

  const atualizar = (values) => {
    pessoa.nome = values.nome;
    pessoa.cnpj = values.cnpj;
    pessoa.cep = values.cep
    pessoa.email = values.email;
    pessoa.classificacao= values.classificacao;
    setPessoa(pessoa);

    axios.put('https://localhost:5001/api/pessoa/atualizar-pessoa-juridica', pessoa)
    .then(response => history.push("/"))
    .catch(err => alert(err.errors))
  }
  const formik = useFormik({
    initialValues: {
     ...pessoa
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      nome: Yup.string()
        .max(100, 'Maximo 100 caracteres')
        .required( 'Nome é obrigatorio' ),
      cep: Yup.string()
        .length(8, 'CEP valido deve conter 8 caracteres')
        .required('CEP é obrigatorio'),
      cnpj: Yup.string()
        .length(14, 'cnpj valido deve conter 14 caracteres')
        .required('cnpj é obrigatorio'),
      email: Yup.string()
        .email('Insira um email valido')
        .required('Email é obrigatorio'),
      classificacao: Yup.string()
        .required('classificacao é obrigatorio')
    }),
    onSubmit: values => {
      
      atualizar(values);
    },
  });
  return(
      <div>
        <h1 className="text-white">Atualizar Pessoa Juridica</h1>
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
                    <label htmlFor="begin" >CNPJ</label>
                    <input type="text" className="form-control" name="cnpj" onChange={formik.handleChange} value={formik.values.cnpj}/>
                    {formik.errors.cnpj ? <p className="text-danger">{formik.errors.cnpj}</p> : null}
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
              </Row>
              <button type="submit" className="btn btn-outline-primary btn-block">Atualizar</button>
            </form>
          </Card>
      </div>
  )
}

