import { Button, Col, Input, Row } from "antd";
import { TaskTypeSelect } from "componment/task-type-select";
import { UserSelect } from "componment/user-select";
import React from "react";
import { useSetUrlSearchParam } from "utils/url";
import { useTasksSearchParams } from "./utils";

export const SearchPanel = () => {
  const searchParams = useTasksSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };

  return (
    <Row gutter={[16, 16]}>
      <Col>
        <Input
          style={{ width: "20rem" }}
          placeholder={"任务名"}
          value={searchParams.name}
          onChange={(evt) => setSearchParams({ name: evt.target.value })}
        />
      </Col>
      <Col>
        <UserSelect
          defaultOptionName="经办人"
          value={searchParams.processorId}
          onChange={(value) => setSearchParams({ processorId: value })}
        />
      </Col>
      <Col>
        <TaskTypeSelect
          defaultOptionName="类型"
          value={searchParams.typeId}
          onChange={(value) => setSearchParams({ typeId: value })}
        />
      </Col>
      <Col>
        <Button onClick={reset}>清除筛选器</Button>
      </Col>
    </Row>
  );
};
