// types
type closeCallbackType = () => void;

type closeModalType = (e: MouseEvent, modalElement: Node, closeCallback: closeCallbackType) => void;

export type keySetType = Set<'Tab' | 'Shift'>; 

type FocusTrapDownType = (e: KeyboardEvent, modalElement: HTMLDivElement | HTMLFormElement, closeCallback: closeCallbackType, keySet: keySetType) => void;

type FocusTrapUpType = (e: KeyboardEvent, keySet: keySetType) => void;

// functions
export const closeModalIfOutsideClick: closeModalType = (e, modalElement, closeCallback) => {
    e.stopPropagation();

    const { target } = e;

    console.log('target: ', target);
    console.log('modal: ', modalElement);
    console.log('modal contains target: ', modalElement.contains(target as Node));

    if (modalElement.contains(target as Node) == false) {
        closeCallback();
    } 
    else {
        return;
    }
};


export const focusTrapKeyDown: FocusTrapDownType = (e, modalElement, closeCallback, keySet) => {
    // focus on form
    if (e.key === 'Escape') {
        closeCallback();
        return;
    } else if (e.key !== 'Tab' && e.key !== 'Shift') return;

    // add key to set to track it
    keySet.add(e.key);

    const focusableElementsList: NodeListOf<HTMLInputElement | HTMLAnchorElement | HTMLButtonElement> = modalElement.querySelectorAll('a, input, button');

    const firstItem = focusableElementsList[0];
    const listLength = focusableElementsList.length;
    const lastItem = focusableElementsList[listLength - 1];

    if (document.activeElement === firstItem && e.key === 'Tab' && keySet.has('Shift')) {
        lastItem.focus();
        lastItem.scrollIntoView({
            behavior: 'smooth',
        });
    }

    else if (document.activeElement === lastItem && e.key === 'Tab') {
        firstItem.focus();
        firstItem.scrollIntoView(
            {
                behavior: 'smooth',
            }
        )
    }
};

export const focusTrapKeyUp: FocusTrapUpType = (e, keySet) => {
    if (e.key !== 'Tab' && e.key !== 'Shift') {
        return;
    } else {
        keySet.delete(e.key);
    }
};