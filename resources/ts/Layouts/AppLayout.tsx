import Header from '../Components/Header';
import React from 'react';

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
            <footer>
                <p>App Footer</p>
            </footer>
        </div>
    );
};

export default AppLayout;