import { Topic } from '@/src/types';
import useSWR from 'swr';

const useTopics = () => {
  // Fetch Topics
  const { data, error, isLoading, mutate } = useSWR(
    'https://zenn.dev/api/topics?count=120&order=count&exclude_alias=true&exclude_topicnames=初心者%2Cメモ%2Czenn',
  );

  // Type
  const topics = data?.topics as Array<Topic>;

  return {
    topics,
    error,
    isLoading,
    mutate,
  };
};

export default useTopics;
