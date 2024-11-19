import React from 'react'

const WaitPage = () => {
  return (
    <section>
  <div className="container mx-auto">
    <div className="flex flex-col items-center py-10 lg:px-72 gap-4">
      <div className="flex flex-col items-center gap-4">
        <span className="border-[2px] border-black size-32 flex items-center justify-center text-3xl text-black rounded-full"><i className="fa-solid fa-check" /></span>
      </div>
      <div className="flex flex-col gap-2 mt-5 items-center">
        <span className="text-center text-xl font-semibold text-black">Hệ thống đã tự động gửi đường dẫn đổi mật khẩu vào email của bạn.</span>
        <span className="text-center text-xl font-semibold text-black">Vui lòng kiểm tra!!!</span>
      </div>
      
    </div>
  </div>
</section>

  )
}

export default WaitPage