import { useState } from "react";
import useCustomSignup from "../../hooks/useCustomSignup";

const initState = {
  email: '',
  pw: '',
  name: '',
};

const SignupComponent = () => {
  const [signupParam, setSignupParam] = useState({ ...initState });

  const { doSignup, moveToPath } = useCustomSignup();

  const handleChange = (e) => {
    setSignupParam({
      ...signupParam,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickSignup = (e) => {
    doSignup(signupParam)
      .then((data) => {
        console.log(data);

        if (data.error) {
          alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        } else {
          alert("회원가입이 완료되었습니다. 로그인해주세요.");
          moveToPath("/");
        }
      });
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      <div className="flex justify-center">
        <div className="text-4xl m-4 p-4 font-extrabold text-blue-500">
          Signup Component
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-full p-3 text-left font-bold">Email</div>
          <input
            className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
            name="email"
            type="text"
            value={signupParam.email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-full p-3 text-left font-bold">Password</div>
          <input
            className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
            name="pw"
            type="password"
            value={signupParam.pw}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-full p-3 text-left font-bold">Name</div>
          <input
            className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
            name="name"
            type="text"
            value={signupParam.name}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full justify-center">
          <div className="w-2/5 p-6 flex justify-center font-bold">
            <button
              className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
              onClick={handleClickSignup}
            >
              SIGNUP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
