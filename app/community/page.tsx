import dynamic from 'next/dynamic'

const WhopStylePage = dynamic(() => import('@/components/ui/community/whop-style-page'), {
  ssr: false
})

export default function CommunityPage() {
  return <WhopStylePage />
}

