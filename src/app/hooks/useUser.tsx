import { User } from '@/src/types';
import useSWR from 'swr';

const useUser = (username: string) => {
  // Fetch User
  const { data, error, isLoading, mutate } = useSWR(
    `https://zenn.dev/api/articles?username=${username}&order=latest`,
  );

  // Type
  const user = data?.user as User;

  return {
    user,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
