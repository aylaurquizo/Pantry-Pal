import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // Import the Supabase client

function Profile() {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        // Get the authenticated user
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

  return (
    <div>
      <h1>Hello, {userName || 'User'}!</h1>
      
    </div>
  );
}

export default Profile;
