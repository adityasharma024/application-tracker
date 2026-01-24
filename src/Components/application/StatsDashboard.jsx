import React, { useMemo } from "react";
import { Briefcase, Clock, CheckCircle, XCircle, TrendingUp } from "lucide-react";

const StatsDashboard = ({ applications }) => {
  const stats = useMemo(() => {
    const total = applications.length;
    const applied = applications.filter(app => app.status === "applied").length;
    const hrRound = applications.filter(app => app.status === "hr-round").length;
    const technicalRound = applications.filter(app => app.status === "technical-round").length;
    const offers = applications.filter(app => app.status === "offer").length;
    const rejected = applications.filter(app => app.status === "rejected").length;

    const active = hrRound + technicalRound;
    const conversionRate =
      total > 0 ? ((offers / total) * 100).toFixed(1) : 0;

    return {
      total,
      applied,
      active,
      offers,
      rejected,
      conversionRate,
    };
  }, [applications]);
  const statCards=[
    {
      label: 'Total Applications',
      value: stats.total,
      icon: Briefcase,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200'
    },
    {
      label: 'Active Interviews',
      value: stats.active,
      icon: Clock,
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      borderColor: 'border-yellow-200'
    },
    {
      label: 'Offers Received',
      value: stats.offers,
      icon: CheckCircle,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      borderColor: 'border-green-200'
    },
    {
      label: 'Rejected',
      value: stats.rejected,
      icon: XCircle,
      color: 'red',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      borderColor: 'border-red-200'
    }
  ];
     
   

  return (
    <div className="mb-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {statCards.map((stat,index)=>(
                <div key={index} className={`${stat.bgColor} border ${stat.borderColor} rounded-lg p-4`}>
                    <div className="flex items-center justify-between mb-2">
                        <stat.icon className={`w-5 h-5 ${stat.textColor}`}/>
                        <span className={`text-2xl font-bold ${stat.textColor}`}>
                            {stat.value}
                        </span>
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                        {stat.label}

                    </p>
                </div>

            ))

            }
        </div>
        {stats.total > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-gray-800">Conversion Rate</span>
            </div>
            <span className="text-2xl font-bold text-purple-600">
              {stats.conversionRate}%
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {stats.offers} offers from {stats.total} applications
          </p>
        </div>
      )}

    </div>
  );
};

export default StatsDashboard;
