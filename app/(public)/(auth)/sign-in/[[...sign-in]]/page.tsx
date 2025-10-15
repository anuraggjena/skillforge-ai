import { Loader2 } from 'lucide-react'
import { SignIn, ClerkLoaded, ClerkLoading } from '@clerk/nextjs'
import { Logo } from '@/components/shared/logo'

export default function Page() {
  return (
    <div className='max-h-screen grid grid-cols-1 lg:grid-cols-2'>
      <div className='h-full lg:flex flex-col items-center justify-center px-4 pt-15'>
        <div className='text-center space-y-3 '>
          <h1 className='font-bold text-3xl'>
            Welcome Back!
          </h1>
        </div>
        <div className='flex items-center justify-center mt-10'>
        <ClerkLoaded>
            <SignIn path="/sign-in" />
        </ClerkLoaded>
        <ClerkLoading>
          <Loader2 className='animate-spin text-muted-foreground'/>
        </ClerkLoading>
        </div>
      </div>
      
   
      <div className='h-full hidden
       lg:flex items-center justify-center gap-3'>
      <Logo className="h-30 w-30 text-foreground"/>  <span className="font-semibold text-5xl">SkillForge AI</span>
      </div>
    </div>
  )
}