import { InitialInvoiceInterface } from "./invoiceTypes";
import { FilterStatusType } from "./filterTypes";

// payload type
export type InvoicePayload = Omit<InitialInvoiceInterface, 'id'>;
export type RestoreCallback = () => void;

// when edited
export interface EditInvoicePayload {
    invoiceEditPayload: InvoicePayload;
}

// when saving changes
export interface SaveChangesPayload {
    invoiceEditPayload: InvoicePayload;
    editedInvoiceId: string;
    restoreCallback: RestoreCallback;
}

export interface PayloadWithCallback {
    newInvoice: InvoicePayload;
    restoreCallback: RestoreCallback;
} 

export default interface ReducerActions {
    type: 'filter' | 'openForm' | 'openFormEdit' | 'closeForm' | 'addInvoice' | 'addDraft' | 'saveChanges' | 'discardChanges' | 'closeModal' | 'openModal' | 'deleteInvoice' | 'changeStatus' | 'resetDeletedInvoice' | 'resetSaveChanges';
    payload?: InitialInvoiceInterface | FilterStatusType | string | RestoreCallback | PayloadWithCallback | EditInvoicePayload | SaveChangesPayload;
};