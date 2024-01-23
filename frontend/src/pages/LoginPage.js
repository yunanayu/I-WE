import BasicLayout from "../layouts/BasicLayout";
import GoogleLogin from "./GoogleLoginPage";
import KakaoLogin from "./KakaoLoginPage";
import NaverLogin from "./NaverLoginPage";

const LoginPage = () => {
  return (
    <BasicLayout>
      <div className="flex text-white text-3xl font-bold justify-center">social login</div>
      <div className="bg-white rounded-lg" style={{ padding: "20px"}}>
        <div className="flex justify-between m-4">
          <div className="w-35 h-35">
            <KakaoLogin/>
          </div>
          <div className="w-35 h-35">
            <NaverLogin/>
          </div>
          <div className="w-35 h-35">
            <GoogleLogin/>
          </div>
        </div>
      </div>
      
    </BasicLayout> 
  );
}
 
export default LoginPage;
