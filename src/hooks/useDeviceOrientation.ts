import { useState, useEffect } from 'react';
import { OrientationType } from '../interfaces/globalContextInt';

// media queryies
const mobileQuery = window.matchMedia('(max-width: 767px)');
const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1019px)');
const desktopQuery = window.matchMedia('(min-width: 1020px)');

// helper functions
const getInitOrientation = (): OrientationType => {
    if (mobileQuery.matches) {
        return 'mobile';
    }
    else if (tabletQuery.matches) {
        return 'tablet';
    }
    else {
        return 'desktop';
    }
};

// custom hook
const useDeviceOrientation = () => {

    const [orientation, setOrientation] = useState<OrientationType>(getInitOrientation());

    useEffect(() => {   
        // event handler
        const handleChangeOrientation = () => {
            if (desktopQuery.matches) {
                setOrientation('desktop');
            }
            else if (tabletQuery.matches) {
                setOrientation('tablet');
            }
            else {
                setOrientation('mobile');
            }
        };

        // add event listeners
        mobileQuery.addEventListener('change', handleChangeOrientation);
        tabletQuery.addEventListener('change', handleChangeOrientation);
        desktopQuery.addEventListener('change', handleChangeOrientation);


        return () => {
            mobileQuery.removeEventListener('change', handleChangeOrientation);
            tabletQuery.removeEventListener('change', handleChangeOrientation);
            desktopQuery.removeEventListener('change', handleChangeOrientation);
        }

    }, []);


    return orientation;
};

export default useDeviceOrientation;