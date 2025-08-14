import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // Import the Supabase client
import Checkbox from "../components/DietaryPreferences/CheckBox";

function Profile() {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(null);
  const [Filters, setFilters] = useState({
    diets: []
  })

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

  const handleFilters = (filters, category) => {
    console.log(filters)

    const newFilters = { ...Filters }

    newFilters[category] = filters

    
    setFilters(newFilters)
  }

  return (
    <div>
      <h1>Hello, {userName || 'User'}!</h1>
      <h1>Your Dietary Preferences:</h1>
      <Checkbox 
        handleFilters={filters => handleFilters(filters, "diets")}
      />
    </div>
  );
}

export default Profile;
