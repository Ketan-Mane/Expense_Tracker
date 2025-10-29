import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

export function loader() {
	return null; // explicitly says "no data needed"
}

export default function Login() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
			<Card className="w-full max-w-md shadow-lg">
				<CardHeader className="text-center space-y-2 pb-8">
					<div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
						<svg
							className="w-10 h-10 text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<CardTitle className="text-3xl">Welcome Back</CardTitle>
					<CardDescription className="text-base">Sign in to your expense tracker account</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-3">
						<Button
							type="button"
							variant="outline"
							onClick={() =>
								(window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/login/google-oauth2`)
							}
							className="w-full flex items-center justify-center"
						>
							<svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clipPath="url(#clip0_17_40)">
									<path
										d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
										fill="#4285F4"
									/>
									<path
										d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
										fill="#34A853"
									/>
									<path
										d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
										fill="#FBBC04"
									/>
									<path
										d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
										fill="#EA4335"
									/>
								</g>
								<defs>
									<clipPath id="clip0_17_40">
										<rect width="48" height="48" fill="white" />
									</clipPath>
								</defs>
							</svg>
							Continue with Google
						</Button>
					</div>

					{/* <div className="relative my-6">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-200"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-4 bg-white text-gray-500">Secure & encrypted</span>
						</div>
					</div>

					<p className="text-center text-sm text-gray-500 mt-6">
						By continuing, you agree to our{' '}
						<button className="text-blue-600 hover:underline">Terms of Service</button> and{' '}
						<button className="text-blue-600 hover:underline">Privacy Policy</button>
					</p> */}
				</CardContent>
			</Card>
		</div>
	);
}
