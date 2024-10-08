import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useFilterParams = () => {
    const setFilterParams = useCallback((dataFilter?: any) => {

        if (!dataFilter) return;

        const { sellOrder = '', color = [], minPrice, maxPrice, size = '' } = dataFilter;

        const params = new URLSearchParams();

        params.append('size', size || "");
        params.append('color', Array.isArray(color) ? color.join(',') : color);
        params.append('min_price', (minPrice !== null && minPrice !== undefined ? minPrice : 0).toString());
        params.append('max_price', (maxPrice !== null && maxPrice !== undefined ? maxPrice : 10000000).toString());
        params.append('sell_order', sellOrder);

        return params;
    }, []);

    const getFiltersFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        const filters = {
            size: params.get('size'),
            color: params.get('color'),
            minPrice: params.get('min_price'),
            maxPrice: params.get('max_price'),
            sellOrder: params.get('sell_order'),
        };
        return filters;
    }

    return { setFilterParams, getFiltersFromUrl }
};