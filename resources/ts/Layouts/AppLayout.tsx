import React from 'react';

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <div>
            <header>
                <h1>App Header</h1>
            </header>
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