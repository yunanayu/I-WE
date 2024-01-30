import Basic from "../components/navbar/Basic";


const BasicLayout = ({children}) => {
  return ( 
  <>

    {/* 기존 헤더 대신 Basic*/ }
    <Basic/> 


    {/* 기본 */}
    {/* 상단 여백 my-5 제거 */}
    <h1 className="text-2xl md:text-4xl">이거 레이아웃 할까말까 안해</h1>

  </>
  );
}

export default BasicLayout;
