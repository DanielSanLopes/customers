import React, { useState } from 'react';


export default function Customer({ customer, index, onEdit, onDelete }) {

    const [thisCustomer, setThisCustomer] = useState(customer);
    const [isEditing, setIsEditing] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        if (thisCustomer === customer) {
            console.log('No changes made');
            return;
        };
        console.log('Submitting form for customer:', thisCustomer);
        console.log('Original customer:', customer);
        onEdit(thisCustomer)
    }

    return(
        <form className='form form-item'  onSubmit={(event)=>handleSubmit(event)}>
            <input className='inputText' type='text' disabled={!isEditing} 
            value={thisCustomer.customerName} onChange={event => setThisCustomer(prev => ({...prev, customerName: event.target.value}))}/>
            
            <input className='inputText' type='email' disabled={!isEditing} 
            value={thisCustomer.email} onChange={event => setThisCustomer(prev => ({...prev, email: event.target.value}))} />
            
            <input className='inputText' type='phone' disabled={!isEditing} 
            value={thisCustomer.phone} onChange={event => setThisCustomer(prev => ({...prev, phone: event.target.value}))} />
            
            <input className='addButton' onClick={() => setIsEditing(!isEditing)} 
            type={isEditing?'button':'submit'} value={!isEditing?'Edit':'Confirm'}/>

            <input className='addButton' onClick={()=>onDelete(customer.id)} 
            type={'button'} value={'Delete'}/>
        </form>
    )
}