import { useState } from "react";
import { Label } from "./label";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Calendar1, Calendar1Icon, ChevronDownIcon } from "lucide-react";
import { Calendar } from "./calendar";
import clsx from "clsx";

interface DatePickerProps {
	label?: string;
	value?: Date;
	onChange: (date?: Date) => void;
	className?: string;
}

const DatePicker = ({ label, value, onChange, className }: DatePickerProps) => {
	const [open, setOpen] = useState(false);

	const handleSelect = (date?: Date) => {
		if (onChange) {
			onChange(date);
		}
		setOpen(false);
	};
	return (
		<div className={clsx("flex flex-col gap-3", className)}>
			{label && (
				<Label htmlFor="date" className="px-1">
					{label}
				</Label>
			)}
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline" id="date" className="w-full justify-between font-normal">
						{value ? value.toLocaleDateString() : "Select date"}
						<Calendar1 />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto overflow-hidden p-0" align="start">
					<Calendar mode="single" selected={value} captionLayout="dropdown" onSelect={handleSelect} />
				</PopoverContent>
			</Popover>
		</div>
	);
};
export default DatePicker;
