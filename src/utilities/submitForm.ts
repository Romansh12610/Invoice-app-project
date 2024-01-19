// utils
import validateForm from '../utilities/formValidation';
import getPaymentDueDate from '../utilities/getPaymentDueDate';
import sumTotal from '../utilities/sumTotal';
//types
import { RestoreCallback, InvoicePayload } from '../interfaces/reducerTypes';
import { InvoiceListDispatchType } from '../interfaces/invoiceTypes';


// TYPES
// form submission types
export type ActionTypes = 'discard' | 'save' | 'add' | 'draft';

type SubmitInvoiceForm = (e: React.MouseEvent<HTMLButtonElement & { name: ActionTypes }>, formState: InvoicePayload, formRef: React.RefObject<HTMLFormElement>, setShouldShowError: React.Dispatch<React.SetStateAction<boolean>>, dispatchAction: InvoiceListDispatchType, restoreToInitial: RestoreCallback, exitAnimationStateCallback: () => void, editedInvoiceId: string | null) => void;


// MAIN FUNCTION
export const submitInvoiceForm: SubmitInvoiceForm = async (e, formState, formRef, setShouldShowError, dispatchAction, restoreToInitial, exitAnimationStateCallback, editedInvoiceId) => {

    const { name } = e.currentTarget;

    // dispatch
    switch(name) {
        case 'discard': {

            // call animation
            exitAnimationStateCallback();
            // wait
            await new Promise(res => setTimeout(res, 350));

            dispatchAction({
                type: 'discardChanges',
                payload: restoreToInitial as RestoreCallback
            });
            
            break;
        }

        case 'draft': {
            const newInvoicePayload: InvoicePayload = {
                ...formState,
                paymentDue: getPaymentDueDate(formState.createdAt, formState.paymentTerms),
                status: 'draft',
                total: sumTotal(formState.items),
            };

            // call animation
            exitAnimationStateCallback();
            // wait
            await new Promise(res => setTimeout(res, 350));

            dispatchAction({
                type: 'addDraft',
                payload: {
                    newInvoice: newInvoicePayload,
                    restoreCallback: restoreToInitial,
                },
            });
            break;
        }


        case 'add': {

            const newInvoicePayload: InvoicePayload = {
                ...formState,
                paymentDue: getPaymentDueDate(formState.createdAt, formState.paymentTerms),
                status: 'pending',
                total: sumTotal(formState.items),
            };


            if (validateForm(formRef) == false) {
                setShouldShowError(true);
                return;
            } 
            else {
                // call exit animation
                exitAnimationStateCallback();
                // wait
                await new Promise(res => setTimeout(res, 400));

                dispatchAction({
                    type: 'addInvoice',
                    payload: {
                        newInvoice: newInvoicePayload,
                        restoreCallback: restoreToInitial
                    },
                });

                break;
            }
        }

        // add save case
        case 'save': {
            // call exit animation
            exitAnimationStateCallback();
            // wait
            await new Promise(res => setTimeout(res, 400));

            dispatchAction({
                type: 'saveChanges',
                payload: {
                    invoiceEditPayload: formState,
                    editedInvoiceId,
                    restoreCallback: restoreToInitial
                }
            });

            break;
        }
    }
};