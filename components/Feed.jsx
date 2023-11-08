'use client';
import { useEffect, useState } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post) => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	);
};

const Feed = () => {
	const [allPosts, setAllPosts] = useState([]);

	// Seatch states
	const [searchText, setSearchText] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		const fecthPosts = async () => {
			const res = await fetch('/api/prompt');
			const data = await res.json();

			setAllPosts(data);
		};

		fecthPosts();
	}, []);

	const filteredPosts = (searchText) => {
		const regex = new RegExp(searchText, 'i');

		const results = allPosts.filter(
			(post) =>
				regex.test(post.prompt) ||
				regex.test(post.tag) ||
				regex.test(post.creator.username)
		);

		setSearchResults(results);
	};

	const handleSearchChange = (e) => {
		setSearchText(e.target.value);
		filteredPosts(e.target.value);
	};

	const handleTagClick = (tag) => {
		setSearchText(tag);
		filteredPosts(tag);
	};

	console.log(searchText);
	console.log(searchResults);

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for a tag or a username"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>

			{searchText ? (
				<PromptCardList data={searchResults} handleTagClick={handleTagClick} />
			) : (
				<PromptCardList data={allPosts} handleTagClick={handleTagClick} />
			)}
		</section>
	);
};

export default Feed;
