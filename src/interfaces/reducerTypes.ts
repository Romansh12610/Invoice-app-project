export default interface ReducerActions {
    type: 'create' | 'filter' | 'delete' | 'openForm' | 'closeForm';
    payload?: {
        [ind: string]: string;
    }
};