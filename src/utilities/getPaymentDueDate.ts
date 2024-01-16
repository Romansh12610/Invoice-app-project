type getPaymentDue = (createdAt: string | Date, paymentTerms: 1 | 7 | 14 | 30) => string;

const getPaymentDueDate: getPaymentDue = (createdAt, paymentTerms) => {
    if (typeof createdAt === 'string') {
        createdAt = new Date(createdAt);
    }
    // timestamp counting
    let timeStamp = createdAt.getTime(); 
    const msTerms = paymentTerms * 3600 * 24 * 1000;
    timeStamp += msTerms;

    // creating new date from timestamp
    const dueDate = new Date(timeStamp);

    // formatting for output
    let day: number | string = dueDate.getDate();
    day = day < 10 ? `0${day}` : `${day}`;

    let month: number | string = dueDate.getMonth() + 1;
    if (month < 10) month = `0${month}`;

    const formattedDate = `${dueDate.getFullYear()}-${month}-${day}`;

    return formattedDate;
};

export default getPaymentDueDate;