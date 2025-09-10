import React, { createContext, useState, useContext } from 'react';

const FilterContext = createContext();

export const useFilters = () => {
    return useContext(FilterContext);
}

export const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        diets: [],
        intoleraces: []
    });

    const updateFilters = (newFilters) => {
        setFilters(newFilters);
    }

    const value = {
        filters,
        updateFilters
    };

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    );
};