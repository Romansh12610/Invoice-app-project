import initialInvoices from '../data/data.json';
import {useState} from 'react';


const useManageInvoices = () => {

    // global context

    // states
    const [currentInvoiceList, setCurrentInvoiceList] = useState(initialInvoices);
    
    return {
        currentInvoiceList,
        setCurrentInvoiceList
    }
};

export default useManageInvoices;