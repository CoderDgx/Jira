import React, { FC } from "react";
import { Dropdown, Menu, Modal, Table, TableProps } from "antd";
import { User } from "../../types/user";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "./pin";
import { useDeleteProject, useEditProject } from "utils/project";
import { ButtonNopadding } from "componment/lib";
import { useProjectModal, useProjectsQueryKey } from "./utils";
import { Project } from "types/projects";

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
}

const List: FC<ListProps> = (props) => {
  const { users, ...otherProps } = props;
  const { mutate } = useEditProject(useProjectsQueryKey());
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  return (
    <Table
      pagination={false}
      rowKey={"id"}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return <More project={project} />;
          },
        },
      ]}
      {...otherProps}
    />
  );
};

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "确定删除这个项目吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        deleteProject({ id });
      },
    });
  };
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"edit"}>
            <ButtonNopadding type="link" onClick={editProject(project.id)}>
              编辑
            </ButtonNopadding>
          </Menu.Item>
          <Menu.Item key={"delete"}>
            <ButtonNopadding
              type="link"
              onClick={() => confirmDeleteProject(project.id)}
            >
              删除
            </ButtonNopadding>
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNopadding type="link">...</ButtonNopadding>
    </Dropdown>
  );
};

export default List;
