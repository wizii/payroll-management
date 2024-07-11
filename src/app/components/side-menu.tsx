import SideMenuItem from "./side-menu-item";

export default function SideMenu() { 
    return (
        <div className="flex flex-col w-1/4 justify-center p-4 pt-16 h-full text-gray-500 items-center">
            <div className="flex flex-col flex-1">
                <SideMenuItem label='Dashboard' iconPath='/icons/dashboard.svg' route='/'/>
                <SideMenuItem label='Employees' iconPath='/icons/employees.svg' route='/employees'/>
                <SideMenuItem label='Salaries'  iconPath='/icons/salaries.svg' route='/salaries'/>
            </div>
            <div className="p-2 text-center flex items-center">
                <div  className="mr-2 w-6 h-6 bg-no-repeat bg-center" style={{ backgroundImage: 'url(/icons/logout.svg)' }}></div>
                <a href="/api/auth/logout">Logout</a>
            </div>
        </div>
    )
}