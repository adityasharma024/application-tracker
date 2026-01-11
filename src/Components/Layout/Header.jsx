import {Briefcase,Bell,User} from 'lucide-react';
function Header(){
    return(
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className="flex justify-between items-center py-4">
                    <div className='flex items-center space-x-3'>
                        {/*Left Section - Logo and Title*/}
                        <div className='bg-blue-600 p-2 rounded-lg'>
                            <Briefcase className="w-6 h-6 text-white"/>

                        </div>
                        <div>
                            <h1 className='text-xl font-bold text-gray-900'>
                                Job Tracker
                            </h1>
                            <p className='text-xs text-gray-500'>
                                Manage your job applications effectively
                            </p>
                        </div>
                    </div>
                    {/*Right Section - Actions*/}
                    <div className='flex items-center space-x-4'>
                        {/* Notification Icon */}
                        <button className='relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors'>
                            <Bell className='w-5 h-5'/>
                            {/* Notification Badge */}
                            <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
                        </button>
                        {/* User Profile Icon */}
                        <button className='flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors'>
                            <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center'>
                                <User className='w-5 h-5 text-white'/>
                                
                            </div>
                            <span className='text-sm font-medium text-gray-700'>John Doe</span>
                        </button>
                    </div>
                </div>

            </div>
            
        </header>
       
    );
};
export default Header;