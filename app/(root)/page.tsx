import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { getCurrentUser } from '@/lib/actions/auth.action'
import {getInterviewsByUserId, getLatestInterviews } from "@/lib/actions/general.action"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SignOutButton from '@/components/SignOutButton'


const page = async () => {
    const user = await getCurrentUser();

    const [userInterviews , latestInterviews ] = await Promise.all([
      await getInterviewsByUserId(user?.id ?? ''),
      await getLatestInterviews({ userId: user?.id ?? '' })
    ]);

const hasPastInterviews = userInterviews?.length ?? 0 > 0;
const hasUpcomingInterviews = latestInterviews?.length ?? 0 > 0;


  return (
    <>
      {/* Sign Out Button */}
          <div className="absolute top-4 right-4 z-50">
    <SignOutButton />
</div>


     <section className='card-cta'>
      <div className='flex flex-col gap-6 max-w-lg'>
<h2> 
  Ace Your Interviews with Smart AI Practice & Real-Time Feedback
  </h2>

        <p className='text-lg'>
        Sharpen your skills with real interview questions, instant insights, and AI-powered tips to help you answer confidently and effectively.
</p>

<Button asChild className='btn-primary max-sm:w-full'>
<Link href="/interview">Start Your AI Interview</Link>
</Button>
      </div>

      <Image src="/robot.png" alt="robo-dude" width={400} height={400} className='bg-cover bg-center mix-blend-lighten max-sm:hidden' />

      </section>
      <section className='flex flex-col gap-6 mt-8'>
        <h2>Your Interviews</h2>

        <div className='interviews-section'>
          {
          
          hasPastInterviews ? (
            userInterviews?.map((interview) => (
               <InterviewCard {...interview} key={interview.id} />
            ))) : (

              <p>You haven&apos;t taken any interviews yet</p> 
            )}

        </div>
        </section>


        <section className='flex flex-col gap-6 mt-8'>
        <h2>Take an Interview</h2>

        <div className='interviews-section'>
          {
           hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
               <InterviewCard {...interview} key={interview.id} />
            ))) : (

              <p>There are no new interviews available</p> 
            )}

        </div>

        </section>
    </>
  )
}

export default page
