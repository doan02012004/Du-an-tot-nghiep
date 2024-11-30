import React, { useState } from 'react'
import FormAuth from './_components/FormAuth'

const PageForgot = () => {
 
  return (
    <section className=" container">
      <div className="border-t-2 mb-9">
        <div className="flex justify-center text-center mt-5  relative flex-col lg:flex-row lg:px-24">
          {/* form forgot */}
          <FormAuth/>
        </div>
      </div>
    </section>

  )
}

export default PageForgot