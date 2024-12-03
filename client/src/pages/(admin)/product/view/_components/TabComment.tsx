/* eslint-disable @typescript-eslint/no-explicit-any */
import { StarOutlined } from "@ant-design/icons"
import { Rate } from "antd"
import { useContext, useEffect, useRef, useState } from "react"
import { AppContext } from "../../../../../common/contexts/AppContextProvider"
import useCommentQuery from "../../../../../common/hooks/comments/useCommentQuery"
import CommentMainAdmin from "./CommentMainAdmin"
import { IComment } from "../../../../../common/interfaces/comment"

type Props = {
    productId: string | number
}

const TabComment = ({ productId }: Props) => {
    const [comments, setComments] = useState<IComment[]>([]); // Khai báo rõ ràng kiểu dữ liệu là IComment[]
    const { currentUser } = useContext(AppContext)
    const [commentId, setCommentId] = useState<string | number | null>(null)
    const [rates, setRates] = useState({ "5": [], "4": [], "3": [], "2": [], "1": [] })
    const [rating, setRating] = useState(0)
    const commentQuery = useCommentQuery(productId)
    const commentRef = useRef<HTMLDivElement>(null)
    // Lấy danh sách bình luận từ API
    useEffect(() => {

        if (commentQuery.data) {
            setComments(commentQuery.data);
        }
    }, [productId, commentQuery.data]);
    useEffect(() => {
        if (comments.length > 0) {
            const newRates = comments.reduce((init: any, item: IComment) => {
                if (!init[item.rating]) {
                    init[item?.rating] = []
                }
                init[item?.rating].push(item.rating);
                return init
            }, {})
            setRates(newRates)
            const sum = comments.reduce((init, item: IComment) => init + item.rating, 0)
            setRating(sum / comments.length)
        }
    }, [comments])
    console.log(rates)
    return (
        <div className='flex gap-x-6'>
            <div className=" px-5 w-max">
                <div className="text-5xl w-max mx-auto mb-4">{rating}<StarOutlined className=" text-yellow" /></div>
                <div className="mx-auto w-max">
                    <div className="flex items-center gap-x-2 mb-2">
                        <span>5 sao</span>
                        <Rate value={5} disabled />
                        <span>({rates['5'] ? rates['5'].length : 0})</span>
                    </div>
                    <div className="flex items-center gap-x-2 mb-2">
                        <span>4 sao</span>
                        <Rate value={4} disabled />
                        <span>({rates['4'] ? rates['4'].length : 0})</span>
                    </div>
                    <div className="flex items-center gap-x-2 mb-2">
                        <span>3 sao</span>
                        <Rate value={3} disabled />
                        <span>({rates['3'] ? rates['3'].length : 0})</span>
                    </div>
                    <div className="flex items-center gap-x-2 mb-2">
                        <span>2 sao</span>
                        <Rate value={2} disabled />
                        <span>({rates['2'] ? rates['2'].length : 0})</span>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <span>1 sao</span>
                        <Rate value={1} disabled />
                        <span>({rates['1'] ? rates['1'].length : 0})</span>
                    </div>
                </div>
            </div>
            <div className="w-full">
                {/* <div className="pb-4">
                    Filter
                </div> */}
                <div ref={commentRef} className="flex flex-col w-full px-4 py-4 border overflow-y-scroll h-[450px]">
                    {comments.length > 0 ?
                        comments.map((comment) => (
                            <CommentMainAdmin
                                key={comment?._id}
                                setCommentId={setCommentId}
                                commentId={commentId}
                                comment={comment}
                                commentRef={commentRef}
                                user={currentUser}
                            />
                        )) :
                        (<p>Chưa có đánh đánh giá nào.</p>)}
                </div>
            </div>
        </div>
    )
}

export default TabComment