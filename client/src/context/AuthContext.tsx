import { useSelector, useDispatch } from "react-redux";
import { removeCredentials } from "../slices/authSlice";
import { RootState, AppDispatch } from "../store";
import { useCheckTokenQuery } from "../slices/api/userApiSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const AuthContext = () => {
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch: AppDispatch = useDispatch();
  const { error } = useCheckTokenQuery();

  useEffect(() => {
    if (user) {
      if (error) {
        const { status } = error as FetchBaseQueryError;
        console.log(status);

        if (status === 401) {
          dispatch(removeCredentials());
          toast.error("Token expired, please login again");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default AuthContext;
