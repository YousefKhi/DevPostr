import Link from "next/link";
import logo from "@/app/icon.png";
import config from "@/config";

export default function LogoName() {
    return ( 
        <div className="flex lg:flex-1">
          <Link
            className="flex items-center gap-2 shrink-0"
            href="/"
            title={`${config.appName} homepage`}
          >
            <img src={logo} className="h-8 w-auto" />
            <span className="text-xl font-bold">{config.appName}</span>
          </Link>
        </div>
    );
}
