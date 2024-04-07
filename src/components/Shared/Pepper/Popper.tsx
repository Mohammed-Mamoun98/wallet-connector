import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Popper.scss";
import { useClickAway } from "src/hooks/useClickAway/useClickAway";

export interface IPopper {
  children: JSX.Element;
  content?: JSX.Element;
  disabled?: boolean;
  closeOnContentClick?: boolean;
  onToggle?: (isOpened: boolean) => void;
}

export function Popper({
  children,
  content,
  disabled,
  closeOnContentClick = false,
  onToggle = () => null,
}: IPopper) {
  const [modalShown, setModalShown] = useState<boolean>(false);
  const clickAwayRef = useRef<HTMLDivElement | null>(null);

  useClickAway(clickAwayRef, () => setModalShown(false));

  const openModal = useCallback(() => setModalShown(true), [setModalShown]);
  const closeModal = useCallback(() => setModalShown(false), [setModalShown]);

  const toggleOpen = useCallback(
    () => setModalShown(!modalShown),
    [setModalShown, modalShown]
  );

  const onWrapperClick = closeOnContentClick ? closeModal : openModal;

  useEffect(() => {
    onToggle(modalShown);
  }, [modalShown]);

  return (
    <div className="inline-popper-wrapper" ref={clickAwayRef}>
      <div className="content-wrapper" onClick={toggleOpen}>
        {children}
      </div>
      <div className="popper-content-wrapper" onClick={onWrapperClick}>
        {!disabled && modalShown && (
          <div className="popper-content">{content}</div>
        )}
      </div>
    </div>
  );
}
