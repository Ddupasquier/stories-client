import PrismaClientPkg from '@prisma/client';

const PrismaClient = PrismaClientPkg.PrismaClient;
const prisma = new PrismaClient();

interface Page {
	background: string;
	storyId: number;
}

interface Element {
	elementId: number;
	type: string;
	x: number;
	y: number;
	zIndex: number;
	size: number;
	pageId: number;
}

const seedUsers = () => {
	return [
		{
			email: 'random@gmail.com',
			name: 'Random'
		},
		{
			email: 'rnado2@gmail.com',
			name: 'Random2'
		},
		{
			email: 'whatever@pewp.com',
			name: 'Whatever'
		}
	];
};

const seedStories = () => {
	return [
		{
			title: 'The Great Gatsby',
			author: 'F. Scott Fitzgerald',
			userId: 1
		},
		{
			title: 'The Catcher in the Rye',
			author: 'J.D Salinger',
			userId: 1
		},
		{
			title: 'The Lord of the Rings',
			author: 'J.R.R. Tolkien',
			userId: 1
		},
		{
			title: 'Enders Game',
			author: 'Orson Scott Card',
			userId: 2
		},
		{
			title: 'The Hobbit',
			author: 'J.R.R. Tolkien',
			userId: 2
		},
		{
			title: 'The Hitchhikers Guide to the Galaxy',
			author: 'Douglas Adams',
			userId: 2
		},
		{
			title: 'The Martian',
			author: 'Andy Weir',
			userId: 3
		},
		{
			title: 'The Hunger Games',
			author: 'Suzanne Collins',
			userId: 3
		}
	];
};

const randomColor = () => {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};


const seedPages = () => {
	const pages: Page[] = [];
	let storyId = 1;
	for (let i = 0; i < 8; i++) {
		pages.push({
			background: randomColor(),
			storyId: storyId
		});
		pages.push({
			background: randomColor(),
			storyId: storyId
		});
		storyId++;
	}
	return pages;
};


const seedElements = () => {
	const elements: Element[] = [];
	let pageId = 1;
	for (let i = 0; i < 16; i++) {
		elements.push({
			elementId: 1,
			type: 'image',
			x: 20,
			y: 35,
			zIndex: 1,
			size: 80,
			pageId: pageId
		});
		elements.push({
			elementId: 2,
			type: 'image',
			x: 15,
			y: 50,
			zIndex: 0,
			size: 50,
			pageId: pageId
		});
		pageId++;
	}
	return elements;
};

async function seed() {
	await prisma.user.deleteMany()
	await prisma.story.deleteMany()
	await prisma.page.deleteMany()
	await prisma.element.deleteMany()

	await Promise.all(
		seedUsers().map(async (user) => {
			await prisma.user.create({
				data: user
			});
		})
	);

	await Promise.all(
		seedStories().map(async (story) => {
			await prisma.story.create({
				data: story
			});
		})
	);

	await Promise.all(
		seedPages().map(async (page) => {
			await prisma.page.create({
				data: page
			});
		})
	);

	await Promise.all(
		seedElements().map(async (element) => {
			await prisma.element.create({
				data: element
			});
		})
	);
}

seed();
