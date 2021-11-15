import React from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import { useDebounce, useDocumentTitle } from "utils";
import { Row } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectModal, useProjectsSearchParams } from "./utils";
import { ButtonNopadding, ErrorBox, ScreenContainer } from "componment/lib";

export const ProjectList = () => {
  useDocumentTitle("项目列表", false);
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 500));
  const { data: users } = useUsers();
  const { open } = useProjectModal();
  return (
    <ScreenContainer>
      <Row justify="space-between">
        <h1>项目列表</h1>
        <ButtonNopadding type="link" onClick={open}>
          创建项目
        </ButtonNopadding>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <ErrorBox error={error} />
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </ScreenContainer>
  );
};

export default ProjectList;
