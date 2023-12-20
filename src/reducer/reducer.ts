import { GlobalStateInterface } from '../interfaces/globalContextInt';
import ReducerActions from '../interfaces/reducerTypes';
import { initialState } from '../hooks/useManageInvoices';

export default function InvoiceReducer(state: GlobalStateInterface, action: ReducerActions) {

    switch (action.type) {
        case "filter": {
            const { filterStatus } = action.payload;

            if (filterStatus === 'all') {
                return initialState;
            }

            // always filter initial state
            const newState = initialState.invoices.filter(invoice => {
                return invoice.status === filterStatus;
            });

            return newState;
        }
    }
}