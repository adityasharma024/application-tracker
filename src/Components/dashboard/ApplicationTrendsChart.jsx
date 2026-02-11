import React from 'react'
import { useMemo } from 'react'
import { LineChart} from 'lucide-react';
import { Line } from 'recharts';
import { CartesianGrid, ResponsiveContainer, Tooltip, Legend, XAxis, YAxis } from 'recharts';

const ApplicationTrendsChart = ({applications}) => {
    const chartData=useMemo(()=>{
        if(!applications || applications.length===0) return [];
        const monthlyData={};
        applications.forEach(app=>{
            const date=new Date(app.dateApplied);
            const monthYear=date.toLocaleDateString('en-Us',{
                year:'numeric',
                month:'short'
        
            });
            if(!monthlyData[monthYear]){
                monthlyData[monthYear]={
                    month:monthYear,
                    applications:0,
                    offers:0,
                    interviews:0,
                    rejected:0
                };
            }
            monthlyData[monthYear].applications+=1;
            if(app.status==='offer'){
                monthlyData[monthYear].offers+=1;

            }
            else if(app.status==='hr-round' || app.status==='technical-round'){
                monthlyData[monthYear].interviews+=1;
            }
            else if(app.status==='rejected'){
                monthlyData[monthYear].rejected+=1;
            }
        });
        return Object.values(monthlyData).sort((a,b)=>{
            return new Date(a.month)-new Date(b.month);
        });
    },[applications]);
    if(chartData.length===0){
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <p className='text-gray-500 '>No data to display yet. Add some applications!</p>

            </div>
        );
    }


  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
        <h3 className='text-lg font-bold text-gray-900 mb-4'>
            Application Trends Over Time
        </h3>
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke='#f0f0f0'/>
                <XAxis dataKey="month" tick={{fontSize:12}} stroke='#6b7280'/>
                <YAxis tick={{fontSize:12}} stroke='#6b7280'/>
                <Tooltip contentStyle={{
                    backgroundColor:'#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius:'8px'
                }}
                />
                <Legend wrapperStyle={{fontSize:'14px'}}/>
                <Line 
                type="monotone" 
                dataKey="applications" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Total Applications"
                dot={{ fill: '#3b82f6', r: 4 }}
            />
            <Line 
                type="monotone" 
                dataKey="interviews" 
                stroke="#f59e0b" 
                strokeWidth={2}
                name="Interviews"
                dot={{ fill: '#f59e0b', r: 4 }}
            />
            <Line 
                type="monotone" 
                dataKey="offers" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Offers"
                dot={{ fill: '#10b981', r: 4 }}
            />
            <Line 
                type="monotone" 
                dataKey="rejected" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Rejected"
                dot={{ fill: '#ef4444', r: 4 }}
            />

                
            </LineChart>
        </ResponsiveContainer>

        <div className="mt-4 grid grid-cols-4 gap-3 text-center">
            <div className="p-2 bg-blue-50 rounded">
                <p className='text-xs text-blue-600 font-semibold '>Total</p>
                <p className='text-lg font-bold text-blue-700'>
                    {chartData.reduce((sum,d)=>sum+ d.applications,0)}

                </p>

            </div>
            <div className="p-2 bg-yellow-50 rounded">
                <p className="text-xs text-yellow-600 font-semibold">Interviews</p>
                <p className="text-lg font-bold text-yellow-700">
                    {chartData.reduce((sum, d) => sum + d.interviews, 0)}
                </p>
            </div>
            <div className="p-2 bg-green-50 rounded">
                <p className="text-xs text-green-600 font-semibold">Offers</p>
                <p className="text-lg font-bold text-green-700">
                    {chartData.reduce((sum, d) => sum + d.offers, 0)}
                </p>
            </div>
            <div className="p-2 bg-red-50 rounded">
                <p className="text-xs text-red-600 font-semibold">Rejected</p>
                <p className="text-lg font-bold text-red-700">
                    {chartData.reduce((sum, d) => sum + d.rejected, 0)}
                </p>
            </div>
                
        </div>
    </div>
  )
}

export default ApplicationTrendsChart