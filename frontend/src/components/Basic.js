import { Link } from "react-router-dom";

const Basic = () => {
  return (  
  <nav id='navbar' className=" flex  bg-blue-300">

    <div className="w-4/5 bg-gray-500" >
      <ul className="flex p-4 text-white font-bold">
        <li className="pr-6 text-2xl">
          <Link to={'/'}>Main</Link>
        </li>
        
      </ul>
    </div>

    <div className="w-1/5 flex justify-end bg-orange-300 p-4 font-medium">
        <div className="text-white text-sm m-1 rounded" >
          <a className="pr-6 text-2xl">
            <Link to={'/login'}>Login</Link>
          </a>
        </div>
    </div>
  </nav>
  );
}
 
export default Basic;
