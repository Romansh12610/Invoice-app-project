import { StyledWrapper, TitleText, ParText, BtnWrapper, CancelBtn, ActionBtn } from "../styledComponents/ModalStyled";
import { useGlobalContext } from '../hooks/useGlobalContext';
import { createPortal } from "react-dom";
import { useState, useRef } from 'react';
import useModal from "../hooks/useModal";
// animation
import buttonVariants from "../utilities/variants/buttonVariants";
import modalVariants from "../utilities/variants/modalVariants";
import keyMap from "../utilities/uniqueKeysForAnimation";
// types
import { ButtonClick } from "./FormFooter";
import { ActionTypes } from "../utilities/submitForm";


interface ModalProps {
    mod: 'DELETE' | 'CHANGE_STATUS' | 'SAVE_CHANGES' | 'ADD_INVOICE';
    id: string;
    customActiveBtnClickCallback?: ButtonClick;
    customBtnName?: ActionTypes;
}

const Modal = (props: ModalProps) => {

    //props descrukt
    const { mod, id, customActiveBtnClickCallback, customBtnName } = props;

    // globalState
    const { dispatchAction } = useGlobalContext();
    // animation
    const [animateModal, setAnimateModal] = useState('animate');
    // modal functional (ref + custom hook)
    const modalRef = useRef<HTMLDivElement>(null);
    const closeModalCallback = async () => {
        setAnimateModal('exit');
        await new Promise(res => setTimeout(res, 410));

        dispatchAction({
            type: 'closeModal',
        });
    };
    useModal(modalRef, closeModalCallback);
    
    // TEXT MANIPULATIONS
    // heading
    const headText = mod === 'DELETE' ? 'Deletion' : mod === 'CHANGE_STATUS' ? 'Status Changing' : mod === 'SAVE_CHANGES' ? 'Saving Changes' : 'Addition of Invoice';
    // par
    const actionText = mod === 'DELETE' ? 'delete' : mod === 'CHANGE_STATUS' ? 'change status of' : mod === 'SAVE_CHANGES' ? 'save changes on' : 'add a new';
    const message = `Are you sure you want to ${actionText} invoice ${mod === 'ADD_INVOICE' ? '' : id}? This action cannot be undone.`
    // btn
    const actionBtnText = mod === 'DELETE' ? 'delete' : mod === 'CHANGE_STATUS' ? 'Mark As Paid' : mod === 'SAVE_CHANGES' ? 'Save Changes' : 'Add Invoice';

    // EVENT HANDLERS
    //action types (other actions - Save Changes / Add invoice - only on custom)
    const typeOfAction = mod === 'DELETE' ? 'deleteInvoice' : 'changeStatus';

    const custom = customActiveBtnClickCallback != null;

    // if custom callback provided
    let handleSubmitBtnClick: ButtonClick;
    if (custom) {
        handleSubmitBtnClick = (e) => {
            customActiveBtnClickCallback(e);
            setTimeout(() => closeModalCallback(), 0);
        }
    }
    // if not provided --> do default
    else {
        handleSubmitBtnClick = async () => {
            await closeModalCallback();

            dispatchAction({
                type: typeOfAction,
                payload: id
            });
        }
    }

    const modal = (
        <StyledWrapper
            key={keyMap.get('MODAL')}
            variants={modalVariants}
            animate={animateModal}
            initial='initial'
        >
            <TitleText>Confirm {headText}</TitleText>
            <ParText>{message}</ParText>
            <BtnWrapper>
                <CancelBtn
                    whileHover='hover'
                    whileTap='tap'
                    variants={buttonVariants}

                    onClick={closeModalCallback}
                >Cancel</CancelBtn>
                <ActionBtn
                    whileHover='hover'
                    whileTap='tap'
                    variants={buttonVariants}
                    name={customBtnName || ''}

                    onClick={handleSubmitBtnClick}
                    $type={mod}
                >{actionBtnText}</ActionBtn>
            </BtnWrapper>
        </StyledWrapper>
    );


    return createPortal(modal, document.body);
};

export default Modal;