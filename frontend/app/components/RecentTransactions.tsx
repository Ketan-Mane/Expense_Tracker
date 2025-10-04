import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

const transactions = [
  {
    id: "1",
    description: "Grocery Store",
    category: "Food & Dining",
    amount: -85.32,
    date: "2024-10-04",
    type: "expense"
  },
  {
    id: "2",
    description: "Salary Deposit",
    category: "Income",
    amount: 4115.00,
    date: "2024-10-01",
    type: "income"
  },
  {
    id: "3",
    description: "Gas Station",
    category: "Transportation",
    amount: -45.67,
    date: "2024-10-03",
    type: "expense"
  },
  {
    id: "4",
    description: "Netflix Subscription",
    category: "Entertainment",
    amount: -15.99,
    date: "2024-10-02",
    type: "expense"
  },
  {
    id: "5",
    description: "Freelance Work",
    category: "Income",
    amount: 750.00,
    date: "2024-10-02",
    type: "income"
  },
  {
    id: "6",
    description: "Coffee Shop",
    category: "Food & Dining",
    amount: -12.50,
    date: "2024-10-01",
    type: "expense"
  },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Math.abs(amount));
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your latest financial activity</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">
                  {transaction.description}
                </TableCell>
                <TableCell>
                  <Badge variant={transaction.type === "income" ? "default" : "secondary"}>
                    {transaction.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(transaction.date)}
                </TableCell>
                <TableCell className={`text-right font-medium ${
                  transaction.type === "income" ? "text-green-600" : "text-red-600"
                }`}>
                  {transaction.type === "income" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}