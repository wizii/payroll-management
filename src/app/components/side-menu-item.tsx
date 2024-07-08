import Link from "next/link";

type SideMenuItemProps = {
    label: string;
    route: string;
}

// TODO: icons
export default function SideMenuItem(props: SideMenuItemProps) {
    const {route, label} = props;
    
    return (
        <div className="p-2 text-center">
            <Link href={route}>{label}</Link>
        </div>
    );
}