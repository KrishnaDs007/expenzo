import { create } from 'zustand';

interface UIStore {
  isPreviewModalOpen: boolean;
  openPreviewModal: () => void;
  closePreviewModal: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isPreviewModalOpen: false,
  openPreviewModal: () => set({ isPreviewModalOpen: true }),
  closePreviewModal: () => set({ isPreviewModalOpen: false }),
}));
