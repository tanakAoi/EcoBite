import { usePage } from '@inertiajs/react';
import Header from '../Components/Header';
import React from 'react';

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const { auth } = usePage().props; 

    return (
        <div>
            <Header auth={auth} />
            <main className='my-10 mx-auto px-10'>{children}</main>
            <footer>
                <p>App Footer</p>
            </footer>
        </div>
    );
};

export default AppLayout;