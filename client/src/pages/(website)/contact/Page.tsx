import { CustomerServiceOutlined, EnvironmentOutlined, MailOutlined, MessageOutlined, PhoneOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { useContext, useRef, useState } from 'react';
import { AppContext } from '../../../common/contexts/AppContextProvider';
import useContactMutation from '../../../common/hooks/contact/useContactMutation';

type Props = {}

const PageContact = (props: Props) => {
    const [subject, setSubject] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const { currentUser } = useContext(AppContext);
    const mutation = useContactMutation();
    const formRef = useRef<HTMLFormElement>(null); // Thêm useRef để truy cập form
  
    // Hàm xử lý khi submit form
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault(); // Ngừng reload trang khi submit
  
      // Kiểm tra nếu người dùng chưa đăng nhập
      if (!currentUser) {
        message.error("Bạn cần đăng nhập trước khi gửi liên hệ.");
        return;
      }
  
      // Gửi dữ liệu đi
      mutation.mutate({
        action: "add",
        contactData: {
            userId: currentUser._id,
            title: subject,
            message: content,
            },
        }, {
            onSuccess: () => {
                message.success("Liên hệ đã được gửi thành công!");
                setSubject(""); // Reset giá trị state
                setContent(""); // Reset giá trị state
                formRef.current?.reset(); // Reset giao diện form DOM
            },
            onError: () => {
                message.error("Đã có lỗi xảy ra, vui lòng thử lại sau.");
            },
        });
    };
  return (
    <>
        <div className="container">
        <hr className='lg:hidden' />
        <section className="breadcrumb-products container mb-4">
                  <ol className="mt-[16px] mb-[16px] flex text-[12px] text-[#6c6d70] lg:text-[14px] lg:mt-[23px] lg:mb-[23px] lg:pl-[15px]">
                  <li><a href="#">Trang chủ</a></li><span className="ml-1 mr-1">-</span>
                  <li><a href="#">Liên hệ</a></li>
                  </ol>
        </section>
        <hr />
        <div className="lg:mt-10 w-[100%] lg:mb-10 mt-4 mb-[30px]">
            <img src="https://pubcdn.ivymoda.com/ivy2//images/v2/assets/banner-lien-he.jpg" className='w-[100%] object-cover lg:rounded-tl-[80px] rounded-tl-[32px] lg:rounded-br-[80px] rounded-br-[32px]' alt="" />
        </div>
        <div className="lg:flex lg:justify-between">
            <div className="lg:w-[30%]">
                <div className="flex justify-around items-center border rounded-tl-[40px] p-4 mb-[38px]">
                    <div className="icon w-[30%] h-24 border rounded-full flex justify-center items-center bg-[#F7F8F9]">
                        <EnvironmentOutlined className="text-[30px]" />
                    </div>

                    <div className="w-[50%]">
                        <p className='font-bold'>Địa chỉ</p>
                        <p className='leading-normal'>Tầng 14, Toà nhà Hapulico Complex 24T- 85 Vũ Trọng Phụng - Quận Thanh Xuân, HN</p>
                    </div>
                </div>
                {/*  */}
                <div className="flex justify-around items-center border p-4 mb-[38px]">
                    <div className="icon w-[30%] h-24 border rounded-full flex justify-center items-center bg-[#F7F8F9]">
                        <MailOutlined className="text-[30px]" />
                    </div>

                    <div className="w-[50%]">
                        <p className='font-bold'>Email</p>
                        <p className='leading-normal'>saleadmin@ivy.com.vn</p>
                    </div>
                </div>
                {/*  */}
                <div className="flex justify-around items-center border p-4 mb-[38px]">
                    <div className="icon w-[30%] h-24 border rounded-full flex justify-center items-center bg-[#F7F8F9]">
                        <PhoneOutlined className="text-[30px]" />
                    </div>

                    <div className="w-[50%]">
                        <p className='font-bold'>Mua hàng online</p>
                        <p className='leading-normal'>+ (84) 24 6662 3434</p>
                    </div>
                </div>
                {/*  */}
                <div className="flex justify-around items-center border rounded-br-[40px] p-4 mb-[38px]">
                    <div className="icon w-[30%] h-24 border rounded-full flex justify-center items-center bg-[#F7F8F9]">
                        <CustomerServiceOutlined className="text-[30px]" />
                    </div>

                    <div className="w-[50%]">
                        <p className='font-bold'>Chăm sóc khách hàng</p>
                        <span className='leading-normal'>Email:</span><br />
                        <span className='leading-normal'>cskh@ivy.com.vn</span><br />
                        <span className='leading-normal'>Hotline:</span>
                        <p className='leading-normal'>0905 89 86 83</p>
                        <p className='leading-normal'>Thứ Hai đến Thứ Bảy, từ 8:00 đến 17:30</p>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="lg:w-[65%] lg:h-[480px] border p-10 rounded-tl-[40px] rounded-br-[40px]">
                <h1 className='text-[30px] font-semibold'>Email to IVYmoda</h1>
                <p className='mt-6 mb-6 leading-normal'>We are here to help and answer any question you might have.Tell us about your issue so we can help you more quickly. We look forward to hearing from you.</p>
                <form ref={formRef} action="" onSubmit={handleSubmit}>
                    <div className="mb-4 relative">
                        <MailOutlined className="absolute top-2 left-3 text-gray-400 text-lg" />
                        <input
                            type="text"
                            id="subject"
                            className="pl-10 w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Chủ đề"
                            required
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)} // Cập nhật giá trị vào state
                        />
                    </div>
                    <div className="mb-4 relative">
                        <MessageOutlined className="absolute top-2 left-3 text-gray-400 text-lg" />
                        <textarea
                            id="content"
                            className="pl-10 w-full border rounded px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Nội dung"
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)} // Cập nhật giá trị vào state
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-[210px] bg-black text-white  py-3 rounded hover:bg-gray-800 transition mt-6 rounded-tl-[16px] rounded-br-[16px]"
                    >
                        GỬI
                    </button>
                </form>
            </div>
        </div>
        {/*  */}
        <div className="hidden lg:flex mt-10 justify-between items-center mb-10 ">
            <div className="w-[30%]">
                <h1 className='mb-6 font-semibold text-[30px]'>Find us on Google Maps</h1>
                <p className='text-justify leading-normal'>IVY moda là thương hiệu thời trang Việt Nam với mong muốn đem lại vẻ đẹp hiện đại và sự tự tin cho khách hàng, thông qua các dòng sản phẩm thời trang thể hiện cá tính và xu hướng. Một trong những “tôn chỉ” về thiết kế của IVY moda chính là sự đa dạng, với mong muốn mang đến cho người mặc những sản phẩm phù hợp nhất với ngoại hình và quan trọng hơn cả là cá tính của chính mình.</p>
            </div>
            {/*  */}
            <div className="w-[65%]">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8584240599586!2d105.7818641153325!3d21.038132792833456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4345ddf7e5%3A0x8f2b6bb5f6c94f!2zUGjDuiBI4bqjaSB0aMOhaSDEkMO0bmcgVmnhu4d0IE5hbQ!5e0!3m2!1sen!2s!4v1635078655936!5m2!1sen!2s"
                width="100%"
                height="400"
                className='rounded-tl-[40px] rounded-br-[40px]'
                loading="lazy"
            ></iframe>
            </div>
        </div>
        </div>
    </>
  )
}

export default PageContact