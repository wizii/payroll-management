'use client'
import { useGlobal } from './context/globalContext';
// TODO: Dashboard / Payment Log
// TODO: Check responsiveness
// TODO: linting/consoles
export default function Dashboard() {
  const { setPageTitle } = useGlobal();
  setPageTitle('Dashboard');
  return (
      <div>
        <h1>Dashboard</h1>
      </div>
  );
};
