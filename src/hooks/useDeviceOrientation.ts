import { useState, useEffect } from 'react';

const mobileWidthCondition = "(max-width: 768px)";

const useDeviceOrientation = () => {

    const [isMobile, setIsMobile] = useState(
        window.matchMedia(mobileWidthCondition).matches
    );

    useEffect(() => {
        function checkCondition() {
            setIsMobile(window.matchMedia(mobileWidthCondition).matches);
        }

        window.matchMedia(mobileWidthCondition)
            .addEventListener('change', checkCondition);

        return () => {
            window.matchMedia(mobileWidthCondition)
                .removeEventListener('change', checkCondition);
        }
    }, [isMobile]);

    return [isMobile] as const;
};

export default useDeviceOrientation;