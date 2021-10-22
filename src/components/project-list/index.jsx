import React, { useState, useEffect } from "react";
import qs from "qs";
import SearchPanel from "./SearchPanel";
import List from "./list";
import { cleanObject } from "utils";

const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectList = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  console.log(cleanObject(param))
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(
      async (response) => {
        if (response.ok) {
          setList(await response.json());
        }
      }
    );
  }, [param]);

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, [param]);
  return (
    <>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </>
  );
};

export default ProjectList;
