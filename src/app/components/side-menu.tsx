import SideMenuItem from "./side-menu-item";

export default function SideMenu() {
    return (
        <div className="flex flex-col w-1/3">
            <SideMenuItem label='Employees' route='/employees'/>
            <SideMenuItem label='Salaries' route='/salaries'/>
        </div>
    )
}