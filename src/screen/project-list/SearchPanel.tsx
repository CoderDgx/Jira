import React, { FC } from "react";
import { Form, Input } from "antd";
import { Project } from "./list";
import { UserSelect } from "componment/user-select";

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
}

const SearchPanel: FC<SearchPanelProps> = (props) => {
  const { param, setParam } = props;
  return (
    <Form layout="inline" style={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input
          type="text"
          placeholder="项目名"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName={"负责人"}
          value={param.personId}
          onChange={(value: number | undefined) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        />
      </Form.Item>
    </Form>
  );
};

export default SearchPanel;
