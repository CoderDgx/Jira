import { useEffect } from "react";
import { Project } from "screen/project-list/list";
import { useAsync } from "./useAsync";
import { useHttp } from "utils/http";
import { cleanObject } from "utils";
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
