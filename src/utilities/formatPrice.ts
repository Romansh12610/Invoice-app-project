const formatPrice = (price: number | string): string => {
    if (Number.isNaN(price)) throw new Error('expected number price to format');
    
    if (typeof price === 'string') price = Number(price);

    let formattedPrice: string | string[] = price.toFixed(2);

    let indexOfDot = formattedPrice.indexOf('.');

    if (indexOfDot <= 3) {
        return formattedPrice;
    }

    let currCommaInd = indexOfDot - 3;
    formattedPrice = formattedPrice.split('');

    while (true) {
        formattedPrice.splice(currCommaInd, 0, ',');
        if (currCommaInd >= 3) {
            currCommaInd -= 3;
        } else {
            formattedPrice = formattedPrice.join('');
            break;
        }
    }

    return formattedPrice;
};

export default formatPrice;