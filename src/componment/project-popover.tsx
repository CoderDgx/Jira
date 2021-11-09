import React from "react";
import { Button, Divider, List, Popover, Typography } from "antd";
import { useProjects } from "utils/project";
import styled from "@emotion/styled";
import { ButtonNopadding } from "./lib";
import { useProjectModal } from "screen/project-list/utils";
import { useNavigate } from "react-router-dom";

export const ProjectPopover = () => {
  const { data: projects } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin);
  const { open } = useProjectModal();
  const navigate = useNavigate();
  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNopadding type="link" onClick={open}>
        创建项目
      </ButtonNopadding>
    </ContentContainer>
  );
  return (
    <Popover placement="bottom" content={content}>
      <Button type="text" onClick={() => navigate("/projects")}>
        项目
      </Button>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
