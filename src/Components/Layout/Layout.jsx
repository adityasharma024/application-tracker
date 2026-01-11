import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
function Layout({children}){
    return (
        <div className='min-h-screen bg-gray-50'>
            <Header/>
            <div className='flex'>
                <Sidebar/>
                <main className='flex-1 p-6'>
                    {children}
                </main>
            </div>
        </div>
    );

}
export default Layout;
