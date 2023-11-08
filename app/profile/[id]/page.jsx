'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import Profile from '@components/Profile';

const othersProfile = () => {
	const pathName = usePathname();
	const searchParams = useSearchParams();

	const userID = pathName.slice(9);
	const username = searchParams.get('name');

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const res = await fetch(`/api/users/${userID}/posts`);
			const data = await res.json();

			setPosts(data);
		};

		if (userID) fetchPosts();
	}, []);

	return (
		<div>
			<Profile
				name={`${username}'s`}
				desc={`Welcome to ${username} page`}
				data={posts}
			/>
		</div>
	);
};

export default othersProfile;
