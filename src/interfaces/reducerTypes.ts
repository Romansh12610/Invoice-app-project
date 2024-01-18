import { InitialInvoiceInterface } from "./invoiceTypes";
import { FilterStatusType } from "./filterTypes";
import { StateSetterCallback } from "../reducer/reducer";

// payload type
export type InvoicePayload = Omit<InitialInvoiceInterface, 'id'>;

export interface PayloadWithCallbackArr {
    newInvoice: InvoicePayload;
    callbackArr: StateSetterCallback[];
} 

export default interface ReducerActions {
    type: 'filter' | 'openForm' | 'closeForm' | 'addInvoice' | 'addDraft' | 'saveChanges' | 'discardChanges' | 'closeModal' | 'openModal' | 'deleteInvoice' | 'changeStatus' | 'resetDeletedInvoice';
    payload?: InitialInvoiceInterface | FilterStatusType | string | StateSetterCallback[] | PayloadWithCallbackArr;
};