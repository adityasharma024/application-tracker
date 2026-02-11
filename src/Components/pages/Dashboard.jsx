import React from 'react'
import { useSelector } from 'react-redux'
import StatsDashboard from '../application/StatsDashboard';
import ApplicationTrendsChart from '../dashboard/ApplicationTrendsChart';
import StatusDistributionChart from '../dashboard/StatusDistributionChart';
import { Calendar, PieChart, TrendingUp } from 'lucide-react';

const Dashboard = () => {
    const applications=useSelector((state)=>state.applications.applications);
    const activeApplications=applications.filter(app=>!app.archived);
    
  return (
    <div className='mx-w-7xl mx-auto'>
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
               📊 Dashboard
            </h1>
            <p className='text-gray-600'>
                Track your job application progress and analytics
            </p>

        </div>
        <StatsDashboard applications={activeApplications}/>
       
        {activeApplications.length>0?(
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6" >
                <ApplicationTrendsChart applications={activeApplications}/>
                <StatusDistributionChart applications={activeApplications}/>

            </div>
        ):(
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <div className="max-w-md mx-auto">
                    <div className="flex justify-center space-x-3 mb-4">
                       <TrendingUp className='w-12 h-12 text-gray-400'/>
                       <PieChart className='w-12 h-12 text-gray-400'/>
                       <Calendar className='w-12 h-12 text-gray-400'/>



                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    No Data to Display Yet
                    </h2>
                    <p className="text-gray-600 mb-6">
                    Start adding job applications to see beautiful charts and analytics here!
                    </p>
                    <p className="text-sm text-gray-500">
                    Your dashboard will show trends, status distribution, and insights once you add applications.
                    </p>
                    
                </div>

            </div>

        )}
        {activeApplications.length >= 5 && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-purple-900 mb-3">
            💡 Quick Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-60 rounded-lg p-4">
              <p className="text-sm text-purple-700 mb-1">Most Active Month</p>
              <p className="text-lg font-bold text-purple-900">
                {/* Calculate most active month */}
                {(() => {
                  const months = {};
                  activeApplications.forEach(app => {
                    const month = new Date(app.dateApplied).toLocaleDateString('en-US', { month: 'long' });
                    months[month] = (months[month] || 0) + 1;
                  });
                  const mostActive = Object.entries(months).sort((a, b) => b[1] - a[1])[0];
                  return mostActive ? mostActive[0] : 'N/A';
                })()}
              </p>
            </div>
            
            <div className="bg-white bg-opacity-60 rounded-lg p-4">
              <p className="text-sm text-purple-700 mb-1">Average Response Time</p>
              <p className="text-lg font-bold text-purple-900">
                {/* Calculate average days to first status change */}
                {(() => {
                  const appsWithHistory = activeApplications.filter(app => 
                    app.statusHistory && app.statusHistory.length > 0
                  );
                  if (appsWithHistory.length === 0) return 'N/A';
                  
                  const avgDays = appsWithHistory.reduce((sum, app) => {
                    const applied = new Date(app.dateApplied);
                    const firstChange = new Date(app.statusHistory[0].changedAt);
                    const days = Math.ceil((firstChange - applied) / (1000 * 60 * 60 * 24));
                    return sum + days;
                  }, 0) / appsWithHistory.length;
                  
                  return `${Math.round(avgDays)} days`;
                })()}
              </p>
            </div>
            
            <div className="bg-white bg-opacity-60 rounded-lg p-4">
              <p className="text-sm text-purple-700 mb-1">Success Rate</p>
              <p className="text-lg font-bold text-purple-900">
                {activeApplications.length > 0 
                  ? `${((activeApplications.filter(app => app.status === 'offer').length / activeApplications.length) * 100).toFixed(1)}%`
                  : 'N/A'
                }
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Dashboard;
