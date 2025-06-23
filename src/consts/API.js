const API = 'http://localhost:4000/';
const getCustomers = API + 'customers';
const addCustomer = API + 'customers/add';
const deleteCustomer = API + 'customers/delete/';
const updateCustomer = API + 'customers/update/';
const downloadReport = API + 'download-report';


const APIEndpoints = {
    getCustomers,
    addCustomer,
    deleteCustomer,
    updateCustomer,
    downloadReport
};


export default  APIEndpoints;