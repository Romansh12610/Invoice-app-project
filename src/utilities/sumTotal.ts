import { InitialItemInterface } from "../interfaces/invoiceTypes";

const sumTotal = (itemsArray: InitialItemInterface[]) => {

    const arrayWithTotalSums = itemsArray.map(el => el.total);
    return arrayWithTotalSums.reduce((acc, curr) => acc + curr, 0); 
};

export default sumTotal;