import { useDispatch } from "react-redux";
import { removeCredentials } from "../slices/authSlice";
import { AppDispatch } from "../store";
import { useCheckTokenMutation } from "../slices/api/userApiSlice";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const AuthContext = () => {
  const user = localStorage.getItem("userInfo");
  const dispatch: AppDispatch = useDispatch();
  const [token] = useCheckTokenMutation();

  useEffect(() => {
    const checkToken = async () => {
      try {
        await token().unwrap();
      } catch (error) {
        toast.error("Your session has expired, please login again");
        dispatch(removeCredentials());
      }
    };

    user && checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default AuthContext;
