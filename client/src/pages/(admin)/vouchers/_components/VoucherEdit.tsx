import { ReloadOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Input, InputNumber, message, Row, Select } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useVoucherMutation from '../../../../common/hooks/voucher/useVoucherMutation';
import useVoucherQuery from '../../../../common/hooks/voucher/useVoucherQuery';
import { IVoucher } from '../../../../common/interfaces/voucher';

const { Option } = Select;

const generateRandomCode = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result.toUpperCase();
};

const VoucherEdit = () => {
    const { id: voucherId } = useParams<{ id: string }>(); // Lấy ID từ URL
    const mutation = useVoucherMutation();
    const [form] = Form.useForm();
    const [voucherCode, setVoucherCode] = useState('');
    // const [scope, setScope] = useState<'all' | 'specific'>('all');
    // const [products, setProducts] = useState([]); // Lưu danh sách sản phẩm
    const [voucherType, setVoucherType] = useState<'fixed' | 'percentage' | 'freeship'>('fixed'); // Lưu trạng thái loại voucher
    const [voucherStatus, setVoucherStatus] = useState<'active' | 'inactive'>('active'); // Lưu trạng thái của voucher
    const [voucherCategory, setVoucherCategory] = useState<'discount' | 'shipping'>('shipping')
    // Lấy voucher hiện tại để chỉnh sửa
    const { data: voucher, isLoading } = useVoucherQuery({ id: voucherId }); // Giả sử có hook lấy dữ liệu voucher theo ID
    console.log(voucher)
    useEffect(() => {
        if (voucher) {
            form.setFieldsValue({
                ...voucher,
                type: voucher.type,
                category: voucher.category,
                startDate: moment(voucher.startDate),
                endDate: moment(voucher.endDate),
                status: voucher.status ? 'active' : 'inactive', // Đặt giá trị cho trường status

            });
            setVoucherCode(voucher.code);
            setVoucherType(voucher.type);
            setVoucherCategory(voucher.category); // Thêm dòng này
            setVoucherStatus(voucher.status ? 'active' : 'inactive'); // Cập nhật trạng thái khi nhận dữ liệu voucher
        }
    }, [voucher]);
    useEffect(() => {
        if (voucherCategory === 'shipping') {
            form.setFieldsValue({ type: 'freeship' });
        } else if (voucherCategory === 'discount') {
            form.setFieldsValue({ type: voucherType }); // hoặc type mặc định khác phù hợp
        }
    }, [voucherCategory, form,voucherType]);
    // // Lấy danh sách sản phẩm từ API
    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const response = await getAllProducts();
    //             setProducts(response.products || []);
    //         } catch (error) {
    //             console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    //         }
    //     };
    //     fetchProducts();
    // }, []);

    const handleGenerateCode = () => {
        const newCode = generateRandomCode(5);
        setVoucherCode(newCode);
        form.setFieldsValue({ code: newCode });
    };

    const onFinish = (values: any) => {
        const finalCode = values.code || voucherCode;

        const updatedVoucher: IVoucher = {
            _id: voucherId,
            name: values.name,
            code: finalCode.toUpperCase(),
            type: values.type,
            value: values.value,
            minOrderValue: values.minOrderValue,
            maxDiscountValue: values.maxDiscountValue,
            quantity: values.quantity,
            category: values.category,
            scope: values.scope,
            startDate: values.startDate.format('YYYY-MM-DD'),
            endDate: values.endDate.format('YYYY-MM-DD'),
            status: values.status === 'active',
        };

        mutation.mutate(
            { action: 'update', voucher: updatedVoucher }, // Gửi voucherId trong options
            {
                onSuccess: () => {
                    message.success('Cập nhật voucher thành công!');
                },
                onError: () => {
                    message.error('Có lỗi xảy ra, vui lòng thử lại.');
                },
            }
        );
    };

    if (isLoading) return <p>Đang tải...</p>;

    return (
        <div className='overflow-x-hidden h-[100%]'>
            <div className="flex justify-between items-center mb-4">
                <h1 className='font-semibold text-[20px]'>CHỈNH SỬA VOUCHER</h1>
                <Link to={`/admin/vouchers`}><Button type="primary">DANH SÁCH VOUCHER</Button></Link>
            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                {/* Các trường nhập tương tự form thêm voucher */}
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Tên voucher"
                            name="name"
                            rules={[{ required: true, message: 'Tên voucher là bắt buộc' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Mã voucher (Nhấn vào biểu tượng để tự tạo mã)"
                            name="code"
                        >
                            <Input
                                maxLength={5}
                                value={voucherCode}
                                onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                                suffix={<ReloadOutlined onClick={handleGenerateCode} />}
                                placeholder="Nhập mã hoặc nhấn icon để tạo mã"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Row 2: Loại voucher và giá trị giảm */}
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Loại voucher" name="category">
                            <Select onChange={(value) => setVoucherCategory(value)}>
                                <Option value="discount">Voucher giảm giá</Option>
                                <Option value="shipping">Voucher vận chuyển</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Loại voucher" name="type" rules={[{ required: true, message: 'Vui lòng chọn loại voucher' }]}>
                            <Select onChange={(value) => setVoucherType(value)}>
                                <Option value="select" disabled>
                                    Chọn loại voucher
                                </Option>
                                {voucherCategory !== 'shipping' && (
                                    <Option value="fixed">Giảm giá cố định</Option>
                                )}
                                {voucherCategory !== 'shipping' && (
                                    <Option value="percentage">Giảm giá phần trăm</Option>
                                )}
                                {voucherCategory !== 'discount' && (
                                    <Option value="freeship">Miễn phí vận chuyển</Option>
                                )}

                            </Select>
                        </Form.Item>
                    </Col>


                </Row>

                {/* Row 3: Giá trị đơn hàng tối thiểu và giá trị giảm tối đa */}
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Giá trị đơn hàng tối thiểu"
                            name="minOrderValue"
                            rules={[{ required: true, message: 'Giá trị đơn hàng tối thiểu là bắt buộc' }]}
                        >
                            <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label={`${voucherType !== 'fixed' ? 'Giá trị giảm tối đa (VND)' : 'Giá trị giảm tối đa (VND)'}`}
                            name="maxDiscountValue"
                        >
                            <InputNumber min={0} style={{ width: '100%' }} disabled={voucherType !== 'percentage' && voucherCategory !== 'shipping'} />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Row 4: Số lượng và Loại voucher */}
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Số lượng"
                            name="quantity"
                            rules={[{ required: true, message: 'Số lượng là bắt buộc' }]}
                        >
                            <InputNumber min={1} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={`${voucherType == 'percentage' ? 'Giá trị giảm (%)' : 'Giá trị giảm(VND)'}`}
                            name="value"
                            
                        >
                            <InputNumber min={0} max={voucherType === 'percentage' ? 90 : 1000000}  style={{ width: '100%' }} disabled={voucherCategory == 'shipping'} />
                        </Form.Item>
                    </Col>

                </Row>

                {/* Row 5: Phạm vi áp dụng và Chọn sản phẩm */}
                <Row gutter={16}>
                    {/* {scope === 'specific' && (
                        <Col span={12}>
                            <Form.Item
                                label="Chọn sản phẩm"
                                name="applicableProducts"
                                rules={[{ required: true, message: 'Vui lòng chọn sản phẩm áp dụng' }]}
                            >
                                <Select mode="multiple" placeholder="Chọn sản phẩm">
                                    {(Array.isArray(products) ? products : []).map((product: any) => (
                                        <Option key={product._id} value={product._id}>
                                            {product.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    )} */}
                </Row>

                {/* Row 6: Ngày bắt đầu và Ngày kết thúc */}
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Ngày bắt đầu"
                            name="startDate"
                            rules={[{ required: true, message: 'Ngày bắt đầu là bắt buộc' }]}
                        >
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Ngày kết thúc"
                            name="endDate"
                            rules={[{ required: true, message: 'Ngày kết thúc là bắt buộc' }]}
                        >
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Row 7: Trạng thái của voucher */}
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Phạm vi áp dụng" name="scope">
                            <Select>
                                <Option value="all">Tất cả sản phẩm</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Trạng thái" name="status">
                            <Select>
                                <Option value="active">Hoạt động</Option>
                                <Option value="inactive">Không hoạt động</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Cập nhật voucher
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default VoucherEdit;