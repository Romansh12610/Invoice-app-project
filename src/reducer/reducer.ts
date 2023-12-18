import { InvoiceListType } from '../interfaces/invoiceTypes';
import ReducerActions from '../interfaces/reducerTypes';
import { initialState } from '../hooks/useManageInvoices';

export default function InvoiceReducer(state: InvoiceListType, action: ReducerActions) {

    switch (action.type) {
        case "filter": {
            const { filterStatus } = action.payload;

            if (filterStatus === 'all') {
                return initialState;
            }

            // always filter initial state
            const newState = initialState.filter(invoice => {
                return invoice.status === filterStatus;
            });

            return newState;
        }
    }
}