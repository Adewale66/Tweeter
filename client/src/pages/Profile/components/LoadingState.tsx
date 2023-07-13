import { Loader } from "@mantine/core";

const LoadingState = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Loader variant="bars" />
    </div>
  );
};

export default LoadingState;
