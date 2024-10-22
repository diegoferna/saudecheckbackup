import { Outlet } from "react-router-dom";
import { SideBar } from "../../components/Sidebar";
import { Header } from "../../components/Header";


export function DefaultLayout() {
  return (
    <>
      <div
        className="sb-nav-fixed container-fluid"
      >
        <Header />
        <div id="layoutSidenav">
          <SideBar />
          <div id="layoutSidenav_content">
            <Outlet />
          </div>
        
        </div>
      
      </div>
    </>
  );
}
//<Footer />
