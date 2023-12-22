import React from 'react';

// types
type closeCallbackType = () => void;

type closeModalType = (e: MouseEvent, modalRef: React.RefObject<HTMLElement>, closeCallback: closeCallbackType) => void;

export type keySetType = Set<'Tab' | 'Shift'>; 

type FocusTrapDownType = (e: KeyboardEvent, modalRef: React.RefObject<HTMLFormElement | HTMLDivElement>, closeCallback: closeCallbackType, keySet: keySetType) => void;

type FocusTrapUpType = (e: KeyboardEvent, keySet: keySetType) => void;

// functions
export const closeModalIfOutsideClick: closeModalType = (e, modalRef, closeCallback) => {
    e.stopPropagation();

    const { target } = e;
    if (target !== modalRef.current && !modalRef.current.contains(target as Node)) {
       closeCallback();
    } 
    else {
        return;
    }
};


export const focusTrapKeyDown: FocusTrapDownType = (e, modalRef, closeCallback, keySet: keySetType) => {
    // focus on form
    if (e.key === 'Escape') {
        closeCallback();
        return;
    } else if (e.key !== 'Tab' && e.key !== 'Shift') return;

    // add key to set to track it
    keySet.add(e.key);

    const focusableElementsList: NodeListOf<HTMLInputElement | HTMLAnchorElement | HTMLButtonElement> = modalRef.current.querySelectorAll('a, input, button');

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
}

export const focusTrapKeyUp: FocusTrapUpType = (e, keySet) => {
    if (e.key !== 'Tab' && e.key !== 'Shift') {
        return;
    } else {
        keySet.delete(e.key);
    }
}