import { InitialInvoiceInterface } from "./invoiceTypes";
import { FilterStatusType } from "./filterTypes";

// payload type
export type InvoicePayload = Omit<InitialInvoiceInterface, 'id'>;
export type RestoreCallback = () => void;

export interface PayloadWithCallback {
    newInvoice: InvoicePayload;
    restoreCallback: RestoreCallback;
} 

export default interface ReducerActions {
    type: 'filter' | 'openForm' | 'closeForm' | 'addInvoice' | 'addDraft' | 'saveChanges' | 'discardChanges' | 'closeModal' | 'openModal' | 'deleteInvoice' | 'changeStatus' | 'resetDeletedInvoice';
    payload?: InitialInvoiceInterface | FilterStatusType | string | RestoreCallback | PayloadWithCallback;
};