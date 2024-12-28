// ---------------Imports------------------
import { useGoogleLogin } from "@react-oauth/google";
import "./signIn.css";
import { FcGoogle } from "react-icons/fc";

// ----------------------------------------

// ----------------------------------------
//SignIn
export const SignIn = () => {
  const googleAuthRes = (authRes) => {
    try {
      console.log("authRes", authRes);
    } catch (error) {
      console.error("error", error);
    }
  };

  const googleAuthReq = useGoogleLogin({
    onSuccess: googleAuthRes,
    onError: googleAuthRes,
    flow: "auth-code",
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
                  Sign In With Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
