import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import type { Route } from "./+types/login";
import { LoginSchema, type LoginInput } from "~/schemas/auth/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from "~/features/auth/hooks/useLogin";

export function loader() {
	return null; // explicitly says "no data needed"
}

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData();
	const email = formData.get("email");
	const password = formData.get("password");
	console.log(email, password);
	return null;
}

export default function Login() {
	const mutation = useLogin();

	const form = useForm({
		resolver: zodResolver(LoginSchema),
		mode: "onChange",
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleSubmit = async (data: LoginInput) => {
		await mutation.mutateAsync(data);
	};

	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>Enter your email below to login to your account</CardDescription>
					<CardAction>
						<Button variant="link" asChild>
							<Link to="/signup">Sign Up</Link>
						</Button>
					</CardAction>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(handleSubmit)} className="grid w-full gap-4">
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
										<Link
											to="/forgot-password"
											className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
										>
											Forgot your password?
										</Link>
									</FormItem>
								)}
							/>

							<div className="flex-col gap-2">
								<Button type="submit" className="w-full">
									Login
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
