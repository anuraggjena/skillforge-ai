import { Loader2 } from 'lucide-react'
import { ClerkLoaded, ClerkLoading, SignUp } from '@clerk/nextjs'
import { Logo } from '@/components/shared/logo'

export default function Page() {
  return (
    <div className='max-h-screen grid grid-cols-1 lg:grid-cols-2'>
      <div className='h-max lg:flex flex-col items-center justify-center px-4'>
        <div className='flex items-center justify-center mt-10 mb-10'>
        <ClerkLoaded>
            <SignUp path="/sign-up" />
        </ClerkLoaded>
        <ClerkLoading>
          <Loader2 className='animate-spin text-muted-foreground'/>
        </ClerkLoading>
        </div>
      </div>
      
   
      <div className='h-full hidden
       lg:flex items-center justify-center'>
        <Logo className="h-30 w-30 text-foreground"/>
        <span className="font-semibold text-5xl">SkillForge AI</span>
      </div>
    </div>
  )
}