import { GlobalStateInterface } from '../interfaces/globalContextInt';
import ReducerActions,  { PayloadWithCallback, EditInvoicePayload, SaveChangesPayload } from '../interfaces/reducerTypes';
import { getInitialState } from '../hooks/useManageInvoices';
import { InitialInvoiceInterface } from '../interfaces/invoiceTypes';
import { FilterStatusType } from '../interfaces/filterTypes';
import generateUniqueID from '../utilities/generateID';
import { InvoiceListType } from '../interfaces/invoiceTypes';

// helpers
const postInvoicesToLocalStorage = (invoices: InvoiceListType) => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
};

export default function InvoiceReducer(state: GlobalStateInterface, action: ReducerActions) {

    switch (action.type) {
        
        // filter invoices
        case "filter": {
            const filterStatus = action.payload as FilterStatusType;

            if (filterStatus === 'all') {
                return getInitialState();
            }

            // always filter initial state
           const filteredInvoices = getInitialState().invoices.filter(i => i.status === filterStatus);

           const newState = {
                ...getInitialState(),
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

        case 'openFormEdit': {

            const { invoiceEditPayload } = action.payload as EditInvoicePayload
            
            return {
                ...state,
                isFormOpen: true,
                isInvoiceEdited: true,
                invoiceEditPayload,
                isBackdropOpen: true,
            }
        }

        case 'closeForm': {

            return {
                ...state, 
                isFormOpen: false,
                isInvoiceEdited: false,
                isBackdropOpen: false,
            }
        }

        // invoice changes
        case 'discardChanges': {

            //  clean up
            const { restoreCallback } = action.payload as PayloadWithCallback;
            setTimeout(() => restoreCallback, 1000);

            return {
                ...state,
                isFormOpen: false,
                isInvoiceEdited: false,
                isModalOpen: false,
                isBackdropOpen: false,
            }
        }

        case 'addDraft': {
            const payload = action.payload as PayloadWithCallback;

            const newInvoice: InitialInvoiceInterface = {
                ...payload.newInvoice,
                id: generateUniqueID(state.invoices)
            };

            const newInvoices = [...state.invoices, newInvoice];

            //  clean up
            postInvoicesToLocalStorage(newInvoices);
            setTimeout(() => payload.restoreCallback, 1000); // asynch

            return {
                ...state,
                invoices: newInvoices,
                isInvoiceEdited: false,
                isFormOpen: false,
                isModalOpen: false, 
                isBackdropOpen: false,
            }
        }

        case 'addInvoice': {
            const payload = action.payload as PayloadWithCallback;

            const newInvoice: InitialInvoiceInterface = {
                ...payload.newInvoice,
                id: generateUniqueID(state.invoices)
            };

            const newInvoices = [...state.invoices, newInvoice];

            //  clean up
            postInvoicesToLocalStorage(newInvoices);
            setTimeout(() => payload.restoreCallback, 1000); // asynch

            return {
                ...state,
                invoices: newInvoices,
                isInvoiceEdited: false,
                isFormOpen: false,
                isModalOpen: false, 
                isBackdropOpen: false,
            }
        }

        case 'saveChanges': {
            
            const { invoiceEditPayload, editedInvoiceId, restoreCallback } = action.payload as SaveChangesPayload; 

            const updatedInvoice: InitialInvoiceInterface = {
                ...invoiceEditPayload,
                id: editedInvoiceId,
            };

            const newInvoices = state.invoices.map(inv => {
                if (inv.id === editedInvoiceId) {
                    return updatedInvoice;
                } else {
                    return inv;
                }
            });

            //  clean up
            postInvoicesToLocalStorage(newInvoices);
            setTimeout(() => restoreCallback, 1000); // asynch

            return {
                ...state,
                invoices: newInvoices,
                isInvoiceEdited: false,
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

            postInvoicesToLocalStorage(newInvoices);
            
            return {
                ...state,
                invoices: newInvoices,
                isModalOpen: false,
                isBackdropOpen: false,
            }
        }
    }
};