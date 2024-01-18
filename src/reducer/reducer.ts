import { GlobalStateInterface } from '../interfaces/globalContextInt';
import ReducerActions,  { PayloadWithCallbackArr } from '../interfaces/reducerTypes';
import { initialState } from '../hooks/useManageInvoices';
import { InitialInvoiceInterface } from '../interfaces/invoiceTypes';
import { FilterStatusType } from '../interfaces/filterTypes';
import generateUniqueID from '../utilities/generateID';
import { InvoiceListType } from '../interfaces/invoiceTypes';

// helpers
const postInvoicesToLocalStorage = (invoices: InvoiceListType) => {
    console.log('post to storage: ', invoices);
    localStorage.setItem('invoices', JSON.stringify(invoices));
};

export type StateSetterCallback = () => void;

const restoreToInitial = (stateSetterArray: StateSetterCallback[]) => {
    stateSetterArray.forEach(callback => callback());
};

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

            //  clean up
            const stateSettercallbackArr = action.payload as StateSetterCallback[];
            restoreToInitial(stateSettercallbackArr);

            return {
                ...state,
                isFormOpen: false,
                isInvoiceEdited: false,
                isModalOpen: false,
                isBackdropOpen: false,
            }
        }

        case 'addDraft': {
            const payload = action.payload as PayloadWithCallbackArr;

            const newInvoice: InitialInvoiceInterface = {
                ...payload.newInvoice,
                id: generateUniqueID(state.invoices)
            };

            const newInvoices = [...state.invoices, newInvoice];

            //  clean up
            postInvoicesToLocalStorage(newInvoices)
            const stateSettercallbackArr = payload.callbackArr;
            restoreToInitial(stateSettercallbackArr);

            return {
                ...state,
                invoices: newInvoices,
                isFormOpen: false,
                isModalOpen: false, 
                isBackdropOpen: false,
            }
        }

        case 'addInvoice': {

            const payload = action.payload as PayloadWithCallbackArr;

            const newInvoice: InitialInvoiceInterface = {
                ...payload.newInvoice,
                id: generateUniqueID(state.invoices)
            };

            const newInvoices = [...state.invoices, newInvoice];

            //  clean up
            postInvoicesToLocalStorage(newInvoices)
            const stateSettercallbackArr = payload.callbackArr;
            restoreToInitial(stateSettercallbackArr);

            return {
                ...state,
                invoices: newInvoices,
                isFormOpen: false,
                isModalOpen: false, 
                isBackdropOpen: false,
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

            const newInvoices = state.invoices.filter(inv => {
                return inv.id !== invoiceId;
            });

            //  clean up
            postInvoicesToLocalStorage(newInvoices);

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
                isModalOpen: false,
                isBackdropOpen: false,
            }
        }
    }
};