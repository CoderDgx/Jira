import React from "react";
import SearchPanel from "./SearchPanel";
import List from "./list";
import styled from "@emotion/styled";
import { useDebounce, useDocumentTitle } from "utils";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectsSearchParams } from "./utils";

export const ProjectList = () => {
  useDocumentTitle("项目列表", false);
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 500));
  const { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectList;
