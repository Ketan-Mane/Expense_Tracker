import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

const Loading = ({ className, size = 'sm' }: { className?: string; size?: 'sm' | 'screen' }) => {
	const sizes: Record<string, string> = {
		sm: 'w-max h-max',
		screen: 'w-screen h-screen',
	};

	return (
		<div className={clsx('flex justify-center items-center', sizes[size], className)}>
			<Loader2 className="animate-spin" />
		</div>
	);
};
export default Loading;
