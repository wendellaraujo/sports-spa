import React from 'react';
import { Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import PessoaFisica from './pages/PessoaFisica';
import EditarPessoaFisica from './pages/EditarPessoaFisica';
import PessoaJuridica from './pages/PessoaJuridica';
import EditarPessoaJuridica from './pages/EditarPessoaJuridica';
import NavBar from './components/NavBar'

function App() {
  return (
    <div >
      <NavBar title="Vetta"/>
      <main>
        <div className="container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/cadastrar-pessoa-fisica" exact component={PessoaFisica} />
            <Route path="/editar-pessoa-fisica/:id" exact component={EditarPessoaFisica} />
            <Route path="/cadastrar-pessoa-juridica" exact component={PessoaJuridica} />
            <Route path="/editar-pessoa-juridica/:id" exact component={EditarPessoaJuridica} />
          </Switch>
        </div>
      </main>
    </div>
  );
}

export default App;
