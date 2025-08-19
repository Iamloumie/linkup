import EventForm from '@/components/shared/EventForm'
import { auth } from '@clerk/nextjs'
import React from 'react'

// This page will be used to create an event, It will include a form to handle the event creation
// and will use the EventForm component, to handle the form submission and validation

const UpdateEvent = () => {
    
    // PASS THE USER ID THATS CREATING THE EVENT, this is imported from clerk
    const { sessionClaims } = auth()
    const userId = sessionClaims?.userId as string

    return (
        <>
            <section className="bg-primary-50 bg-dotted-patern bg-cover bg-center py-5 md:py-10">
                <h3 className="wrapper h3-bold text-center sm:text-left">
                    UpdateEvent
                </h3>
            </section>

            <div className="wapper my-8">
                {/* This forms accepts userId from clerk */}
                <EventForm userId={userId} type="Update" />
            </div>
        </>
    )
}

export default UpdateEvent