import { useCallback } from 'react';

export const useFilterParams = () => {

    const setFilterParams = useCallback((dataFilter?: any) => {
        if (!dataFilter) return;

        const {limit = 12,page = 1, sellOrder = '', color = [], minPrice, maxPrice, size = [] ,category=''} = dataFilter;
        console.log(size)

        const params = new URLSearchParams();

        params.append('category',category);
        params.append('limit', limit || 12);
        params.append('page', page || 1);
        params.append('size',size?.length>0? size.join(','):'');
        params.append('color', Array.isArray(color) ? color.join(',') : color || '');
        params.append('min_price', (minPrice !== null && minPrice !== undefined ? minPrice : 0).toString());
        params.append('max_price', (maxPrice !== null && maxPrice !== undefined ? maxPrice : 10000000).toString());
        params.append('sell_order', sellOrder || '');               

        return params;
    }, []);

    const getFiltersFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        const filters = {
            category : params.get('category'),
            limit : params.get('limit'),
            page : params.get('page'),
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