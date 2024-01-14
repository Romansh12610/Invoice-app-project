import { InitialInvoiceInterface } from "../interfaces/invoiceTypes";

const generateID = () => {
    const idTemplate = ['X', 'X', 0, 0, 0, 0];
    const alphabetLength = 26;
    const alphUpperCased = new Array(alphabetLength).map((_, ind) => String.fromCharCode(ind + 65));

    const uid = idTemplate.map((_, ind) => {
        if (ind < 2) {
            const randomCharIndex = Math.floor(Math.random() * alphabetLength);
            return alphUpperCased[randomCharIndex];
        }
        else {
            return Math.floor(Math.random() * 10);
        }
    });

    return uid.join('');
};


type ArrayWithIds = Array<InitialInvoiceInterface>;

const generateUniqueID = (arrWithIds: ArrayWithIds) => {
    const idArray: string[] = arrWithIds.map((el) => {
        return el.id;
    });

    let uniqueID: string = '';

    do {
        uniqueID = generateID();
    } while (idArray.includes(uniqueID));

    return uniqueID;
};

export default generateUniqueID;