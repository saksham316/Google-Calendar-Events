// ---------------Imports------------------
import { useGoogleLogin } from "@react-oauth/google";
import "./signIn.css";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { googleLogin } from "../../redux/actions/authAction";

// ----------------------------------------

// ----------------------------------------
//SignIn
export const SignIn = () => {
  const dispatch = useDispatch();

  const googleAuthRes = (authRes) => {
    try {
      if ("code" in authRes) {
        const { code } = authRes;
        dispatch(googleLogin({ authCode: code }));
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const googleAuthReq = useGoogleLogin({
    onSuccess: googleAuthRes,
    onError: googleAuthRes,
    flow: "auth-code",
    scope: import.meta.env.VITE_GOOGLE_SCOPES,
  });

  return (
    <>
      <div className="sign-in">
        <div className="sign-in__card">
          <div className="sign-in__card-left">
            <img src="/images/authCard.jpg" />
          </div>
          <div className="sign-in__card-right">
            <img src="/images/authCard2.jpg" />
            <div className="sign-in__card-right-inner-card">
              <h1 className="sign-in__card-right-inner-card-title">
                Event Calendar
              </h1>
              <h3 className="sign-in__card-right-inner-card-sub-title">
                Seamlessly connect and create your perfect schedule.
              </h3>
              <div className="sign-in__card-right-inner-card-button">
                <button onClick={googleAuthReq}>
                  <FcGoogle />
                  <p>Sign In With Google</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
