import { Star } from "lucide-react";
import {
	Card,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { type Restaurant } from "@/lib/mock-restaurants";

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
	return (
		<Card size="sm" className="; hover: cursor-pointer">
			<CardHeader>
				<CardTitle>{restaurant.name}</CardTitle>
				<CardDescription>{restaurant.address}</CardDescription>
				<CardAction>
					<div className="flex flex-col items-end gap-1">
						<span className="text-xs font-semibold text-sea-ink">
							{restaurant.distance} mi
						</span>
						<div className="flex items-center gap-0.5">
							<Star className="size-3 fill-warning stroke-none" />
							<span className="text-xs text-sea-ink-soft">
								{restaurant.rating}
							</span>
						</div>
					</div>
				</CardAction>
			</CardHeader>
		</Card>
	);
}
