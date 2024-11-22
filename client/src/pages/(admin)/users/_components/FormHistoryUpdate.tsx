import moment from 'moment';
import React from 'react';

interface FormHistoryUpdateProps {
    onClose: () => void;
    record: {
        changes: Record<string, any>; // Thông tin đã thay đổi
        originalUser: Record<string, any>; // Thông tin trước khi thay đổi
    };
}

const FormHistoryUpdate: React.FC<FormHistoryUpdateProps> = ({ onClose, record }) => {
    // Lọc ra những trường có sự thay đổi giữa originalUser và changes
    const changedFields = Object.keys(record.changes).filter(
        (key) => record.changes[key] !== record.originalUser[key]
    );

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-11/12 max-w-4xl overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Thông tin tài khoản</h2>
                    <button onClick={onClose} className="text-red-500 hover:text-red-700">Đóng</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Trước khi thay đổi</h3>
                        <table className="min-w-full bg-white">
                            <tbody>
                                {changedFields.map((key) => (
                                    <tr className="bg-gray-100 border-b" key={key}>
                                        <td className="px-4 py-2 font-medium text-gray-700">{key}</td>
                                        <td className="px-4 py-2">
                                            {key === 'date'
                                                ? moment(record.originalUser[key]).format('DD-MM-YYYY') // Format date
                                                : record.originalUser[key]}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Sau khi cập nhật</h3>
                        <table className="min-w-full bg-white">
                            <tbody>
                                {changedFields.map((key) => (
                                    <tr className="bg-gray-100 border-b" key={key}>
                                        <td className="px-4 py-2 font-medium text-gray-700">{key}</td>
                                        <td className="px-4 py-2">
                                            {key === 'date'
                                                ? moment(record.changes[key]).format('DD-MM-YYYY') // Format date
                                                : record.changes[key]}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormHistoryUpdate;
