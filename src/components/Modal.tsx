import { StyledWrapper, TitleText, ParText, BtnWrapper, CancelBtn, ActionBtn } from "../styledComponents/ModalStyled";
import { useGlobalContext } from "./ContextWrapper";
import { createPortal } from "react-dom";
import buttonVariants from "../utilities/buttonVariants";


interface ModalProps {
    mod: 'DELETE' | 'CHANGE_STATUS' | 'SAVE_CHANGES';
    id: string;
}

const Modal = ({ mod, id }: ModalProps) => {

    // globalState
    const { dispatchAction } = useGlobalContext();
    
    // TEXT MANIPULATIONS
    // heading
    const headText = mod === 'DELETE' ? 'Deletion' : mod === 'CHANGE_STATUS' ? 'Status Changing' : 'Saving Changes';
    // par
    const actionText = mod === 'DELETE' ? 'delete' : mod === 'CHANGE_STATUS' ? 'change status of' : 'save changes on'
    const message = `Are you sure you want to ${actionText} invoice ${id}? This action cannot be undone.`
    // btn
    const actionBtnText = mod === 'DELETE' ? 'delete' : mod === 'CHANGE_STATUS' ? 'Mark As Paid' : 'Save Changes';

    // EVENT HANDLERS
    const handleCancelBtnClick = () => {
        dispatchAction({
            type: 'closeModal',
        });
    };

    //action types
    const typeOfAction = mod === 'DELETE' ? 'deleteInvoice' : mod === 'CHANGE_STATUS' ? 'changeStatus' : 'saveChanges';

    const handleActiveBtnClick = () => {
        dispatchAction({
            type: typeOfAction,
            payload: id
        });
    };

    const modal = (
        <StyledWrapper>
            <TitleText>Confirm {headText}</TitleText>
            <ParText>{message}</ParText>
            <BtnWrapper>
                <CancelBtn
                    whileHover='hover'
                    whileTap='tap'
                    variants={buttonVariants}

                    onClick={handleCancelBtnClick}
                >Cancel</CancelBtn>
                <ActionBtn
                    whileHover='hover'
                    whileTap='tap'
                    variants={buttonVariants}

                    onClick={handleActiveBtnClick}
                    $type={mod}
                >{actionBtnText}</ActionBtn>
            </BtnWrapper>
        </StyledWrapper>
    );


    return createPortal(modal, document.body);
};

export default Modal;