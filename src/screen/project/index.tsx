import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { Kanban } from "screen/kanban";
import { Epic } from "screen/epic";

export const Project = () => {
  return (
    <div>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Navigate to={window.location.pathname + "/kanban"} />
        <Route path={"/kanban"} element={<Kanban />} />
        <Route path={"/epic"} element={<Epic />} />
      </Routes>
    </div>
  );
};
