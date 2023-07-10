import { useDispatch, useSelector } from "react-redux";
import { changeToken, removeCredentials } from "../slices/authSlice";
import { AppDispatch, RootState } from "../store";
import { useCheckTokenMutation } from "../slices/api/userApiSlice";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const AuthContext = () => {
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch: AppDispatch = useDispatch();
  const [token] = useCheckTokenMutation();
  useEffect(() => {
    const checkToken = async () => {
      try {
        if (user) {
          const res = await token({
            username: user?.username,
            id: user?.id,
          }).unwrap();
          dispatch(changeToken(res));
        }
      } catch (error) {
        toast.error("Your session has expired, please login again");
        dispatch(removeCredentials());
      }
    };

    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default AuthContext;
