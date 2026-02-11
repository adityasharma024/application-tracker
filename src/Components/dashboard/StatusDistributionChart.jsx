import { PieChart } from 'lucide-react';
import React, { useMemo } from 'react'
import { Pie, ResponsiveContainer, Tooltip } from 'recharts';
import { Cell } from 'recharts';
import { Legend } from 'recharts';

const StatusDistributionChart = ({applications}) => {
    const chartData=useMemo(()=>{
        const statusCount={
            'applied':0,
            'hr-round':0,
            'technical-round':0,
            'offer':0,
            'rejected':0
        };
        applications.forEach(app=>{
            if(statusCount.hasOwnProperty(app.status)){
                statusCount[app.status]+=1;
            }
        });
        return [
            {name:'Applied', value:statusCount['applied'], color:'#6b7280'},
            { name: 'HR Round', value: statusCount['hr-round'], color: '#3b82f6' },
            { name: 'Technical Round', value: statusCount['technical-round'], color: '#f59e0b' },
            { name: 'Offer', value: statusCount['offer'], color: '#10b981' },
            { name: 'Rejected', value: statusCount['rejected'], color: '#ef4444' }


        ].filter(item=>item.value>0);

    },[applications]);
    if(chartData.length===0){
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <p className='text-gray-500'>No data to display yet</p>
            </div>

        );
    }
    const renderLabel=(entry)=>{
        return `${entry.name}: ${entry.value}`;

    };
  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
        <h3 className='text-lg font-bold text-gray-900 mb-4'>
            Status Distribution
        </h3>
        <ResponsiveContainer width='100%' height={300}>
            <PieChart>
                <Pie 
                    data={chartData}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    label={renderLabel}
                    outerRadius={100}
                    fill='#8884d8'
                    dataKey="value"
                >
                    {chartData.map((entry,index)=>(
                        <Cell key={`cell-${index}`} fill={entry.color}/>

                    ))}
                    


                </Pie>
                <Tooltip/>
                <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    iconType="circle"
                />

            </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2">
            {chartData.map((item)=>(
                <div key={item.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{backgroundColor:item.color}}/>
                        <span className='text-sm font-medium text-gray-700'>{item.name}</span>

           
                    </div>
                    <span className='text-sm font-medium text-gray-700 '>{item.name}</span>
                    
                </div>
            ))}
        </div>
    </div>
  )
}

export default StatusDistributionChart