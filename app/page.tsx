"use client";

import Button from "@/components/Button";
import Post from "@/components/Post";
import { IPost } from "@/utils/types";
import { useEffect, useState } from "react";

export default function Home() {
	const [posts, setPosts] = useState<IPost[] | []>([]);
	const [titleSort, setTitleSort] = useState<boolean>(true);
	const [userIDSort, setUserIDSort] = useState<boolean>(false);
	const [filterByUserID, setFilterByUserID] = useState<number>(0);

	useEffect(() => {
		const filteredPosts = posts.filter(
			(post) => post.userId == filterByUserID
		);
		setPosts([...filteredPosts]);
	}, [filterByUserID]);

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(
				"https://jsonplaceholder.typicode.com/posts"
			);

			const data = await res.json();

			setPosts(data);
		}

		fetchData();
	}, []);

	function handleSortByTitle() {
		if (titleSort) {
			const sortedPosts = posts.sort((a, b) =>
				a.title.localeCompare(b.title)
			);
			setPosts([...sortedPosts]);
			setTitleSort(false);
		} else {
			const sortedPosts = posts.sort((a, b) =>
				b.title.localeCompare(a.title)
			);
			setPosts([...sortedPosts]);
			setTitleSort(true);
		}
	}

	function handleSortByUserID() {
		if (userIDSort) {
			const sortedPosts = posts.sort((a, b) => a.userId - b.userId);
			setPosts([...sortedPosts]);
			setUserIDSort(false);
		} else {
			const sortedPosts = posts.sort((a, b) => b.userId - a.userId);
			setPosts([...sortedPosts]);
			setUserIDSort(true);
		}
	}

	function handleSearchByTitle(e: React.ChangeEvent<HTMLInputElement>) {
		const target = e.target as HTMLInputElement;
		const searchTerm = target.value;
		const filteredPosts = posts.filter((post) =>
			post.title.includes(searchTerm)
		);
		setPosts([...filteredPosts]);
	}

	return (
		<div>
			<div className='flex justify-center items-center gap-3'>
				<Button text='Short By Title' onClick={handleSortByTitle} />
				<Button text='Short By UserID' onClick={handleSortByUserID} />

				<select
					name='userIDFilter'
					id='userIdFilter'
					className='border-2 border-black p-2 rounded-md hover:border-emerald-600 transition-transform duration-500'
					onChange={(e) =>
						setFilterByUserID(parseInt(e.target.value))
					}
				>
					<option value={0}>None</option>
					<option value={1}>1</option>
					<option value={2}>2</option>
					<option value={3}>3</option>
					<option value={4}>4</option>
					<option value={5}>5</option>
					<option value={6}>6</option>
					<option value={7}>7</option>
					<option value={8}>8</option>
					<option value={9}>9</option>
					<option value={10}>10</option>
				</select>

				<input
					type='text'
					onChange={handleSearchByTitle}
					placeholder='Search by Title'
				/>
			</div>
			<div className='border-2 border-red-500 flex flex-wrap gap-4 p-4 justify-center'>
				{posts.map((post: IPost) => (
					<Post key={post.id} data={post} />
				))}
			</div>
		</div>
	);
}
