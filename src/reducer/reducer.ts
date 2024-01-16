import { GlobalStateInterface } from '../interfaces/globalContextInt';
import ReducerActions from '../interfaces/reducerTypes';
import { initialState } from '../hooks/useManageInvoices';
import { InitialInvoiceInterface } from '../interfaces/invoiceTypes';
import { FilterStatusType } from '../interfaces/filterTypes';
import generateUniqueID from '../utilities/generateID';

export default function InvoiceReducer(state: GlobalStateInterface, action: ReducerActions) {

    switch (action.type) {

        // filter invoices
        case "filter": {
            const filterStatus = action.payload as FilterStatusType;

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
                isBackdropOpen: true,
            };
        }

        case 'closeForm': {

            return {
                ...state, 
                isFormOpen: false,
                isBackdropOpen: false,
            }
        }

        // invoice changes
        case 'discardChanges': {
            return {
                ...state,
                isFormOpen: false,
                isInvoiceEdited: false,
                isModalOpen: false,
                isBackdropOpen: false,
            }
        }

        case 'addDraft': {
            console.log('reducer: payload is: ', action.payload);
            let newInvoice = action.payload as InitialInvoiceInterface;
            //log
            console.log('draft payload:', newInvoice);

            newInvoice = {
                ...newInvoice,
                id: generateUniqueID(state.invoices)
            };

            return {
                ...state,
                invoices: [...state.invoices, newInvoice],
                isFormOpen: false,
                isModalOpen: false, 
            }
        }

        case 'addInvoice': {
            console.log('reducer: payload is: ', action.payload);

            let newInvoice = action.payload as InitialInvoiceInterface;

            //log
            console.log('invoice payload:', newInvoice);

            newInvoice = {
                ...newInvoice,
                id: generateUniqueID(state.invoices)
            };

            return {
                ...state,
                invoices: [...state.invoices, newInvoice],
                isFormOpen: false,
                isModalOpen: false,
            }
        }

        // modal
        case 'closeModal': {

            const isNoNeedToClose = state.isFormOpen;

            return {
                ...state,
                isModalOpen: false,
                isBackdropOpen: isNoNeedToClose ? true : false
            };
        }

        case 'openModal': {

            return {
                ...state,
                isModalOpen: true,
                isBackdropOpen: true,
            };
        }


        // deleting invoice + reset
        case 'deleteInvoice': {
            const invoiceId = action.payload as string;

            console.log('deleted id: ', invoiceId);
            console.log('deleted inv: ', state.invoices.find(inv => inv.id === invoiceId));

            const newInvoices = state.invoices.filter(inv => {
                return inv.id !== invoiceId;
            });

            return {
                ...state,
                invoices: newInvoices,
                isInvoiceDeleted: true,
                isBackdropOpen: false,
            };
        }

        case 'resetDeletedInvoice': {
            
            return {
                ...state,
                isInvoiceDeleted: false,
            };
        }

        case 'changeStatus': {
            const invoiceId = action.payload as string;
            const invoiceToChange = state.invoices.find(inv => inv.id === invoiceId);
            const changedInvoice: InitialInvoiceInterface = {
                ...invoiceToChange,
                status: 'paid',
            };

            const newInvoices = state.invoices.map(inv => {
                if (inv.id !== invoiceId) {
                    return inv;
                }
                // our case 
                else {
                    return changedInvoice;
                }
            });
            
            return {
                ...state,
                invoices: newInvoices,
            }
        }
    }
}