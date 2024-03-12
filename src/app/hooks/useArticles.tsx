import { Article } from '@/src/types';
import useSWR from 'swr';

const useArticles = () => {
  // Fetch Articles
  const { data, error, isLoading, mutate } = useSWR(
    'https://zenn.dev/api/articles',
  );

  // Type
  const articles = data?.articles as Array<Article>;

  return {
    articles,
    error,
    isLoading,
    mutate,
  };
};

export default useArticles;
