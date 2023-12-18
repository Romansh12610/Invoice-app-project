import { useState } from 'react';
import { FilterStatusType } from '../interfaces/filterTypes';

const useFilterStatus = () => {
    // filter status state
    const [filterStatus, setFilterStatus] = useState<FilterStatusType>('all');

    return [filterStatus, setFilterStatus] as const;
}

export default useFilterStatus;