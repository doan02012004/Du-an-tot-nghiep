import { Button, Form, InputNumber, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { IWeightRate, IVolumeRate } from '../../../../common/interfaces/ship';

interface FormUpdateProps {
    visible: boolean;
    data: IWeightRate | IVolumeRate | null;
    type: 'weight' | 'volume';
    onSave: (updatedData: IWeightRate | IVolumeRate) => void;
    onCancel: () => void;
}

const FormUpdate: React.FC<FormUpdateProps> = ({ visible, data, type, onSave, onCancel }) => {
    const [form] = Form.useForm();
    const [initialValues, setInitialValues] = useState<any>(null);

    useEffect(() => {
        if (data) {
            setInitialValues(data);
            form.setFieldsValue(data); // Cập nhật giá trị của form với data đã chọn
        }
    }, [data, form]);

    const handleSave = () => {
        form
            .validateFields()
            .then(values => {
                onSave({ ...data, ...values }); // Kết hợp dữ liệu cũ với giá trị mới từ form
            })
            .catch(err => {
                console.error("Form validation failed:", err);
            });
    };

    const renderFormFields = () => {
        if (type === 'weight') {
            return (
                <>
                    <Form.Item
                        label="Khối lượng (Min)"
                        name="minWeight"
                        rules={[{ required: true, message: 'Vui lòng nhập khối lượng min!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Khối lượng (Max)"
                        name="maxWeight"
                        rules={[{ required: true, message: 'Vui lòng nhập khối lượng max!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Giá vận chuyển"
                        name="price"
                        rules={[{ required: true, message: 'Vui lòng nhập giá vận chuyển!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </>
            );
        } else if (type === 'volume') {
            return (
                <>
                    <Form.Item
                        label="Thể tích (Min)"
                        name="minVolume"
                        rules={[{ required: true, message: 'Vui lòng nhập thể tích min!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Thể tích (Max)"
                        name="maxVolume"
                        rules={[{ required: true, message: 'Vui lòng nhập thể tích max!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Giá vận chuyển"
                        name="price"
                        rules={[{ required: true, message: 'Vui lòng nhập giá vận chuyển!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </>
            );
        }
    };

    return (
        <Modal
            visible={visible}
            title={`Cập nhật ${type === 'weight' ? 'Khối Lượng' : 'Thể Tích'}`}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Hủy
                </Button>,
                <Button key="submit" type="primary" onClick={handleSave}>
                    Lưu
                </Button>,
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_update"
                initialValues={initialValues}
                onFinish={handleSave}
            >
                {renderFormFields()}
            </Form>
        </Modal>
    );
};

export default FormUpdate;
