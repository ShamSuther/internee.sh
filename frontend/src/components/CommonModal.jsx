import React from "react";
import { Modal, ScrollArea } from "@mantine/core";

const CommonModal = ({ title, children, opened, handlers, rest }) => {
  const { close } = handlers;
  return (
    <Modal
      centered
      radius={"lg"}
      opened={opened}
      onClose={close}
      title={title}
      closeButtonProps={{ 'aria-label': 'Close modal' }}
      overlayProps={{ backgroundOpacity: 0.55, blur: 2 }}
      scrollAreaComponent={ScrollArea.Autosize}
      {...rest}
    >
      {children}
    </Modal>
  );
};

export default CommonModal;
