import React, { useRef } from "react";
import "./Modal.scss";
import { useClickAway } from "src/hooks/useClickAway/useClickAway";
import { useModalStore } from "src/state/stores/modalState";

export default function Modal() {
  const { isOpen, content, closeModal } = useModalStore();

  const clickAwayRef = useRef<HTMLDivElement | null>(null);
  useClickAway(clickAwayRef, closeModal);

  if (!isOpen) return <></>;

  return (
    <div className="modal-wrapper ">
      <div
        className="modal-content  md:w-[300px] w-[90%] z-[100]"
        ref={clickAwayRef}
      >
        {content}
      </div>
    </div>
  );
}
