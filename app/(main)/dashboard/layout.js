import React, { Suspense } from 'react'
import Dashboard from './page';

const DashboardLayout = () => {
  return (
    <div className="px-5">
        <h1 className="text-7xl font-bold gradient-title mb-5">tableau de bord</h1>

        {/* Dashboard Page */}
        <Suspense fallback={}>
            <Dashboard />
        </Suspense>
    </div>
  )
}

export default DashboardLayout;