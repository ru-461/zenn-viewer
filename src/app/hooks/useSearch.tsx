import useSWR from 'swr';

const useSearch = (query: string) => {
  // Fetch results
  const { data, error, isLoading, mutate } = useSWR(
    `https://zenn.dev/api/search?q=${query}&order=daily&source=articles`,
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useSearch;
