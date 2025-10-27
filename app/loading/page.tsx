'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ReactLenis } from 'lenis/react'
import React, { useRef } from 'react'

export default function LoadingPage() {
  const router = useRouter()
  const stickyColumnRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    let hasScrolled = false
    
    const preventScroll = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      return false
    }
    
    const autoScroll = () => {
      if (hasScrolled) return
      hasScrolled = true
      
      document.addEventListener('wheel', preventScroll, { passive: false })
      document.addEventListener('touchmove', preventScroll, { passive: false })
      document.addEventListener('keydown', preventScroll, { passive: false })
      
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      
      window.scrollTo({
        top: scrollHeight,
        behavior: 'smooth'
      })
      
      setTimeout(() => {
        document.body.style.overflow = 'hidden'
        document.documentElement.style.overflow = 'hidden'
        
        if (stickyColumnRef.current) {
          stickyColumnRef.current.classList.remove('sticky', 'top-0', 'h-screen', 'grid-rows-3')
          stickyColumnRef.current.classList.add('grid', 'gap-2')
          stickyColumnRef.current.style.position = 'static'
          stickyColumnRef.current.style.height = 'auto'
          stickyColumnRef.current.style.display = 'grid'
          stickyColumnRef.current.style.gridTemplateRows = 'none'
          
          const images = stickyColumnRef.current.querySelectorAll('img')
          images.forEach((img) => {
            img.classList.remove('h-full')
            img.classList.add('h-96')
            img.style.height = '384px'
            img.style.width = '100%'
            img.style.objectFit = 'cover'
            
            const figure = img.closest('figure')
            if (figure) {
              figure.classList.remove('h-full')
              figure.classList.add('w-full')
              figure.style.height = '384px'
            }
          })
        }
      }, 3000)
      
      // Redirect to home after animation completes
      setTimeout(() => {
        sessionStorage.setItem('hasSeenLoading', 'true')
        router.push('/home')
      }, 3500)
    }

    const timer = setTimeout(autoScroll, 500)
    
    return () => {
      clearTimeout(timer)
      document.removeEventListener('wheel', preventScroll)
      document.removeEventListener('touchmove', preventScroll)
      document.removeEventListener('keydown', preventScroll)
    }
  }, [router])

  return (
    <ReactLenis root>
      <main className='bg-black'>
        <section className='text-white w-full bg-slate-950'>
          <div className='grid grid-cols-12 gap-2'>
            <div className='grid gap-2 col-span-4'>
              <figure className='w-full'>
                <img
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjTDOvjwQCMR505iv5Rd50m8Mr_YKRhqcvtw&s'
                  alt=''
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV7UvlUZgbwy3GPCtfgvbkTYiUGYG9wTInmQ&s'
                  alt=''
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1JAYoh9FuMVvJqAZcSRcyWzsfk5PvZfaJBQ&s'
                  alt=''
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJp0VV5EB8bJXQL-jQejEvt9dZRlTNP9X_sw&s'
                  alt=''
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='https://brollopsguiden.store/cdn/shop/collections/party-2613750_1280.jpg?v=1746000124'
                  alt=''
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                />
              </figure>
            </div>
            <div ref={stickyColumnRef} className='sticky top-0 h-screen w-full col-span-4 gap-2 grid grid-rows-3'>
              <figure className='w-full h-full'>
                <img
                  src='https://media.istockphoto.com/id/1330424071/photo/large-group-of-people-at-a-concert-party.jpg?s=612x612&w=0&k=20&c=LwdiOCBqbfICjQ3j5AzwyugxmfkbyfL3StKEQhtx4hE='
                  alt=''
                  className='transition-all duration-300 h-full w-full align-bottom object-cover rounded-md'
                />
              </figure>
              <figure className='w-full h-full'>
                <img
                  src='https://assets.unileversolutions.com/v1/985812.jpg'
                  alt=''
                  className='transition-all duration-300 h-full w-full align-bottom object-cover rounded-md'
                />
              </figure>
              <figure className='w-full h-full'>
                <img
                  src='https://i.cdn.newsbytesapp.com/images/28732491719287595.jpg'
                  alt=''
                  className='transition-all duration-300 h-full w-full align-bottom object-cover rounded-md'
                />
              </figure>
            </div>
            <div className='grid gap-2 col-span-4'>
              <figure className='w-full'>
                <img
                  src='https://media.insider.in/image/upload/w_800/v1749746285/bkyprxkv50nu8bztrppx.jpg'
                  alt=''
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='https://www.shutterstock.com/image-photo/vocalist-front-crowd-on-scene-600nw-2054923319.jpg'
                  alt=''
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='https://assets.livenationcdn.com/uploads/d9f6c503-4378-43d6-a0bf-8c1abea55a62.jpg?auto=webp&quality=70&width=1319'
                  alt=''
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvbmNlcnR8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000'
                  alt=''
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXAHCitt73WciuXDxVqGnAJxa606ejOXeEdSO4N8vJ9jU18l6YSlg9iwt2V3V3XSplLBE&usqp=CAU'
                  alt=''
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                />
              </figure>
            </div>
          </div>
        </section>

        <footer className='group bg-slate-950 mt-0'>
          <h1 className='text-[16vw] leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-green-400 to-gray-800 bg-clip-text text-transparent transition-all ease-linear'>
            ENCORE
          </h1>
        </footer>
      </main>
    </ReactLenis>
  )
}

