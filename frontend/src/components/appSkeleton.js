import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Header, SidebarMenu } from ".";

const AppSkeleton = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleHamburgerClick = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeDrawer = () => {
        setSidebarOpen(false);
    };

    return (
        <div>
            <Header menuClick={handleHamburgerClick} />
            <SidebarMenu isOpen={sidebarOpen} close={closeDrawer} />
            <Outlet />
        </div>
    )
}

export default AppSkeleton;
