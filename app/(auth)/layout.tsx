import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode;
}


const Authlayout = async ({ children }: AuthLayoutProps) => {
  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated) {
    redirect('/');
  }
  
  
  return (
    <div className="auth-layout">{children}</div>
  )
}

export default Authlayout