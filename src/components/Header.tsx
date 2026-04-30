import { Link } from "@tanstack/react-router";

export function Header() {
	return (
		<header className="sticky top-0 z-50 border-b border-(--line) bg-(--header-bg) px-4 backdrop-blur-lg">
			<nav className="page-wrap flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4">
				<div className="order-3 flex w-full flex-wrap items-center gap-x-4 gap-y-1 pb-1 text-sm font-semibold sm:order-2 sm:w-auto sm:flex-nowrap sm:pb-0">
					<Link
						to="/"
						className="nav-link"
						activeProps={{ className: "nav-link is-active" }}
					>
						Home
					</Link>
					<details className="relative w-full sm:w-auto">
						<summary className="nav-link list-none cursor-pointer">
							Demos
						</summary>
						<div className="mt-2 min-w-56 rounded-xl border border-(--line) bg-(--header-bg) p-2 shadow-lg sm:absolute sm:right-0">
							<a
								href="/demo/tanstack-query"
								className="block rounded-lg px-3 py-2 text-sm text-sea-ink-soft no-underline transition hover:bg-(--link-bg-hover) hover:text-sea-ink"
							>
								TanStack Query
							</a>
							<a
								href="/demo/form/simple"
								className="block rounded-lg px-3 py-2 text-sm text-sea-ink-soft no-underline transition hover:bg-(--link-bg-hover) hover:text-sea-ink"
							>
								Simple Form
							</a>
							<a
								href="/demo/form/address"
								className="block rounded-lg px-3 py-2 text-sm text-sea-ink-soft no-underline transition hover:bg-(--link-bg-hover) hover:text-sea-ink"
							>
								Address Form
							</a>
						</div>
					</details>
				</div>
			</nav>
		</header>
	);
}
