import React, { useEffect, useRef, Fragment } from "react";
import { ModalContainer, ModalContent, CloseButton } from "./styles";
import Icon from "../Icon";
import smoothScrollTo, { sleep } from "../../utils";

// MARK: Types

type Props = {
  /** true or false if the modal is visible */
  isOpen: boolean;
  /** function to hide this modal */
  hideFunc: () => void;
  children: React.ReactNode;
};

// MARK: Component

/**
 * A reusable modal/popup component.
 * The hideFunc prop is passed down so that the modal is closable by clicking outside the popup.
 * You can also optionally pass in a function that is called when the user presses the enter key.
 *
 * Can be dismissed with the Esc key and submitted with enter
 *
 * Example usage:
 *
 * <Modal isOpen={this.state.modalIsOpen} hideFunc={this.hideModal}>
 *   This is the content of the popup
 * </Modal>
 */
function Modal({ isOpen, hideFunc, children }: Props) {
  const scrollAnchorRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(
    () => {
      if (isOpen) {
        window.addEventListener("keydown", keyListener);
        document.body.classList.add("no-scroll");
      } else {
        window.removeEventListener("keydown", keyListener);
        document.body.classList.remove("no-scroll");
      }

      return () => {
        window.removeEventListener("keydown", keyListener);
      };
    },
    [isOpen, keyListener],
  );

  /**
   * Listen for keydown events so the user can close the modal with Esc
   */
  function keyListener(event: KeyboardEvent) {
    if (event.key === "Escape" && isOpen) {
      hideModal();
    }
  }

  function contentClickHandler(event: React.MouseEvent) {
    // stop the click on the modal to propagate to the container
    // to prevent the modal from being closed.
    event.stopPropagation();
  }

  async function hideModal() {
    hideFunc();
    await smoothScrollTo(containerRef.current!, 0, 400);
  }

  return (
    <Fragment>
      <ModalContainer
        className={`modal ${isOpen ? "open" : "closed"}`}
        onClick={hideModal}
        ref={containerRef}
      >
        <ModalContent
          className={`modal ${isOpen ? "open" : "closed"}`}
          onClick={contentClickHandler}
        >
          <div className="scroll-anchor" ref={scrollAnchorRef} />
          {children}
        </ModalContent>
      </ModalContainer>

      {/*
        If this button is inside ModalContainer, it will jump around when
        scrolling up and down on iPhone
      */}
      {isOpen && (
        <CloseButton onClick={hideModal}>
          <Icon icon="far times" />
        </CloseButton>
      )}
    </Fragment>
  );
}

export default Modal;
