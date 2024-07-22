import { Metadata } from 'next';

import { Badge } from '@/components/shad-ui/badge';
import { Button } from '@/components/shad-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shad-ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shad-ui/dropdown-menu';
import { Progress } from '@/components/shad-ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shad-ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shad-ui/tabs';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { UserNav } from '@/components/ui/user-nav';
import { auth } from '@/lib/auth';
import { ListFilter } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'LiftLens Dashboard',
};

export default async function DashboardPage() {
  const session = await auth();
  return (
    <main>
      <div className="flex-col flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <h2 className="text-3xl font-bold tracking-tight">LiftLens</h2>
            <div className="ml-auto flex items-center space-x-4">
              <ModeToggle />
              <UserNav session={session!} />
            </div>
          </div>
        </div>
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 p-6">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                <CardTitle>Upcoming Workouts</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  Create and manage your upcoming workouts below.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button>Create New Workout</Button>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardDescription>This Week</CardDescription>
                <CardTitle className="text-4xl">4 workouts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  You got this!
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={25} aria-label="1 of 4 workouts completed" />
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-2">
              <CardHeader className="pb-2">
                <CardDescription>This Month</CardDescription>
                <CardTitle className="text-4xl">16 workouts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">Lock in!</div>
              </CardContent>
              <CardFooter>
                <Progress value={50} aria-label="8 of 16 workouts completed" />
              </CardFooter>
            </Card>
          </div>
          <Tabs defaultValue="week">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 gap-1 text-sm"
                    >
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Upcoming
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Completed
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Skipped</DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <TabsContent value="week">
              <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="px-7">
                  <CardTitle>Workouts</CardTitle>
                  <CardDescription>Workouts for the week</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Estimated Time
                        </TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Status
                        </TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Chest / Arms</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            Bulking
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          35 - 45 mins
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge className="text-xs" variant="outline">
                            Upcoming
                          </Badge>
                        </TableCell>
                        <TableCell>07/22/2024</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Legs / Core</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            Bulking
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          35 - 45 mins
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge className="text-xs" variant="outline">
                            Upcoming
                          </Badge>
                        </TableCell>
                        <TableCell>07/24/2024</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Chest / Arms</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            Bulking
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          35 - 45 mins
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge className="text-xs" variant="outline">
                            Upcoming
                          </Badge>
                        </TableCell>
                        <TableCell>07/26/2024</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Legs / Back</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            Bulking
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          35 - 45 mins
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge className="text-xs" variant="outline">
                            Upcoming
                          </Badge>
                        </TableCell>
                        <TableCell>07/28/2024</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
