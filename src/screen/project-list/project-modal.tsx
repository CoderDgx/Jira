import React, { useEffect } from "react";
import { Button, Drawer, Form, Input, Spin } from "antd";
import { useProjectModal, useProjectsQueryKey } from "./utils";
import { UserSelect } from "componment/user-select";
import { useAddProject, useEditProject } from "utils/project";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "componment/lib";
import styled from "@emotion/styled";

export const ProjectModal = (props: {}) => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModal();
  const title = editingProject ? "编辑项目" : "创建项目";

  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateProject(useProjectsQueryKey());

  const [form] = useForm();

  const closeModal = () => {
    form.resetFields();
    close();
  };

  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      closeModal();
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  return (
    <Drawer
      forceRender={true}
      onClose={closeModal}
      visible={projectModalOpen}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              layout="vertical"
              style={{ width: "40rem" }}
              onFinish={onFinish}
              form={form}
            >
              <Form.Item
                label="名称"
                name="name"
                rules={[{ required: true, message: "请输入项目名" }]}
              >
                <Input placeholder="请输入项目名称" />
              </Form.Item>
              <Form.Item
                label="部门"
                name="organization"
                rules={[{ required: true, message: "请输入部门名" }]}
              >
                <Input placeholder="请输入部门名称" />
              </Form.Item>
              <Form.Item label="负责人" name="personId">
                <UserSelect defaultOptionName="负责人" />
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={mutateLoading}
                  type="primary"
                  htmlType="submit"
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
