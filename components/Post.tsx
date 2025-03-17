import { IPost } from "@/utils/types";
import React from "react";

const Post = ({ data }: { data: IPost }) => {
	const { userId, title, body } = data;
	return (
		<div className='border-2 border-black p-4 w-56 rounded-xl shadow-emerald-600 hover:shadow-md hover:border-emerald-600 hover:scale-105 transition-transform duration-500 space-y-3'>
			<h1 className='font-bold text-md'>User ID: {userId}</h1>
			<h1 className='font-bold text-md'>{title}</h1>
			<p>{body}</p>
		</div>
	);
};
export default Post;
