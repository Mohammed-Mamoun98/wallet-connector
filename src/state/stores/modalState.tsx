import { create } from "zustand";
import { ModalState } from "../types/modal";
import Modal from "src/components/Shared/Modal/Modal";

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  content: <></>,
  openModal: (payload) => set({ isOpen: true, content: payload.modalContent }),
  closeModal: () => set({ isOpen: false, content: <></> }),
}));
