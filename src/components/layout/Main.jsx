import { useState } from 'react';
import { LogOut, Menu } from "lucide-react";
import { routes } from '../../constant';

const Main = ({ children }) => {
  const [activeRoute, setActiveRoute] = useState(routes[0].path);

  return (
    <div className="flex h-screen">
      <div className={`w-64 bg-gray-100 p-4 h-screen flex flex-col transition-width duration-300`}>
        <div className="flex items-center mb-4">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-2" />

          <div className='flex items-center'>
            <h2 className="text-sm font-bold">Employee Management</h2>
            <LogOut onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.reload();
            }} className="w-4 h-4 ml-2 cursor-pointer" />

          </div>

          <button className="absolute top-4 right-4" >
            <Menu className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1">
          <ul>
            {routes.map((route) => (
              <li
                key={route.path}
                className={`mb-2 ${activeRoute === route.path ? 'bg-gray-200' : ''} p-2 rounded-lg cursor-pointer`}
                onClick={() => setActiveRoute(route.path)}
              >
                <div className="flex items-center">
                  {route.icon}
                  {<span className="ml-2">{route.name}</span>}
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex-1 p-4">
        {children}
      </div>
    </div>
  );
};

export default Main;
