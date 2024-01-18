// hooks
import { useEffect } from "react";
// util functions
import { focusTrapKeyDown, focusTrapKeyUp, keySetType, closeModalIfOutsideClick } from "../utilities/modalUtilities";


const useModal = (modalRef: React.RefObject<HTMLFormElement | HTMLDivElement>, closeCallback: () => void) => {

    useEffect(() => {
        // prevent scroll when modal is active
        document.body.style.overflow = 'hidden';
        const backdropElement = document.getElementById('backdrop') as HTMLDivElement;

        // focus trap
        const keySet: keySetType = new Set();

        const onKeyDown = (e: KeyboardEvent) => focusTrapKeyDown(e, modalRef.current, closeCallback, keySet);
        const onKeyUp = (e: KeyboardEvent) => focusTrapKeyUp(e, keySet);

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);

        // if click outside --> close modal
        const handleOutsideClick = (e: MouseEvent) => closeModalIfOutsideClick(e, backdropElement, closeCallback);
        document.addEventListener('click', handleOutsideClick, true);

        return () => {
            // enable scrolling after modal closing
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('keyup', onKeyUp);
            document.removeEventListener('click', handleOutsideClick, true);
        }
    }, []);
};


export default useModal;