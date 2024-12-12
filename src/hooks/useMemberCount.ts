import { useState, useEffect } from 'react';
import { fetchMemberCount, subscribeMemberCount } from '../lib/utils/userUtils';

export const useMemberCount = () => {
  const [memberCount, setMemberCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    // Initial fetch
    fetchMemberCount()
      .then(count => {
        if (isMounted) {
          setMemberCount(count);
          setError(null);
        }
      })
      .catch(error => {
        if (isMounted) {
          console.error('Error fetching initial count:', error);
          setError('Failed to load member count');
          setMemberCount(null);
        }
      });

    // Set up real-time listener
    const unsubscribe = subscribeMemberCount(
      (newCount) => {
        if (isMounted) {
          setMemberCount(newCount);
          setError(null);
        }
      },
      (error) => {
        if (isMounted) {
          console.error('Error in member count subscription:', error);
          setError('Failed to update member count');
        }
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  return { memberCount, error };
};