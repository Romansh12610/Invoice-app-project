import { useState, useEffect, useCallback, SetStateAction } from 'react';

type ClickOutsideHook = (elRefs: React.RefObject<HTMLElement | null>[]) => [isOpen: boolean, setIsOpen: React.Dispatch<SetStateAction<boolean>>];

type handleClickOutsideType = (e: MouseEvent) => void;

const useCloseIfClickOutside: ClickOutsideHook = (elRefs) => {

    const [isOpen, setIsOpen] = useState(false);
    // DOM elems
    let elems = elRefs.map(ref => ref.current);
    let noNullElems = elems.filter(el => el !== null);

    // event handler
    const handleClickOutside: handleClickOutsideType = useCallback((e) => {
        const target = e.target as HTMLElement;
        
        for (const el of noNullElems) {
            if (el.contains(target)) {
                return;
            }
        }

        // run close callback
        setIsOpen(currOpen => {
            if (currOpen === true) {
                return false;
            } 
        });
    }, [noNullElems]);

    useEffect(() => {
        if (noNullElems.length > 0) {

            document.addEventListener('click', handleClickOutside, true);
    
            return () => {
                document.removeEventListener('click', handleClickOutside, true);
            }
        }
    }, [handleClickOutside]);

    return [isOpen, setIsOpen]; 
};

export default useCloseIfClickOutside;