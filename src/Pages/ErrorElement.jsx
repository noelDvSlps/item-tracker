import { useRouteError } from "react-router-dom";

export const ErrorElement = () => {
  const error = useRouteError();
  return (
    <div>
      <h2>ERROR</h2>
      <p>{error.message}</p>
    </div>
  );
};
