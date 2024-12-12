import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { fetchMemberCount, subscribeMemberCount } from '../../lib/utils/userUtils';

export const MemberCount: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const initializeMemberCount = async () => {
      try {
        // Initial fetch
        const initialCount = await fetchMemberCount();
        setCount(initialCount);
        setError(null);

        // Set up real-time listener
        unsubscribe = subscribeMemberCount(
          (newCount) => {
            setCount(newCount);
            setError(null);
          },
          (error) => {
            console.error('Error in member count subscription:', error);
            setError('Failed to update member count');
          }
        );
      } catch (error) {
        console.error('Error fetching initial count:', error);
        setError('Failed to load member count');
      }
    };

    initializeMemberCount();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  if (error) {
    return (
      <div className="flex items-center text-red-600">
        <Users className="w-4 h-4 mr-2" />
        <span>{error}</span>
      </div>
    );
  }

  if (count === null) {
    return (
      <div className="flex items-center text-gray-400">
        <Users className="w-4 h-4 mr-2" />
        <span>Loading members...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center text-gray-600">
      <Users className="w-4 h-4 mr-2" />
      <span>{count} member{count !== 1 ? 's' : ''}</span>
    </div>
  );
};