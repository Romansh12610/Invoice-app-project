import em from "./pxIntoRem";

const breakPointValues = {
    up: {
        small: em(600, true),
        medium: em(768, true),
        large: em(1020, true)
    },
    down: {
        small: em(599, true),
        medium: em(767, true),
        large: em(1019, true)
    }
}

export default breakPointValues;