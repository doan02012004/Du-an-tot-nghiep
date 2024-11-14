import React, { useState } from 'react';
import { IVoucher } from '../../../../common/interfaces/voucher';
import moment from 'moment';
import { formatPrice } from '../../../../common/utils/product';

type Props = {
    voucher: IVoucher;
    onBack: () => void;
};
const DetailVoucher = ({ voucher, onBack }: Props) => {
    const [showEligibleProducts, setShowEligibleProducts] = useState(false);
    const handleClick = () => {
        setShowEligibleProducts(!showEligibleProducts);
    };
    console.log(voucher)
    console.log(voucher?.applicableProducts)
    return (
        <div id="myModalVoucherDetail" className="modal fixed top-0 left-0 w-full h-full bg-black/45 z-[51]">
            <div className="w-[400px] mt-3 lg:w-[800px] mx-auto bg-white lg:mt-9 rounded-lg relative">
                <div className="border-b">
                    <div className="flex items-center justify-between px-5 py-4">
                        <span className="text-black text-xl font-semibold">Chi tiết Voucher</span>
                        <button onClick={onBack}>
                            <i className="fa-solid fa-arrow-left" />
                        </button>
                    </div>
                </div>
                <div className="px-5 pt-4 pb-6">
                    <div className="mb-6">
                        <strong className="text-lg">Mã: {voucher.code}</strong>
                        <p className="text-sm text-gray-600">
                            Giảm {voucher.type === "percentage" ? `${voucher.value}%` : `${formatPrice(voucher.value / 1000)}K`}
                            {voucher.type === "percentage" && ` (tối đa ${formatPrice(Number(voucher.maxDiscountValue) / 1000)}K)`}
                        </p>
                        <p className="text-sm text-gray-600">
                            Đơn tối thiểu: {formatPrice(voucher.minOrderValue / 1000)}K
                        </p>
                        <p className="text-sm text-gray-600">
                            <span>
                                Áp dụng cho:
                                {voucher?.scope === "all" ? (
                                    "Tất cả sản phẩm"
                                ) : (
                                    <>
                                        Một số sản phẩm{" "}
                                        <span className='text-black underline cursor-pointer' onClick={handleClick}>
                                            Tại đây
                                        </span>
                                    </>
                                )}
                            </span>
                        </p>
                        <p className="text-sm text-gray-400">
                            HSD: {moment(voucher.endDate).format('DD/MM/YYYY')}
                        </p>

                    </div>
                    {showEligibleProducts && voucher.applicableProducts && voucher.applicableProducts.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">Sản phẩm áp dụng:</h3>
                            <ul className="list-disc pl-5 mt-2">
                                {voucher?.applicableProducts.map((product,items) => (
                                    <li key={items}>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default DetailVoucher;
