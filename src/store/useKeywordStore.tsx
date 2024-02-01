import { create } from 'zustand';

type Store = {
  keyword: string;
};

type Action = {
  setKeyword: (keyword: string) => void;
  removeKeyword: () => void;
};

const useKeywordStore = create<Store & Action>()((set) => ({
  keyword: '',
  setKeyword: (keyword) => set(() => ({ keyword: keyword })),
  removeKeyword: () => set({ keyword: '' }),
}));

export default useKeywordStore;
