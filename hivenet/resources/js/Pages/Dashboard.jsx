import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";

// shadcn/ui bits
import { Button } from "@/Components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/card";
import { Input } from "@/Components/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/sheet";

// icons (Settings removed)
import {
  Menu,
  CalendarDays,
  Star,
  Users,
  User,
  LogOut,
  Search,
} from "lucide-react";

export default function Dashboard() {
  const page = usePage();

  // Sidebar config (Settings entry removed)
  const nav = [
    { label: "My Events", href: "/events", icon: CalendarDays },
    { label: "Favourites", href: "/favorites", icon: Star },
    { label: "My Clubs", href: "/my-clubs", icon: Users },
    { divider: true },
    {
      label: "Profile",
      href: typeof route === "function" ? route("profile.edit") : "/profile",
      icon: User,
    },
  ];

  // Simple active matcher based on the current URL path
  const isActive = (href) => {
    try {
      const path =
        href?.startsWith("http") || href?.startsWith("/")
          ? new URL(href, window.location.origin).pathname
          : href;
      return page.url === path || page.url.startsWith(path + "/");
    } catch {
      return false;
    }
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-white">Dashboard</h2>

          {/* Search (desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search events, clubs…"
                className="pl-8 w-64 bg-white/90"
              />
            </div>
          </div>

          {/* Mobile nav trigger */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" className="bg-white/90">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetHeader className="px-6 py-4">
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <MobileNav nav={nav} isActive={isActive} />
              <div className="px-6 py-4">
                <LogoutButton />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      }
    >
      <Head title="Dashboard" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
          {/* Sidebar (desktop) */}
          <aside className="hidden md:block">
            <Sidebar nav={nav} isActive={isActive} />
            <div className="mt-4">
              <LogoutButton />
            </div>
          </aside>

          {/* Main content */}
          <section className="min-w-0">
            {/* Overview cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <StatCard title="Upcoming Events" value="4" subtitle="this month" />
              <StatCard title="Favourites" value="12" subtitle="saved items" />
              <StatCard title="My Clubs" value="3" subtitle="active memberships" />
            </div>

            {/* Content rows */}
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              {/* Upcoming Events */}
              <Card className="lg:col-span-2 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="text-gray-600">
                          <th className="py-2 pr-3">Title</th>
                          <th className="py-2 pr-3">Date</th>
                          <th className="py-2 pr-3">Location</th>
                          <th className="py-2 pr-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200/80">
                        {[
                          {
                            title: "CSE JS Sprint: React Hooks",
                            date: "Sep 28, 11:30 AM",
                            where: "Lab 3, CSE",
                            status: "Registered",
                          },
                          {
                            title: "Inter-Dept Debate League — R2",
                            date: "Oct 2, 4:00 PM",
                            where: "Seminar Room 2",
                            status: "Interested",
                          },
                          {
                            title: "Freshers' Welcome & Club Fair",
                            date: "Oct 10, 3:00 PM",
                            where: "Main Auditorium",
                            status: "Going",
                          },
                          {
                            title: "Hack Night: Open Source",
                            date: "Oct 18, 8:00 PM",
                            where: "CSE Lounge",
                            status: "Waitlist",
                          },
                        ].map((e, i) => (
                          <tr key={i} className="hover:bg-gray-50/80">
                            <td className="py-2 pr-3 font-medium text-gray-900">
                              {e.title}
                            </td>
                            <td className="py-2 pr-3 text-gray-700">{e.date}</td>
                            <td className="py-2 pr-3 text-gray-700">{e.where}</td>
                            <td className="py-2 pr-3">
                              <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                                {e.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full">
                    <Link href="/events">Browse Events</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/my-clubs">Manage My Clubs</Link>
                  </Button>
                  <Button asChild variant="ghost" className="w-full">
                    <Link href="/favorites">View Favourites</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

/* ---------------- Sidebar ---------------- */

function Sidebar({ nav, isActive }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/90 p-3 backdrop-blur-sm">
      <nav className="flex flex-col gap-1">
        {nav.map((item, idx) =>
          item.divider ? (
            <div
              key={`div-${idx}`}
              className="my-2 border-t border-gray-200"
              aria-hidden
            />
          ) : (
            <NavItem key={item.label} {...item} active={isActive(item.href)} />
          ),
        )}
      </nav>
    </div>
  );
}

function MobileNav({ nav, isActive }) {
  return (
    <div className="pb-4">
      <nav className="flex flex-col gap-1">
        {nav.map((item, idx) =>
          item.divider ? (
            <div
              key={`div-${idx}`}
              className="my-2 border-t border-gray-200"
              aria-hidden
            />
          ) : (
            <NavItem key={item.label} {...item} active={isActive(item.href)} />
          ),
        )}
      </nav>
    </div>
  );
}

function NavItem({ label, href, icon: Icon, active = false }) {
  const base =
    "group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition";
  const state = active
    ? "bg-gray-900 text-white shadow-sm"
    : "text-gray-700 hover:bg-gray-100";
  return (
    <Link href={href} className={`${base} ${state}`}>
      <Icon className="h-4 w-4 opacity-90" />
      <span className="font-medium">{label}</span>
    </Link>
  );
}

function LogoutButton() {
  return (
    <Link
      href={typeof route === "function" ? route("logout") : "/logout"}
      method="post"
      as="button"
      className="mt-1 w-full rounded-md px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 transition"
    >
      <span className="inline-flex items-center gap-3">
        <LogOut className="h-4 w-4" />
        Log Out
      </span>
    </Link>
  );
}

/* ---------------- Small stat card ---------------- */

function StatCard({ title, value, subtitle }) {
  return (
    <Card className="bg-white/90 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-gray-600">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
