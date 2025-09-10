import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; 
import Checkbox, { dietOptions } from "../components/DietaryPreferences/CheckBox";
import { useFilters } from '../contexts/FilterContext';

function Profile() {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(null);
  const { updateFilters } = useFilters();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Unable to fetch user');

        const { data, error: fetchError } = await supabase
          .from('pantrypal_users')
          .select('name')
          .eq('id', user.id);

          console.log(data);

        if (fetchError) {
          setError('Error fetching user data');
        } else if (data && data.length > 0) {
          setUserName(data[0].name);
        } else {
          setError('User not found.')
        }
      } catch (error) {
        setError('An unexpected error occurred');
      }
    };

    fetchUserName();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }


  const handleFilters = (selectedIds) => {
    const newFilters = {
      diets: [],
      intolerances: []
    };

    selectedIds.forEach(id => {
      const option = dietOptions.find(opt => opt._id == id);
      if (option) {
        if(option.type === 'diet') {
          newFilters.diets.push(option.paramName);
        } else if (option.type === 'intolerance') {
          newFilters.intolerances.push(option.paramName);
        }
      }
    });

    updateFilters(newFilters);
  }

  return (
    <div>
      <h1>Hello, {userName || 'User'}!</h1>
      <h1>Your Dietary Preferences:</h1>
      <Checkbox 
        handleFilters={handleFilters}
      />
    </div>
  );
}

export default Profile;
