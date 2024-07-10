import SideMenuItem from "./side-menu-item";

export default function SideMenu() { 
    return (
        <div className="flex flex-col w-1/4 justify-center p-4 pt-16 h-full text-gray-500">
            <div className="flex flex-col flex-1">
                <SideMenuItem label='Dashboard' route='/'/>
                <SideMenuItem label='Employees' route='/employees'/>
                <SideMenuItem label='Salaries' route='/salaries'/>
            </div>
            <div className="text-center">
                <a href="/api/auth/logout">Logout</a>
            </div>
        </div>
    )
}