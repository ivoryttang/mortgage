// @ts-nocheck
import {create} from 'zustand';

export const useClickedConversationStore = create((set) => ({
    clicked: "",
    setClicked: (clicked) => set({ clicked })
}));

export const useStepConversationStore = create((set) => ({
    step: 1,
    setStep: (step) => set({ step })
}));

export const useTranscriptStore = create((set) => ({
    transcript: [],
    setTranscript: (transcript) => set({ transcript })
}));

export const useRecordingStore = create((set) => ({
    recording: "",
    setRecording: (recording) => set({ recording })
}));