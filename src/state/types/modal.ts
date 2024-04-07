interface OpenPayload {
  modalContent: JSX.Element;
}

export interface ModalState {
  isOpen: boolean;
  content: JSX.Element;
  openModal: (payload: OpenPayload) => void;
  closeModal: () => void;
}
