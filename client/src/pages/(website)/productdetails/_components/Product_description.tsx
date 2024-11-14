import { useEffect, useRef, useState } from "react";
import { Iproduct } from "../../../../common/interfaces/product";
import Content from "./Content";

type Props = { product: Iproduct };

const Product_description = ({ product }: Props) => {
  const [activeTab, setActiveTab] = useState<"des" | "comment">("des");
  const desRef = useRef<HTMLDivElement>(null);
  const comRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false); // State để điều khiển mở/đóng

  useEffect(() => {
    if (product) {
      if (desRef?.current) {
        desRef.current.innerHTML = product.description;
      }
      if (comRef?.current) {
        comRef.current.innerHTML = product.name;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?._id, desRef, comRef, activeTab]);

  return (
    <>
      <div className="product-description">
        <ul className="flex justify-between">
          <li
            className={`tab-item ${
              activeTab === "des" ? "text-black" : ""
            } cursor-pointer`}
            onClick={() => setActiveTab("des")}
          >
            <span className="block text-[12px] lg:text-[16px] lg:pb-5 pb-4 font-semibold">
              CHI TIẾT SẢN PHẨM
            </span>
          </li>
          <li
            className={`tab-item ${
              activeTab === "comment" ? "text-black" : ""
            } cursor-pointer`}
            onClick={() => setActiveTab("comment")}
          >
            <span className="block text-[12px] lg:text-[16px] lg:pb-5 pb-4 font-semibold">
              ĐÁNH GIÁ
            </span>
          </li>
        </ul>
        <hr className="mb-6" />
        {/* <div className="content-section text-[14px]">
          {activeTab == "des" ? (
            <div ref={desRef}></div>
          ) : (
            <div ref={comRef}></div>
          )}
        </div> */}
        <div
          className="content-section text-[14px] overflow-hidden"
          style={{
            maxHeight: isOpen ? "30%" : "100px", // Điều chỉnh chiều cao theo trạng thái mở/đóng
          }}
        >
          {activeTab === "des" ? <div ref={desRef}></div> : <Content />}
        </div>
      </div>
      <div className="flex items-center justify-center mt-4">
        <div className="w-[235px]">
          <hr />
        </div>
        <button
          id="toggle-content"
          className="p-2 border rounded-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            id="icon-chevron"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`feather feather-chevron-down ${
              isOpen ? "transform rotate-180" : ""
            }`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        <div className="w-[235px]">
          <hr />
        </div>
      </div>
    </>
  );
};

export default Product_description;
