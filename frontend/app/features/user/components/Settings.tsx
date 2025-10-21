import { Loader2, Save, X } from 'lucide-react';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Form, FormControl, FormMessage, FormField, FormLabel } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Switch } from '~/components/ui/switch';
import { settingsSchema, type SettingsFormData } from '~/features/user/types/settings';
import { useUserSettings } from '../hooks/use-user-settings';
import { useUpdateUserSettings } from '../hooks/use-update-user-settings';
import { toast } from 'sonner';
import useCategories from '~/features/category/hooks/use-categories';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const paymentMethods = [
	'Credit Card',
	'Debit Card',
	'Cash',
	'Bank Transfer',
	'Digital Wallet',
	'Check',
	'UPI',
	'Other',
];
const currencies = [
	{ code: 'USD', name: 'US Dollar ($)' },
	{ code: 'EUR', name: 'Euro (€)' },
	{ code: 'GBP', name: 'British Pound (£)' },
	{ code: 'JPY', name: 'Japanese Yen (¥)' },
	{ code: 'CAD', name: 'Canadian Dollar (C$)' },
	{ code: 'AUD', name: 'Australian Dollar (A$)' },
	{ code: 'INR', name: 'Indian Rupee (₹)' },
	{ code: 'CNY', name: 'Chinese Yuan (¥)' },
];

const days = Array.from({ length: 31 }, (_, i) => i + 1);

const Settings = () => {
	const { data: settings, isLoading } = useUserSettings();
	const { mutateAsync: updateUserSettings, isPending } = useUpdateUserSettings();
	const { data: categoriesData } = useCategories();
	const categories = categoriesData?.categories || [];

	const form = useForm({
		resolver: zodResolver(settingsSchema),
		defaultValues: {
			defaultPaymentMethod: 'UPI',
			defaultCurrency: 'INR',
			financialMonthStart: 1,
			financialMonthEnd: 31,
			weeklyStartDay: 'Sunday',
			monthlyBudgetLimit: 0,
			budgetNotificationsEnabled: true,
			transactionReminders: true,
			favoriteCategories: [],
			defaultView: 'list',
			recurringTransactionFrequency: 'monthly',
			recurringTransactionDefaultCategory: null,
		},
	});

	useEffect(() => {
		if (settings) {
			console.log('resetting form');
			form.reset({
				defaultPaymentMethod: settings.defaultPaymentMethod || 'UPI',
				defaultCurrency: settings.defaultCurrency || 'INR',
				financialMonthStart: settings.financialMonthStart || 1,
				financialMonthEnd: settings.financialMonthEnd || 31,
				weeklyStartDay: settings.weeklyStartDay || 'Sunday',
				monthlyBudgetLimit: settings.monthlyBudgetLimit || 0,
				budgetNotificationsEnabled: settings.budgetNotificationsEnabled ?? true,
				transactionReminders: settings.transactionReminders ?? true,
				favoriteCategories: settings.favoriteCategories || [],
				defaultView: settings.defaultView || 'list',
				recurringTransactionFrequency: settings.recurringTransactionFrequency || 'monthly',
				recurringTransactionDefaultCategory: settings.recurringTransactionDefaultCategory || null,
			});
		}
	}, [settings]);

	const onSubmit = async (data: SettingsFormData) => {
		await updateUserSettings(data, {
			onSuccess: () => toast.success('Settings updated successfully!'),
			onError: () => toast.error('Failed to update settings.'),
		});
	};

	const toggleFavoriteCategory = (category: string) => {
		const favorites = form.getValues('favoriteCategories') || [];
		const updated = favorites.includes(category)
			? favorites.filter((c) => c !== category)
			: [...favorites, category];
		form.setValue('favoriteCategories', updated);
	};

	if (isLoading) {
		return (
			<div className="w-screen h-screen flex justify-center items-center">
				<Loader2 className="animate-spin" />
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>General Settings</CardTitle>
							<CardDescription>Configure default payment & currency</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-6 md:grid-cols-2">
							<FormField
								name="defaultPaymentMethod"
								control={form.control}
								render={({ field }) => (
									<div className="space-y-2">
										<FormLabel htmlFor="payment-method">Payment Method</FormLabel>
										<FormControl>
											<Select value={field.value} onValueChange={field.onChange}>
												<SelectTrigger className="w-40" id="payment-method">
													<SelectValue placeholder="Select payment method" />
												</SelectTrigger>
												<SelectContent>
													{paymentMethods.map((m) => (
														<SelectItem key={m} value={m}>
															{m}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</div>
								)}
							/>

							<FormField
								name="defaultCurrency"
								control={form.control}
								render={({ field }) => (
									<div className="space-y-2">
										<FormLabel htmlFor="currency">Currency</FormLabel>
										<FormControl>
											<Select value={field.value} onValueChange={field.onChange}>
												<SelectTrigger className="w-40" id="currency">
													<SelectValue placeholder="Select currency" />
												</SelectTrigger>
												<SelectContent>
													{currencies.map((c) => (
														<SelectItem key={c.code} value={c.code}>
															{c.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</div>
								)}
							/>
						</CardContent>
					</Card>

					{/* Financial Month & Week */}
					<Card>
						<CardHeader>
							<CardTitle>Financial Period</CardTitle>
							<CardDescription>Month & Week preferences</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-6 md:grid-cols-3">
							<FormField
								name="financialMonthStart"
								control={form.control}
								render={({ field }) => (
									<div className="space-y-2">
										<FormLabel htmlFor="month-start">Month Start</FormLabel>
										<FormControl>
											<Select
												value={String(field.value ?? 1)}
												onValueChange={(val) => field.onChange(Number(val))} // convert string -> number
											>
												<SelectTrigger id="month-start">
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													{days.map((d) => (
														<SelectItem key={d} value={d?.toString()}>
															{d}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</div>
								)}
							/>

							<FormField
								name="financialMonthEnd"
								control={form.control}
								render={({ field }) => (
									<div className="space-y-2">
										<FormLabel htmlFor="month-end">Month End</FormLabel>
										<FormControl>
											<Select
												value={String(field.value ?? 1)}
												onValueChange={(val) => field.onChange(Number(val))}
											>
												<SelectTrigger id="month-end">
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													{days.map((d) => (
														<SelectItem key={d} value={d?.toString()}>
															{d}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</div>
								)}
							/>

							<FormField
								name="weeklyStartDay"
								control={form.control}
								render={({ field }) => (
									<div className="space-y-2">
										<FormLabel htmlFor="week-start">Week Start</FormLabel>
										<FormControl>
											<Select {...field}>
												<SelectTrigger id="week-start">
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="Sunday">Sunday</SelectItem>
													<SelectItem value="Monday">Monday</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</div>
								)}
							/>
						</CardContent>
					</Card>

					{/* Budget */}
					<Card>
						<CardHeader>
							<CardTitle>Budget</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<FormField
								name="monthlyBudgetLimit"
								control={form.control}
								render={({ field }) => (
									<div className="space-y-2">
										<FormLabel htmlFor="budget-limit">Monthly Budget Limit</FormLabel>
										<FormControl>
											<Input
												type="number"
												value={field.value?.toString() ?? ''}
												onChange={(e) => field.onChange(Number(e.target.value))}
												placeholder="Enter budget limit"
											/>
										</FormControl>
										<FormMessage />
									</div>
								)}
							/>

							<FormField
								name="budgetNotificationsEnabled"
								control={form.control}
								render={({ field }) => (
									<div className="flex items-center justify-between">
										<FormLabel>Budget Notifications</FormLabel>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={(val) => {
													field.onChange(val);
												}}
											/>
										</FormControl>
										<FormMessage />
									</div>
								)}
							/>

							<FormField
								name="transactionReminders"
								control={form.control}
								render={({ field }) => (
									<div className="flex items-center justify-between">
										<FormLabel>Transaction Reminders</FormLabel>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={(val) => {
													field.onChange(val);
												}}
											/>
										</FormControl>
										<FormMessage />
									</div>
								)}
							/>
						</CardContent>
					</Card>

					{/* Favorite Categories */}
					{/* <Card>
						<CardHeader>
							<CardTitle>Favorite Categories</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex flex-wrap gap-2">
								{categories.map((c) => {
									const favorites = form.getValues('favoriteCategories') || [];
									const isFav = favorites.includes(c);
									return (
										<Badge
											key={c.id}
											variant={isFav ? 'default' : 'outline'}
											className="cursor-pointer px-3 py-1.5"
											onClick={() => toggleFavoriteCategory(c)}
										>
											{c.name} {isFav && <X className="ml-1 h-3 w-3" />}
										</Badge>
									);
								})}
							</div>
						</CardContent>
					</Card> */}

					{/* Save & Reset */}
					<div className="flex justify-end gap-2">
						{/* <Button variant="outline" onClick={handleReset}>
							Reset
						</Button> */}
						<Button type="submit" isProcessing={isPending}>
							<Save className="h-4 w-4 mr-2" />
							Save Changes
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};
export default Settings;
