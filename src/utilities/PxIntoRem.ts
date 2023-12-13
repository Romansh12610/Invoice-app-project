const pxIntoRem = (pxQuantity: number, em: boolean = false, basis: number = 16) => {
    return `${Math.floor(pxQuantity / basis)}${em ? 'em' : 'rem'}`;
}

export default pxIntoRem;