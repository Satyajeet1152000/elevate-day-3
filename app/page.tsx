"use client";

import Button from "@/components/Button";
import Post from "@/components/Post";
import { IPost } from "@/utils/types";
import { useEffect, useState } from "react";

export default function Home() {
	const [posts, setPosts] = useState<IPost[] | []>([]);
	const [filteredPosts, setFilteredPosts] = useState<IPost[] | []>([]);

	const [titleSort, setTitleSort] = useState<boolean>(true);
	const [userIDSort, setUserIDSort] = useState<boolean>(false);

	const [filterByUserID, setFilterByUserID] = useState<number>(0);

	const [searchTerm, setSearchTerm] = useState<string>("");

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(
				"https://jsonplaceholder.typicode.com/posts"
			);
			const data = await res.json();
			setPosts(data);
			setFilteredPosts(data);
		}

		fetchData();
	}, []);

	useEffect(() => {
		let filtered = posts;
		if (filterByUserID !== 0) {
			filtered = posts.filter((post) => post.userId === filterByUserID);
		}

		if (searchTerm) {
			filtered = filtered.filter((post) =>
				post.title.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		setFilteredPosts(filtered);
	}, [filterByUserID, searchTerm, posts]);

	function handleSortByTitle() {
		const sortedPosts = [...filteredPosts].sort((a, b) =>
			titleSort
				? a.title.localeCompare(b.title)
				: b.title.localeCompare(a.title)
		);
		setFilteredPosts(sortedPosts);
		setTitleSort(!titleSort);
	}

	function handleSortByUserID() {
		const sortedPosts = [...filteredPosts].sort((a, b) =>
			userIDSort ? a.userId - b.userId : b.userId - a.userId
		);
		setFilteredPosts(sortedPosts);
		setUserIDSort(!userIDSort);
	}

	return (
		<div className='space-y-4'>
			<div className='flex justify-center items-center gap-5 py-4'>
				<Button text='Sort By Title' onClick={handleSortByTitle} />
				<Button text='Sort By UserID' onClick={handleSortByUserID} />

				<select
					name='userIDFilter'
					id='userIdFilter'
					className='border-2 border-black p-2 rounded-md hover:border-emerald-600 transition-transform duration-500'
					onChange={(e) =>
						setFilterByUserID(parseInt(e.target.value))
					}
				>
					<option value={0}>None</option>
					{[...Array(10).keys()].map((i) => (
						<option key={i + 1} value={i + 1}>
							{i + 1}
						</option>
					))}
				</select>

				<input
					type='text'
					onChange={(e) => setSearchTerm(e.target.value)}
					value={searchTerm}
					placeholder='Search by Title'
					className='border-2 border-black p-2 rounded-md hover:border-emerald-600 transition-transform duration-500'
				/>
			</div>

			<div className='flex flex-wrap gap-4 p-4 justify-center'>
				{filteredPosts.map((post: IPost) => (
					<Post key={post.id} data={post} />
				))}
			</div>
		</div>
	);
}
