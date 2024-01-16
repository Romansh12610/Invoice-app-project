import { InitialInvoiceInterface } from "./invoiceTypes";
import { FilterStatusType } from "./filterTypes";

export default interface ReducerActions {
    type: 'filter' | 'openForm' | 'closeForm' | 'addInvoice' | 'addDraft' | 'saveChanges' | 'discardChanges' | 'closeModal' | 'deleteInvoice' | 'changeStatus';
    payload?: InitialInvoiceInterface | FilterStatusType | string;
};