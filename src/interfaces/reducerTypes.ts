import { InitialInvoiceInterface } from "./invoiceTypes";
import { FilterStatusType } from "./filterTypes";

export default interface ReducerActions {
    type: 'filter' | 'openForm' | 'closeForm' | 'addInvoice' | 'addDraft' | 'saveChanges' | 'discardChanges' | 'closeModal' | 'openModal' | 'deleteInvoice' | 'changeStatus' | 'resetDeletedInvoice';
    payload?: InitialInvoiceInterface | FilterStatusType | string;
};