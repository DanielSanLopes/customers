import './App.css';
import { useEffect, useState } from 'react';
import API from "./consts/API";
import Customer from './components/Customer'; 

function App() {

  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    customerName: '',
    email: '',
    phone: ''
  });


  function handleAddCustomer(event) {

     event.preventDefault();

    let prevCustomers = customers.sort((value1, value2) => value1.id - value2.id);
    setCustomers([...prevCustomers, newCustomer].sort((a, b) => a.id - b.id));
    setNewCustomer({ customerName: '', email: '', phone: '' });

    const customer = {
      customerName: newCustomer.customerName,
      email: newCustomer.email,
      phone: newCustomer.phone
    };
    console.log('handleAddCustomer called with:', customer);
    fetch(API.addCustomer, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(customer)
    })
    .then(res => res.json())
    .then(data => {
      console.log('Cliente adicionado:', data);
      alert('Cliente adicionado com sucesso!');      
    })
    .catch(error => {
      console.error('Erro ao adicionar cliente:', error);
      alert('Erro ao adicionar cliente. Por favor, tente novamente.');
      setCustomers(prevCustomers); 
    });
  }

  async function handleGetCustomers() {
    let response = fetch(API.getCustomers, {
      method:'GET',
      headers:{
        'Content-TYpe': 'application/json',
        'Accept': 'application/json',
      }
    })
    
    await response
      .then(res => res.json())
      .then(data => {
        setCustomers([...data].sort((value1, value2) => value1.id - value2.id));
        
      })
      .catch(error => {
        console.error('Erro ao buscar clientes:', error);
      });           
  }

  function handleEditCustomer(cust) {

    console.log('handleEditCustomer called');

    let prevCustomers = customers.sort((value1, value2) => value1.id - value2.id);

    let tempCustomersList = customers.filter(customer => customer.id !== cust.id)
    setCustomers([...tempCustomersList, cust].sort((value1, value2) => value1.id - value2.id));

    const updatedCustomer = {
      id: cust.id,
      customerName: cust.customerName,
      email: cust.email,
      phone: cust.phone
    };

    fetch(API.updateCustomer + cust.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(updatedCustomer)
    })
    .then(res => res.json())
    .then(data => {
      alert('Cliente atualizado com sucesso!');
    })
    .catch(error => {
      console.error('Erro ao atualizar cliente:', error);
      setCustomers(prevCustomers); 
    });

  }

  function handleDeleteCustomer(id) {

    let prevCustomers = customers.sort((value1, value2) => value1.id - value2.id);
    setCustomers(customers.filter(customer => customer.id !== id))
    console.log('handleDeleteCustomer called with id:', id);

    fetch(API.deleteCustomer + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    .then(res => res.json())
    .then(data => {
      setCustomers(customers.filter(customer => customer.id !== id));
      alert('Cliente deletado com sucesso!');
    })
    .catch(error => {
      console.error('Erro ao deletar cliente:', error);
      setCustomers(prevCustomers);
    });
  }

  function handleDownloadReport() {
    window.open(API.downloadReport, '_blank');
  }

  useEffect(()=>{
    handleGetCustomers();
  },[])

  useEffect(() => {
    if (customers) {
      console.log('Clientes atualizados:', customers);
    }
  }, [customers]);



  return (
    <div className="App">
      <header className="App-header">
       <h1>Clientes</h1>
      </header>
      <form className='form' onSubmit={handleAddCustomer}>       
        <label>Nome: <br/><br/>
          <input className='inputText' type="text" id="name" name="name" required value={newCustomer.customerName} onChange={event => setNewCustomer(prev => ({...prev, customerName: event.target.value}))}/>
        </label>
        <label>Email: <br/><br/>
          <input className='inputText' type="email" id="email" name="email" required value={newCustomer.email} onChange={event => setNewCustomer(prev => ({...prev, email: event.target.value}))}/>
        </label>              
        <label>Telefone: <br/><br/>
          <input className='inputText' type="tel" id="phone" name="phone" required value={newCustomer.phone} onChange={event => setNewCustomer(prev => ({...prev, phone: event.target.value}))}/>
        </label>
        <button className='addButton' type="submit">&nbsp; + &nbsp;</button>
      </form>
      
      <ul className='list'>
        {customers && customers.map((customer, index) => (
          <li key={customer.id}>
            <Customer customer={customer} index={index} onEdit={(c)=>handleEditCustomer(c)} onDelete={handleDeleteCustomer}></Customer>
          </li>
        ))}        
      </ul>
      <button className='reportButton' onClick={handleDownloadReport}>download<br/>report</button>
    </div>
  );
}

export default App;
