import { useState, useEffect } from 'react';
import { FilterStatusType, FilterActiveType, InvoiceListSetterType } from '../interfaces/globalContextInt';
import { useGlobalContext } from '../components/ContextWrapper';

const useFilterChange = () => {

    // global context imports
    const context = useGlobalContext();
    let setCurrentInvoiceList: InvoiceListSetterType;
    
    if (context !== null) {
        setCurrentInvoiceList = context.setCurrentInvoiceList; // not working
    };

    // filter status types
    const [filterStatus, setFilterStatus] = useState<FilterStatusType>('all');

    // event handler on checkbox
    const handleFilterChange = (filterType: FilterActiveType) => {
        setFilterStatus(prevStatus => {
            if (prevStatus === 'all') {
                return filterType;
            } 
            else {
                if (filterType === prevStatus) {
                    return 'all';
                }
                else {
                    return filterType;
                }
            }
        })
    };

    // effect runs each time 'filterStatus' changes
    useEffect(() => {
        console.log(setCurrentInvoiceList == null);
        if (!setCurrentInvoiceList) return;

        setCurrentInvoiceList(prevList => prevList.filter(invoice => {
            return invoice.status === filterStatus;
        }));

    }, [filterStatus]);

    return [filterStatus, handleFilterChange] as const;
}

export default useFilterChange;