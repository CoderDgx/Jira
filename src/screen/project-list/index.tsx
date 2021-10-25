import React, { useState, useEffect } from "react";
import SearchPanel from "./SearchPanel";
import List from "./list";
import { useHttp } from "utils/http";
import { cleanObject, useDebounce, useMount } from "utils";

export const ProjectList = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const debouncedParam = useDebounce(param, 1000);
  const client = useHttp();
  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </>
  );
};

export default ProjectList;
