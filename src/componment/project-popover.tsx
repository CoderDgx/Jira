import React from "react";
import { Button, Divider, List, Popover, Typography } from "antd";
import { useProjects } from "utils/project";
import styled from "@emotion/styled";

export const ProjectPopover = (props: { projectButton: JSX.Element }) => {
  const { projectButton } = props;
  const { data: projects } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin);
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
      {projectButton}
    </ContentContainer>
  );
  return (
    <Popover placement="bottom" content={content}>
      <Button type="text">项目</Button>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
