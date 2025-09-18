import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const FilterContext = createContext();

export const useFilters = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                if (session) {
                    //user is logged in, fetch preferences
                    const { user } = session;
                    const { data, error } = await supabase
                        .from('user_preferences')
                        .select('selected_filter_ids')
                        .eq('user_id', user.id)
                        .single();

                    if (data && data.selected_filter_ids) {
                        setSelectedIds(data.selected_filter_ids);
                    } else if (error && error.code !== 'PGRST116') {
                        //if no rows are found
                        console.error("Error fetching preferences:", error);
                    }
                } else {
                    //user is not logged in, clear preferences
                    setSelectedIds([]);
                }
            }
        );
        return () => subscription.unsubscribe();
    }, []);

    const updateFilters = async (newIds) => {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return;

        setSelectedIds(newIds);

        const { error } = await supabase
            .from('user_preferences')
            .upsert({
                user_id: user.id,
                selected_filter_ids: newIds
            }, { onConflict: 'user_id' });

        if(error) {
            console.error("Error saving preferences:", error);
        }
    };

    const value = {
        selectedIds, updateFilters
    };

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    );
};