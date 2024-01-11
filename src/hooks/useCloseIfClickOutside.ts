import { useState, useEffect, SetStateAction } from 'react';

type ClickOutsideHook = (initState: boolean, elRef: React.RefObject<HTMLElement>) => [isOpen: boolean, setIsOpen: React.Dispatch<SetStateAction<boolean>>];

type handleClickOutsideType = (e: MouseEvent) => void;

const useCloseIfClickOutside: ClickOutsideHook = (initState, elRef) => {

    const el = elRef.current;
    const [isOpen, setIsOpen] = useState(initState);

    useEffect(() => {
        const handleClickOutside: handleClickOutsideType = (e) => {
            const target = e.target as HTMLElement;          
            if (el && !el.contains(target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside, true);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        }
    }, []);


    return [isOpen, setIsOpen]; 
};

export default useCloseIfClickOutside;