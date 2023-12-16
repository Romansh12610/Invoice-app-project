import initialInvoices from '../data/data.json';
import {useState, useEffect} from 'react';


const useManageInvoices = () => {
    
    const [currentInvoiceList, setCurrentInvoiceList] = useState(initialInvoices);
    
    
    return {
        currentInvoiceList,
    }
};

export default useManageInvoices;