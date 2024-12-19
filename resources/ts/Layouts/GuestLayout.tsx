import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import LogoHorizontal from '../Components/LogoHorizontal';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col gap-4 md:gap-8 items-center pt-6 sm:justify-center">
            <div>
                <Link href={route("home")}>
                   <LogoHorizontal />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-light/80 px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
