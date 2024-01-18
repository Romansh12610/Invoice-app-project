import { Variants } from "framer-motion";

const buttonVariants: Variants = {
    hover: {
        scale: 1.15,
        transition: {
            type: 'spring',
            duration: 0.3,
        }
    },
    tap: {
        scale: 0.85,
        transition: {
            type: 'spring',
            duration: 0.15
        } 
    }
};

export default buttonVariants;