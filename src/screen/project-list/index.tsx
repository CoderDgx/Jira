import React from "react";
import SearchPanel from "./SearchPanel";
import List from "./list";
import styled from "@emotion/styled";
import { useDebounce, useDocumentTitle } from "utils";
import { Row, Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectsSearchParams } from "./utils";
import { useDispatch } from "react-redux";
import { ButtonNopadding } from "componment/lib";
import { projectListActions } from "./project-list.slice";

export const ProjectList = () => {
  const dispatch = useDispatch();
  useDocumentTitle("项目列表", false);
  const [param, setParam] = useProjectsSearchParams();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 500));
  const { data: users } = useUsers();

  return (
    <Container>
      <Row justify="space-between">
        <h1>项目列表</h1>
        <ButtonNopadding
          onClick={() => dispatch(projectListActions.openProjectModal())}
          type="link"
        >
          创建项目
        </ButtonNopadding>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectList;
