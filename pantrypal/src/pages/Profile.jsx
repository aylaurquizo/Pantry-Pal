import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // Import the Supabase client

function Profile() {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the authenticated user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          setError('Unable to fetch user');
          return;
        }

        const { data, error: fetchError } = await supabase
          .from('User')
          .select('name')
          .eq('email', user.email)
          .single(); 

        if (fetchError) {
          setError('Error fetching user data');
        } else {
          setUserName(data.name);
        }
      } catch (error) {
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
