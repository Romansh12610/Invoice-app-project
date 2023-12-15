import { useState } from 'react';
import { FilterUnionType } from '../interfaces/globalContextInt';
import { FilterStatusType } from '../interfaces/globalContextInt';

const useFilterChange = () => {
    const [filterStatus, setFilterStatus] = useState({
        all: true,
        pending: false,
        draft: false,
        paid: false,
    });

    const handleFilterChange = (filterType: FilterUnionType) => {

        setFilterStatus((prevStatus: FilterStatusType) => {
            const newObject = {...prevStatus};
            
            for (const key of Object.keys(newObject) as (keyof FilterStatusType)[]) {
                if (key === filterType) {
                    newObject[key] = !prevStatus[filterType];
                    continue;
                }
                newObject[key] = false;
            }

            return newObject;
        });

        if (!filterStatus.all && !filterStatus.draft && !filterStatus.pending && !filterStatus.paid) {
            setFilterStatus(prevStatus => ({
                ...prevStatus,
                all: true,
            }));
        }
    };

    return [filterStatus, handleFilterChange] as const;
}

export default useFilterChange;