// import fs from 'fs';
// import path from 'path';
// // retrieve all svg files from src/lib/images and return as an array of objects with src: stuff in file and alt: file name keys
// export const getSVGs = () => {
// 	const dir = path.join(process.cwd(), 'src/lib/images');
// 	const files = fs.readdirSync(dir);
// 	const svgs = files.filter((file) => file.endsWith('.svg'));
// 	const svgsData = svgs.map((svg) => {
// 		const svgPath = path.join(dir, svg);
// 		const svgData = fs.readFileSync(svgPath, 'utf8');
// 		return {
// 			src: svgData,
// 			alt: svg
// 		};
// 	});
// 	return svgsData;
// };

// export const getSVGs = () => {
// 	const files = fs.readdirSync(path.join(__dirname, 'lib', 'images'));
// 	const svgFiles = files.filter((file) => {
// 		const stat = fs.statSync(path.join(__dirname, 'lib', 'images', file));
// 		return stat.isFile() && path.extname(file) === '.svg';
// 	});
// 	console.log('from api', svgFiles.map((file) => path.basename(file, '.svg')));
// 	return svgFiles.map((file) => path.basename(file, '.svg'));
// };

// const apiCall = async () => {
//       const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//       const data = await res.json();
//       return data;
//       }
export const stuff = []