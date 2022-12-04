import * as images from './images';

export const fakerStories: Story[] = [
	{
		id: 1,
		title: 'The Great Gatsby',
		author: 'F. Scott Fitzgerald',
		pages: [
			{
				id: 1,
				background: '#ffffff',
				elements: [
					{
						id: images.totoro,
						x: 20,
						y: 35,
						zIndex: 1,
						size: 80,
					},
					{
						id: images.moonLoader,
						x: 15,
						y: 50,
						zIndex: 0,
						size: 50,
					}
				]
			},
			{
				id: 2,
				background: '#fff000',
				elements: [
					{
						x: 0,
						y: 0,
						zIndex: 0
					},
					{
						x: 0,
						y: 0,
						zIndex: 1
					}
				]
			}
		]
	},
	{
		id: 2,
		title: 'The Catcher in the Rye',
		author: 'J. D. Salinger',
		pages: [
			{
				id: 1,
				background: 'red',
				elements: [
					{
						x: 0,
						y: 0,
						zIndex: 0
					},
					{
						x: 0,
						y: 0,
						zIndex: 1
					}
				]
			},
			{
				id: 2,
				background: 'green',
				elements: [
					{
						x: 0,
						y: 0,
						zIndex: 0
					},
					{
						x: 0,
						y: 0,
						zIndex: 1
					}
				]
			}
		]
	},
	{
		id: 3,
		title: 'The Lord of the Rings',
		author: 'J. R. R. Tolkien',
		pages: [
			{
				id: 1,
				background: 'orange',
				elements: [
					{
						x: 0,
						y: 0,
						zIndex: 0
					},
					{
						x: 0,
						y: 0,
						zIndex: 1
					}
				]
			},
			{
				id: 2,
				background: 'purple',
				elements: [
					{
						x: 0,
						y: 0,
						zIndex: 0
					},
					{
						x: 0,
						y: 0,
						zIndex: 1
					}
				]
			}
		]
	}
];
