Build a modern web application called SubTrack — a subscription management platform that helps users track recurring subscriptions, understand their spending, and avoid unexpected renewals.

The goal is to create a polished MVP focused on subscription visibility and spending awareness. The product should feel like something Apple would build: clean, minimal, elegant, fast, and intuitive.

Project Overview

Users can manually add subscriptions such as:

Netflix
Amazon Prime
Spotify
ChatGPT Plus
Claude Pro
Canva Pro
Adobe Creative Cloud
YouTube Premium
Any recurring service

The application should help users:

Track all subscriptions in one place
See upcoming renewals
Understand monthly and yearly spending
View spending by category
Receive renewal reminders
Manage subscriptions through a clean dashboard

This is an MVP (Phase 1 only).

No banking integrations, AI recommendations, or automatic subscription detection yet.

Technical Requirements
Framework

Use:

Next.js (App Router)
React
TypeScript
Tailwind CSS
shadcn/ui components
Lucide React icons

State Management:

React Context or Zustand

Database:

SQLite with Prisma (local development)
Design architecture so PostgreSQL can easily replace SQLite later

Authentication:

None for MVP
Single-user local experience
Design Requirements

The UI should resemble Apple's design philosophy:

Inspiration
Apple Notes
Apple Music
Apple Calendar
Apple Wallet
Apple Settings
Characteristics
Extremely clean
Minimal clutter
Large whitespace
Soft shadows
Rounded corners
Elegant typography
Smooth animations
Subtle gradients
Premium feeling
Mobile-first responsive

Avoid:

Dashboard overload
Enterprise software appearance
Bootstrap-style interfaces
Bright flashy colors

Use:

Neutral palette
Light mode by default
Optional dark mode toggle
System fonts preferred
Core Pages
1. Dashboard

Main landing page.

Display:

Summary Cards

Monthly Spending

Example:

$84.99/month

Yearly Spending

Example:

$1,019.88/year

Active Subscriptions

Example:

12 subscriptions

Next Renewal

Example:

Netflix renews in 3 days

Spending Chart

Display spending by category:

Entertainment
Productivity
AI
Fitness
Education
Utilities
Other

Use a modern donut chart.

Upcoming Renewals

List next 5 renewals.

Example:

Netflix — Jun 18

Spotify — Jun 20

Claude Pro — Jun 25

2. Subscriptions Page

Display all subscriptions.

Each subscription should appear as a premium card.

Card includes:

Service name
Logo placeholder
Category
Monthly cost
Renewal date
Billing frequency

Example:

Netflix

Entertainment

$22.99/month

Renews June 18

Features:

Search

Search subscriptions by name.

Filtering

Filter by:

Category
Monthly / Annual billing
Active / Cancelled
Sorting

Sort by:

Cost
Name
Renewal date
3. Add Subscription

Create a dedicated modal or page.

Fields:

Service Name

Category

Options:

Entertainment
Productivity
AI
Education
Fitness
Utilities
Other

Cost

Billing Frequency

Options:

Monthly
Yearly

Renewal Date

Optional Notes

Submit Button

4. Subscription Details Page

When user clicks a subscription.

Display:

Service Name

Category

Cost

Billing Frequency

Renewal Date

Created Date

Notes

Actions:

Edit
Delete
5. Calendar View

Monthly calendar showing renewal dates.

Example:

June 18
Netflix

June 25
Claude Pro

July 2
Canva Pro

Clicking an event opens subscription details.

Data Model

Subscription

{
  id: string;
  name: string;
  category: string;
  cost: number;
  billingFrequency: "monthly" | "yearly";
  renewalDate: Date;
  notes?: string;
  createdAt: Date;
}
MVP Features

Implement:

✅ Add subscription

✅ Edit subscription

✅ Delete subscription

✅ Dashboard analytics

✅ Upcoming renewals

✅ Search subscriptions

✅ Filter subscriptions

✅ Calendar view

✅ Monthly spending calculation

✅ Yearly spending calculation

✅ Responsive design

✅ Light/Dark mode

UX Expectations

The experience should feel effortless.

Examples:

One-click navigation
Smooth page transitions
Elegant hover states
Skeleton loading states
Empty state illustrations
Confirmation dialog before deletion

When a user first opens the app and has no subscriptions, show a beautiful empty state encouraging them to add their first subscription.

Folder Structure

Create a scalable production-ready architecture.

Example:

src/
├── app/
├── components/
│   ├── dashboard/
│   ├── subscriptions/
│   ├── calendar/
│   └── shared/
├── lib/
├── hooks/
├── prisma/
├── types/
└── services/
Deliverables

Build a fully functional MVP with:

Complete Next.js project structure
Prisma schema
Database setup
Responsive UI
CRUD operations
Dashboard analytics
Calendar view
Clean reusable component architecture
Apple-inspired design system
Clear code comments where necessary

Focus heavily on design quality, UX polish, and maintainable code architecture. The final product should feel premium, modern, and launch-ready rather than like a typical CRUD tutorial application.