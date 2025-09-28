import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import useSignup from "~/features/auth/hooks/useSignup";
import { SignupSchema, type SignupForm } from "~/features/auth/validators/signup.validator";

const SignUp = () => {
	const mutation = useSignup();
	const navigate = useNavigate();

	const form = useForm({
		resolver: zodResolver(SignupSchema),
		mode: "onChange",
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const handleSubmit = async (data: SignupForm) => {
		(
			await mutation.mutateAsync(data, {
				onSuccess: () => {
					navigate("/login");
				},
			})
		).success && form.reset();
	};
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>Create your account</CardTitle>
					<CardDescription>Fill in your details below to sign up for a new account</CardDescription>
					<CardAction>
						<Button variant="link" asChild>
							<Link to="/login">Login Now</Link>
						</Button>
					</CardAction>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(handleSubmit)} className="grid w-full gap-4">
							<FormField
								name="name"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="name">Name</FormLabel>
										<Input {...field} />
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name="email"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="email">Email</FormLabel>
										<Input {...field} />
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name="password"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="password">Password</FormLabel>
										<Input type="password" {...field} />
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex-col gap-2">
								<Button type="submit" className="w-full">
									Sign Up
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default SignUp;
