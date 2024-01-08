export default interface ReducerActions {
    type: 'create' | 'filter' | 'delete' | 'openForm' | 'closeForm' | 'addInvoice' | 'addDraft' | 'saveChanges' | 'discardChanges';
    payload?: {
        [ind: string]: string;
    }
};