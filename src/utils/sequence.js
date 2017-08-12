import repeat from './repeat';

export default function sequence(start, end) {
	return repeat(start, end - start + 1)
		.map((x, i) => x + i);
}