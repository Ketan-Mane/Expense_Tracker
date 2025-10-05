import { cloneElement, useState, type ReactElement, type ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

interface ModalProps {
	title: string;
	description?: string;
	button:  ReactElement<any>; // Button (HTML or shadcn)
	render: ReactNode; // Content inside modal
}

const Modal = ({ title, description, render, button }: ModalProps) => {
	const [open, setOpen] = useState(false);

	// Safely clone button and add onClick
	const trigger = cloneElement(button, {
		onClick: (e: React.MouseEvent) => {
			button.props?.onClick?.(e); // keep existing onClick
			setOpen(true);
		},
	});

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{description && <DialogDescription>{description}</DialogDescription>}
				</DialogHeader>
				{render}
			</DialogContent>
		</Dialog>
	);
};

export default Modal;
