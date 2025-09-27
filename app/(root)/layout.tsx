import { ReactNode } from 'react'
import Header from '@/components/Header'

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <main className={'min-h-screen text-gray-400'}>
            <div className={'container py-10'}>
                <Header />

                {children}
            </div>
        </main>
    )
}
export default Layout
