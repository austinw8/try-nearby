import { createFileRoute } from "@tanstack/react-router";
import {
	AdvancedMarker,
	APIProvider,
	Map as GoogleMap,
} from "@vis.gl/react-google-maps";
import { Search, Utensils } from "lucide-react";
import { useState } from "react";
import { PlaceAutocompleteInput } from "#/components/place-auto-complete-input";
import { RadiusCircle } from "#/components/radius-circle";
import { RestaurantCard } from "#/components/restaurant-card";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { MOCK_RESTAURANTS, type Restaurant } from "@/lib/mock-restaurants";

const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

export const Route = createFileRoute("/")({ component: App });

function App() {
	const [selectedPlace, setSelectedPlace] =
		useState<google.maps.places.Place | null>(null);
	const [radius, setRadius] = useState("5");
	const [hasSearched, setHasSearched] = useState(false);

	const center =
		selectedPlace?.location != null
			? {
					lat: selectedPlace.location.lat(),
					lng: selectedPlace.location.lng(),
				}
			: null;

	const displayName =
		selectedPlace?.formattedAddress ?? selectedPlace?.displayName ?? "";

	const filtered = MOCK_RESTAURANTS.filter((r) => r.distance <= Number(radius));
	const byCategory = filtered.reduce<Record<string, Restaurant[]>>((acc, r) => {
		if (!acc[r.category]) acc[r.category] = [];
		acc[r.category].push(r);
		return acc;
	}, {});

	function handleSearch(e: React.FormEvent) {
		e.preventDefault();
		if (selectedPlace) setHasSearched(true);
	}

	return (
		<APIProvider apiKey={MAPS_API_KEY}>
			<main className="page-wrap px-4 py-8">
				<div className="mb-6">
					<h1 className="display-title text-4xl font-bold text-sea-ink mb-1">
						Try Nearby
					</h1>
					<p className="text-sm text-sea-ink-soft">
						Your stay-cation guide. Discover new restaurants around you!
					</p>
				</div>

				<form
					onSubmit={handleSearch}
					className="island-shell relative z-10 rounded-2xl p-4 sm:p-5 mb-6 [backdrop-filter:none]"
				>
					<div className="flex flex-col sm:flex-row gap-3">
						<PlaceAutocompleteInput onPlaceSelect={setSelectedPlace} />
						<p>Search radius (miles):</p>
						<InputGroup className="w-full sm:w-44">
							<InputGroupInput
								type="number"
								min="1"
								max="50"
								value={radius}
								onChange={(e) => setRadius(e.target.value)}
							/>
						</InputGroup>
						<Button
							type="submit"
							className="shrink-0"
							disabled={selectedPlace == null}
						>
							<Search data-icon="inline-start" />
							Search
						</Button>
					</div>
				</form>

				{hasSearched && center != null ? (
					<div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-5 items-start">
						<div className="island-shell rounded-2xl overflow-hidden h-64 lg:h-130 lg:sticky lg:top-20">
							<GoogleMap
								center={center}
								defaultZoom={12}
								mapId="DEMO_MAP_ID"
								disableDefaultUI
								gestureHandling="greedy"
								className="h-full w-full"
							>
								<AdvancedMarker position={center} />
								<RadiusCircle
									lat={center.lat}
									lng={center.lng}
									radiusMiles={Number(radius)}
								/>
							</GoogleMap>
						</div>
						<div>
							<p className="text-sm text-sea-ink-soft mb-4">
								{filtered.length} restaurants within {radius} miles
								{displayName && ` of ${displayName}`}
							</p>
							{filtered.length === 0 ? (
								<div className="island-shell rounded-2xl p-10 flex flex-col items-center justify-center gap-2">
									<p className="text-sm text-sea-ink-soft">
										No restaurants found in this area
									</p>
								</div>
							) : (
								<div className="flex flex-col gap-5">
									{Object.entries(byCategory).map(([category, restaurants]) => (
										<section key={category}>
											<div className="flex items-center gap-2 mb-3">
												<h2 className="text-sm font-semibold text-sea-ink shrink-0">
													{category}
												</h2>
												<p className="text-xs">
													{restaurants.length} restaurant
													{restaurants.length > 1 ? "s" : ""}
												</p>
											</div>
											<div className="flex flex-col gap-2">
												{[...restaurants]
													.sort((a, b) => a.distance - b.distance)
													.map((r) => (
														<RestaurantCard key={r.id} restaurant={r} />
													))}
											</div>
										</section>
									))}
								</div>
							)}
						</div>
					</div>
				) : (
					<div className="island-shell rounded-2xl p-16 flex flex-col items-center justify-center gap-3">
						<Utensils className="size-10 text-sea-ink-soft opacity-30" />
						<p className="text-sea-ink-soft text-sm text-center">
							Enter a location and radius above to find nearby restaurants
						</p>
					</div>
				)}
			</main>
		</APIProvider>
	);
}
