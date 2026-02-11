import { 
  LayoutDashboard, 
  Briefcase, 
  Calendar, 
  Settings,
  PlusCircle,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useSelector } from 'react-redux';

function Sidebar({ currentPage, onPageChange }) {
  
  // Get real data from Redux
  const applications = useSelector((state) => state.applications.applications);
  
  // Calculate real stats
  const stats = {
    total: applications.filter(app => !app.archived).length,
    active: applications.filter(app => 
      app.status === 'hr-round' || app.status === 'technical-round'
    ).length,
    offers: applications.filter(app => app.status === 'offer').length,
    thisMonth: applications.filter(app => {
      const appDate = new Date(app.dateApplied);
      const now = new Date();
      return appDate.getMonth() === now.getMonth() && 
             appDate.getFullYear() === now.getFullYear();
    }).length
  };
  
  // Menu items configuration
  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard,
      badge: null
    },
    { 
      id: 'view', 
      label: 'Applications', 
      icon: Briefcase,
      badge: stats.total
    },
    { 
      id: 'addApplication', 
      label: 'Add New', 
      icon: PlusCircle,
      badge: null
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings,
      badge: null
    },
  ];
  
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-4">
        
        {/* Navigation Menu */}
        <nav className="space-y-1 mb-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`
                  w-full flex items-center justify-between px-4 py-3 rounded-lg
                  transition-colors font-medium
                  ${isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                
                {item.badge !== null && (
                  <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
        
        {/* Quick Stats Section */}
        <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-gray-900">
              Quick Stats
            </h3>
          </div>
          
          <div className="space-y-3">
            {/* Total Applications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">Total</span>
              </div>
              <span className="font-bold text-blue-900">{stats.total}</span>
            </div>
            
            {/* Active Interviews */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-gray-700">Active</span>
              </div>
              <span className="font-bold text-yellow-900">{stats.active}</span>
            </div>
            
            {/* Offers */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Offers</span>
              </div>
              <span className="font-bold text-green-900">{stats.offers}</span>
            </div>
            
            {/* This Month */}
            <div className="flex items-center justify-between pt-3 border-t border-blue-200">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-gray-700">This Month</span>
              </div>
              <span className="font-bold text-purple-900">{stats.thisMonth}</span>
            </div>
          </div>
        </div>
        
        {/* Progress Indicator */}
        {stats.total > 0 && (
          <div className="mt-4 p-3 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-600">Success Rate</span>
              <span className="text-xs font-bold text-green-600">
                {((stats.offers / stats.total) * 100).toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(stats.offers / stats.total) * 100}%` }}
              />
            </div>
          </div>
        )}
        
      </div>
    </aside>
  );
}

export default Sidebar;