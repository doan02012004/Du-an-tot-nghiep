import './ship.css';
import { CarOutlined, EnvironmentOutlined, PlusOutlined, TagOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState, useRef, useEffect } from "react";
import UpdateShipFee from "./UpdateShipFee";

const ListFeeShip = () => {
    const [selectedMethod, setSelectedMethod] = useState(null);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        let isDragging = false;
        let startX = 0;
        let scrollLeft = 0;

        const startDragging = (event) => {
            isDragging = true;
            startX = event.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        };

        const whileDragging = (event) => {
            if (!isDragging) return;
            event.preventDefault();
            const x = event.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 1;
            scrollContainer.scrollLeft = scrollLeft - walk;
        };

        const stopDragging = () => {
            isDragging = false;
        };

        scrollContainer.addEventListener("mousedown", startDragging);
        scrollContainer.addEventListener("mousemove", whileDragging);
        scrollContainer.addEventListener("mouseup", stopDragging);
        scrollContainer.addEventListener("mouseleave", stopDragging);

        return () => {
            scrollContainer.removeEventListener("mousedown", startDragging);
            scrollContainer.removeEventListener("mousemove", whileDragging);
            scrollContainer.removeEventListener("mouseup", stopDragging);
            scrollContainer.removeEventListener("mouseleave", stopDragging);
        };
    }, []);

    return (
        <div className="container">
            <h2 className="text-2xl mb-4">Quản lý phí ship</h2>
            <div className="relative flex items-center border rounded-lg bg-slate-100 p-2">
                <div
                    ref={scrollContainerRef}
                    className="scroll-container cursor-grab"
                    style={{ userSelect: "none" }}
                >
                    <div className="button">
                        <Button
                            className="w-full"
                            icon={<TagOutlined />}
                            onClick={() => setSelectedMethod("standard")}
                        >
                            Chuyển phát thường
                        </Button>
                    </div>
                    <div className="button">
                        <Button
                            className="w-full"
                            icon={<CarOutlined />}
                            onClick={() => setSelectedMethod("express")}
                        >
                            Chuyển phát nhanh
                        </Button>
                    </div>
                    <div className="button">
                        <Button
                            className="w-full"
                            icon={<EnvironmentOutlined />}
                            onClick={() => setSelectedMethod("local")}
                        >
                            Chuyển phát nội thành
                        </Button>
                    </div>
                    <div className="button">
                        <Button
                            className="w-full"
                            icon={<EnvironmentOutlined />}
                            onClick={() => setSelectedMethod("local")}
                        >
                            Chuyển phát nội thành
                        </Button>
                    </div>
                    <div className="button">
                        <Button
                            className="w-full"
                            icon={<EnvironmentOutlined />}
                            onClick={() => setSelectedMethod("local")}
                        >
                            Chuyển phát nội thành
                        </Button>
                    </div>
                </div>
                <div className="add-button">
                    <Button icon={<PlusOutlined />} />
                </div>
            </div>
            {selectedMethod && <UpdateShipFee />}
        </div>
    );
};

export default ListFeeShip;
