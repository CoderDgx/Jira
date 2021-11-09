import React from "react";
import { Drawer } from "antd";
import { useProjectModal } from "./utils";

export const ProjectModal = (props: {}) => {
  const { projectModalOpen, close } = useProjectModal();
  return (
    <Drawer onClose={close} visible={projectModalOpen} width={"100%"}>
      <h1>Project Modal</h1>
    </Drawer>
  );
};
