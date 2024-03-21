// @ts-nocheck
import {create} from 'zustand';

export const useClickedConversationStore = create((set) => ({
    clicked: 0,
    setClicked: (clicked) => set({ clicked })
  }));