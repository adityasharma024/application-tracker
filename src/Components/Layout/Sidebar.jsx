import {useState} from 'react';
import { 
  LayoutDashboard, 
  Briefcase,  // ✅ CORRECT spelling
  Calendar, 
  Settings,
  PlusCircle 
} from 'lucide-react';

function Sidebar(){
    const [activeItem,setActiveItem]=useState('dashboard');
    const menuItems=[
        {id:'dashboard',label:'Dashboard',icon:LayoutDashboard},
        {id:'applications',label:'Applications',icon:Briefcase},
        {id:'calendar',label:'Calendar',icon:Calendar},
        {id:'settings',label:'Settings',icon:Settings},
    ];
    return(
        <aside className='w-64 bg-white border-r border-gray-200 min-h-screen'>
            <div className='p-4'>
                {/*Add Application Buttton*/}
                <button className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 mb-6'>
                    <PlusCircle className='w-5 h-5'/>
                    <span>Add Application</span>

                </button>
                {/*Navigation Menu*/}
                <nav className='space-y-1'>
                    {menuItems.map((item)=>{
                        const Icon=item.icon;
                        const isActive=item.id===activeItem;
                        return(
                            <button
                            key={item.id}
                            onClick={()=>setActiveItem(item.id)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transiton-colors font-medium
                                ${isActive? 'bg-blue-100 text-blue-700':'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </button>

                        );
                    })}
                </nav>
                {/*Stats Section*/}
                <div className='mt-8 p-4 bg-gray-50 rounded-lg'>
                    <h3 className='text-xs font-semibold text-gray-500 uppercase mb-3'>
                        Quick Stats
                    </h3>
                    <div className='space-y-2'>
                        <div className='flex justify-between text-sm'>
                            <span className='text-gray-600'>Total Applications</span>
                            <span className='font-bold text-gray-900'>24    </span>

                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-gray-600'>This Month</span>
                            <span className='font-bold text-blue-600'>8 </span>

                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-gray-600'>Offers</span>
                            <span className='font-bold text-green-600'>3 </span>
                            
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )

}
export default Sidebar;

    