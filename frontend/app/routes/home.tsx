import {
	ArrowRight,
	BarChart3,
	Filter,
	FolderKanban,
	LogIn,
	PlusCircle,
	RefreshCw,
	Sparkles,
	TrendingUp,
	Wallet,
} from 'lucide-react';
import { Link, type MetaArgs } from 'react-router';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
export function meta({}: MetaArgs) {
	return [
		{ title: 'Home - Expense Tracker' },
		{ name: 'description', content: 'Welcome to React Router! Hello React' },
	];
}

export default function Home() {
	const features = [
		{
			icon: PlusCircle,
			title: 'Create & Manage Transactions',
			description:
				'Easily add, edit, and organize your expenses. Track every dollar with intuitive transaction management.',
			color: 'from-blue-500 to-cyan-500',
			highlights: ['Quick entry', 'Edit anytime', 'Bulk operations'],
		},
		{
			icon: FolderKanban,
			title: 'Customize Categories',
			description:
				'Create personalized expense categories with custom colors and budgets to match your lifestyle.',
			color: 'from-purple-500 to-pink-500',
			highlights: ['Custom colors', 'Budget limits', 'Unlimited categories'],
		},
		{
			icon: BarChart3,
			title: 'Monthly Analytics',
			description: 'Visualize spending patterns with detailed charts comparing current and previous months.',
			color: 'from-orange-500 to-red-500',
			highlights: ['Category breakdown', 'Trend analysis', 'Comparison charts'],
		},
		{
			icon: Filter,
			title: 'Advanced Filtering',
			description: 'Find transactions instantly with powerful filters by month, category, and description.',
			color: 'from-green-500 to-emerald-500',
			highlights: ['Multi-filter', 'Date ranges', 'Smart search'],
		},
		{
			icon: RefreshCw,
			title: 'Smart Features',
			description:
				'Archive old transactions, create recurring expenses, and manage your financial data efficiently.',
			color: 'from-indigo-500 to-blue-500',
			highlights: ['Auto-recurring', 'Archive system', 'Data export'],
		},
	];
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
			{/* Hero Section */}
			<section className="relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
				<div className="container mx-auto px-4 py-16 md:py-24 relative">
					<div className="max-w-4xl mx-auto text-center space-y-8">
						{/* Logo/Icon */}
						<div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-lg mb-4">
							<Wallet className="w-11 h-11 text-white" />
						</div>

						{/* Badge */}
						<div className="flex justify-center">
							<Badge className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 border-0">
								<Sparkles className="w-3.5 h-3.5 mr-1.5" />
								Smart Expense Management
							</Badge>
						</div>

						{/* Headline */}
						<div className="space-y-4">
							<h1 className="text-5xl md:text-6xl lg:text-7xl">
								Take Control of Your{' '}
								<span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
									Finances
								</span>
							</h1>
							<p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
								Track expenses, analyze spending patterns, and achieve your financial goals with
								powerful yet simple tools.
							</p>
						</div>

						{/* CTA Buttons */}
						<div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
							<Button
								size="lg"
								className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 h-12 text-lg shadow-lg hover:shadow-xl transition-all"
								asChild
							>
								<Link to="/signup">
									Get Started Free
									<ArrowRight className="ml-2 w-5 h-5" />
								</Link>
							</Button>
						</div>
					</div>
				</div>

				{/* Decorative Elements */}
				<div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
				<div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
			</section>

			{/* Features Section */}
			<section className="container mx-auto px-4 py-16 md:py-24">
				<div className="text-center mb-16 space-y-4">
					<h2 className="text-4xl md:text-5xl">
						Everything You Need to{' '}
						<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							Manage Money
						</span>
					</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Powerful features designed to simplify your financial life
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
					{features.map((feature, index) => {
						const Icon = feature.icon;
						return (
							<Card
								key={index}
								className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-gray-200 overflow-hidden"
							>
								<CardHeader className="space-y-4">
									<div
										className={`inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} items-center justify-center group-hover:scale-110 transition-transform duration-300`}
									>
										<Icon className="w-7 h-7 text-white" />
									</div>
									<div>
										<CardTitle className="text-2xl mb-2">{feature.title}</CardTitle>
										<CardDescription className="text-base">{feature.description}</CardDescription>
									</div>
								</CardHeader>
								<CardContent>
									<ul className="space-y-2">
										{feature.highlights.map((highlight, idx) => (
											<li key={idx} className="flex items-center text-sm text-gray-600">
												<div
													className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.color} mr-2.5`}
												></div>
												{highlight}
											</li>
										))}
									</ul>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</section>

			{/* How It Works Section */}
			<section className="container mx-auto px-4 py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
				<div className="text-center mb-16 space-y-4">
					<h2 className="text-4xl md:text-5xl">How It Works</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">Get started in three simple steps</p>
				</div>

				<div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
					{[
						{
							step: '01',
							title: 'Create Account',
							description: 'Sign up with your favorite social login in seconds',
							icon: Sparkles,
						},
						{
							step: '02',
							title: 'Add Transactions',
							description: 'Start tracking your expenses with custom categories',
							icon: PlusCircle,
						},
						{
							step: '03',
							title: 'Analyze & Optimize',
							description: 'View insights and make smarter financial decisions',
							icon: TrendingUp,
						},
					].map((item, index) => {
						const Icon = item.icon;
						return (
							<div key={index} className="text-center space-y-4 relative">
								{index < 2 && (
									<div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-blue-300 to-purple-300"></div>
								)}
								<div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 text-white mb-4 relative z-10">
									<Icon className="w-10 h-10" />
								</div>
								<div className="text-sm text-gray-500 tracking-wider">STEP {item.step}</div>
								<h3 className="text-2xl">{item.title}</h3>
								<p className="text-gray-600">{item.description}</p>
							</div>
						);
					})}
				</div>
			</section>

			{/* CTA Section */}
			<section className="container mx-auto px-4 py-16 md:py-24">
				<Card className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-purple-600 border-0 text-white overflow-hidden relative">
					<div className="absolute inset-0 bg-grid-white/5"></div>
					<CardContent className="relative z-10 py-16 px-8 text-center space-y-6">
						<h2 className="text-4xl md:text-5xl">Ready to Get Started?</h2>
						<p className="text-xl text-blue-100 max-w-2xl mx-auto">
							Join thousands of users who are already taking control of their finances
						</p>
						<div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
							<Button
								size="lg"
								className="bg-white text-blue-600 hover:bg-gray-100 px-8 h-12 text-lg shadow-lg hover:shadow-xl transition-all"
								asChild
							>
								<Link to="/signup">
									Start Tracking Now
									<ArrowRight className="ml-2 w-5 h-5" />
								</Link>
							</Button>
						</div>
					</CardContent>
				</Card>
			</section>

			{/* Footer */}
			<footer className="border-t bg-gray-50">
				<div className="container mx-auto px-4 py-8">
					<div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
						<div className="flex items-center gap-2">
							<Wallet className="w-5 h-5 text-blue-600" />
							<span>© {new Date().getFullYear()} Expense Tracker. All rights reserved.</span>
						</div>
						<div className="flex gap-6">
							<button className="hover:text-blue-600 transition-colors">Privacy Policy</button>
							<button className="hover:text-blue-600 transition-colors">Terms of Service</button>
							<button className="hover:text-blue-600 transition-colors">Contact</button>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
