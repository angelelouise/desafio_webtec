import {Form, Button, Container, Table, Row} from "react-bootstrap";
import api from "./api/api";
import { useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

interface cepData{
    cep: string,
    logradouro: string,
    complemento: string,
    bairro: string,
    localidade: string,
    uf: string,
    ibge: string,
    gia: string,
    ddd: string,
    siafi: string
}

function App() {
    const [cepOutput, setCepOutput ] = useState<cepData>();
    const [cepInput, setCepInput] = useState('');

    const handleChangeCep=(event: { target: { value: string; }; })=>{
        if(!(event.target.value.length===0)){
            setCepInput(event.target.value);
        }
    }
    const handleInput = (event: { preventDefault: () => void; })=>{
        event.preventDefault()
        api.get('/'+cepInput+'/json').then(response => {
            setCepOutput(response.data);
        }).catch(error => console.error(`Error: ${error}`));
    }
  return (
    <div>
        <Container>
            <Row className="justify-content-md-center">
                <Form>
                    <Form.Group>
                        <Row>
                            <Form.Label>Digite um CEP para consultar o endereço:</Form.Label>
                        </Row>
                        <Row>
                            <input id="input_cep" onChange={handleChangeCep}/>
                        </Row>
                        <br/>
                        <Row>
                            <Button id="consultar" type="submit" onClick={handleInput}>Consultar</Button>
                        </Row>
                        <br/>
                    </Form.Group>
                </Form>
            </Row>
        </Container>
        { cepOutput ? (
            <Container>
                <Row id="cep-list" >
                    <Table>
                        <thead>Endereço completo</thead>
                        <tr>
                            <th>Cep</th>
                            <th> {cepOutput?.cep}</th>
                        </tr>
                        <tr>
                            <th>
                                Logradouro
                            </th>
                            <th>{cepOutput?.logradouro}</th>
                        </tr>
                        <tr>
                            <th>Complemento</th>
                            <th>{cepOutput?.complemento}</th>
                        </tr>
                        <tr>
                            <th>Bairro</th>
                            <th>{cepOutput?.bairro}</th>
                        </tr>
                        <tr>
                            <th>UF</th>
                            <th>{cepOutput?.uf}</th>
                        </tr>
                        <tr>
                            <th>IBGE</th>
                            <th>{cepOutput?.ibge}</th>
                        </tr>
                        <tr>
                            <th>GIA</th>
                            <th>{cepOutput?.gia}</th>
                        </tr>
                        <tr>
                            <th>DDD</th>
                            <th>{cepOutput?.ddd}</th>
                        </tr>
                        <tr>
                            <th>SIAFI</th>
                            <th>{cepOutput?.siafi}</th>
                        </tr>
                    </Table>
                </Row>
            </Container>
        ) : (
            <Row className="justify-content-md-center">
                Nada pesquisado
            </Row>
        )}

    </div>
  );
}

export default App;
