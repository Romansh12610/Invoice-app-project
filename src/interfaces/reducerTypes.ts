export default interface ReducerActions {
    type: 'add' | 'filter' | 'delete';
    payload: {
        [ind: string]: string;
    }
};