'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import localFont from "next/font/local";
import { ShieldUser, Key, LockKeyhole} from 'lucide-react';

const levenim = localFont ({
  src: "../../fonts/Levenim_MT/levenim-mt.ttf"
})
const inter_heading = localFont ({
  src: "../../fonts/Inter/Inter-Medium.otf"
})
const tt_wellingtons_demi = localFont ({
  src: "../../fonts/TT_Wellingtons/TT Wellingtons Trial DemiBold.otf"
})
const tt_wellingtons_medium = localFont ({
  src: "../../fonts/TT_Wellingtons/TT Wellingtons Trial Medium.otf"
})
const tt_wellingtons = localFont ({
  src: "../../fonts/TT_Wellingtons/TT Wellingtons Trial Regular.otf"
})

import HeaderWrapper from '../../components/HeaderWrapper';
import PageTitle from '../../components/PageTitle';
import AdminFooter from '../../components/Admin/AdminFooter';

const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'services', label: 'Services', href: '/services' },
    { id: 'help', label: 'Help', href: '/help' },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ];

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('') // Clear previous errors
    
    try {
      const result = await signIn('credentials', {
        redirect: false,
        username,
        password,
      })
      console.log('signIn result:', result);

      if (result?.error) {
        setError('Invalid credentials')
      } else if (result?.ok) {
        router.push('/admin')
      } else {
        setError('Something went wrong')
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='bg-[#F7FBFC] lg:min-h-screen'>
      <header role="banner">
        <HeaderWrapper
          navItems={navItems}
          inter_heading={inter_heading}
          tt_wellingtons_demi={tt_wellingtons_demi}
          tt_wellingtons_medium={tt_wellingtons_medium}
          levenim={levenim}
        />
      </header>

      <main role='main'>
        <PageTitle
          title="Admin Login"
          subtitle="Access the admin dashboard."
          titleFont={tt_wellingtons_demi.className}
          bodyFont={tt_wellingtons.className}
        />
        <section className='p-4 pt-0 lg:pt-14'>
          <form onSubmit={handleSubmit} className='bg-white rounded-sm lg:w-[75%] lg:mx-auto'>
            
            <div className='flex flex-col gap-8 p-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='username' className={`${inter_heading.className} text-lg font-medium tracking-wider text-[#0D4F4F]`}>Username:</label>
                <div className="relative">
                  <ShieldUser size={26} strokeWidth={1.5} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#181818] pointer-events-none"></ShieldUser>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                    required
                    className={`${tt_wellingtons_demi.className} w-full pl-12 pr-4 py-3 rounded-sm border border-[#D0E6E6] bg-[#F7FBFC] text-[#181818] font-medium text-xl placeholder:text-[#9DBDBD] transition-all duration-200 outline-none focus:border-2 focus:border-b-[#058080] focus:border-x-[#D0E6E6] focus:border-t-[#D0E6E6] focus:rounded-b-[2px] hover:ring-1 hover:ring-gray-300 disabled:opacity-60 disabled:cursor-not-allowed`}
                    style={{ boxShadow: '0px 6px 12px -16px #000' }}
                  />
                </div>
              </div>
              <div className='flex flex-col gap-1.5'>
                <label htmlFor='password' className={`${inter_heading.className} text-lg font-medium tracking-wider text-[#0D4F4F]`}>Password:</label>
                <div className="relative">
                  <Key size={20} strokeWidth={1.5} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#181818] pointer-events-none"></Key>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                    className={`${tt_wellingtons_demi.className} w-full pl-12 pr-4 py-3 rounded-sm border border-[#D0E6E6] bg-[#F7FBFC] text-[#181818] font-medium text-xl placeholder:text-[#9DBDBD] transition-all duration-200 outline-none focus:border-2 focus:border-b-[#058080] focus:border-x-[#D0E6E6] focus:border-t-[#D0E6E6] focus:rounded-b-[2px] hover:ring-1 hover:ring-gray-300 disabled:opacity-60 disabled:cursor-not-allowed`}
                    style={{ boxShadow: '0px 6px 12px -16px #000' }}
                  />
                </div>
              </div>
              {error && <p className='text-red-800 mx-auto'>{error}</p>}
              <button type="submit" disabled={isLoading} className={`${tt_wellingtons_demi.className} py-3 px-4 rounded-sm text-[#181818] text-lg font-extrabold tracking-widest transition-all duration-200 hover:scale-103 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer`}
                style={{
                background: 'linear-gradient(180deg, #ffe14d 0%, #ffd808 50%, #e6b800 100%)',
                boxShadow: '0px 0.5px 0.5px rgba(180,130,0,0.3), 0px 1px 0.5px rgba(180,130,0,0.15)',
                color: '#181818',
              }}
              >
                {isLoading ? 'Signing in...' : 'SIGN IN'}
              </button>
            </div>
            <div className='bg-[#058080] py-3 rounded-b-sm'>
              <p className={`${tt_wellingtons.className} text-center text-md text-white`}>
                <span className="font-extrabold">Authorised personnel only</span> <br/> Aurelia Dental © 2026
              </p>
            </div>
          </form>
        </section>
      </main>
    </div>
  )
}