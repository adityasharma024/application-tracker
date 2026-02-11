import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
function Layout({children,currentPage,onPageChange}) {
    return (
        <div className='min-h-screen bg-gray-50'>
            <Header/>
            <div className='flex'>
                <Sidebar currentPage={currentPage} onPageChange={onPageChange}/>
                <main className='flex-1 p-6'>
                    {children}
                </main>
            </div>
        </div>
    );

}
export default Layout;
