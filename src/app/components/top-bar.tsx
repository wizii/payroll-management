import Image from "next/image"

// TODO: Add page title
export default function TopBar() {
    return (
        <div className="flex h-16 w-full justify-end w-full">
            <Image src='/logo.svg' width={415} height={70} alt='Logo'></Image>
        </div>
    )
}