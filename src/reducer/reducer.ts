import { GlobalStateInterface } from '../interfaces/globalContextInt';
import ReducerActions from '../interfaces/reducerTypes';
import { initialState } from '../hooks/useManageInvoices';

export default function InvoiceReducer(state: GlobalStateInterface, action: ReducerActions) {

    switch (action.type) {

        // filter invoices
        case "filter": {
            const { filterStatus } = action.payload;

            if (filterStatus === 'all') {
                return initialState;
            }

            // always filter initial state
           const filteredInvoices = initialState.invoices.filter(i => i.status === filterStatus);

           const newState = {
                ...initialState,
                invoices: filteredInvoices
           };

            return newState;
        }

        // open and close form
        case 'openForm': {

            return {
                ...state,
                isFormOpen: true,
            }
        }

        case 'closeForm': {

            return {
                ...state, 
                isFormOpen: false,
            }
        }

        // invoice changes
        case 'discardChanges': {
            return {
                ...state,
                isFormOpen: false,
                isInvoiceEdited: false,
                isModalOpen: false,
            }
        }

        case 'addDraft': {
            const { newInvoice } = action.payload;

            return {
                ...state,
                invoices: [...state.invoices, newInvoice],
                isFormOpen: false, 
            }
        }

        case 'addInvoice': {
            const { newInvoice } = action.payload;

            return {
                ...state,
                invoices: [...state.invoices, newInvoice],
                isFormOpen: false,
            }
        }
    }
}