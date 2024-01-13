export default interface ReducerActions {
    type: 'filter' | 'openForm' | 'closeForm' | 'addInvoice' | 'addDraft' | 'saveChanges' | 'discardChanges';
    payload?: {
        [ind: string]: string;
    }
};