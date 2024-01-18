import { AnimatePresence } from 'framer-motion';
import React from 'react';

const PresenceProvider = ({ children }: { children: React.ReactNode }) => {
    
    return <AnimatePresence mode='wait'>{children}</AnimatePresence>
}; 

export default PresenceProvider;