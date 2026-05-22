import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

export function PlaceAutocompleteInput({
	onPlaceSelect,
}: {
	onPlaceSelect: (place: google.maps.places.Place) => void;
}) {
	const [inputValue, setInputValue] = useState("");
	const [suggestions, setSuggestions] = useState<
		google.maps.places.AutocompleteSuggestion[]
	>([]);
	const [sessionToken, setSessionToken] =
		useState<google.maps.places.AutocompleteSessionToken | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const places = useMapsLibrary("places");

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (!containerRef.current?.contains(e.target as Node)) {
				setSuggestions([]);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	async function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;
		setInputValue(value);

		if (!places || !value.trim()) {
			setSuggestions([]);
			return;
		}

		let token = sessionToken;
		if (!token) {
			token = new places.AutocompleteSessionToken();
			setSessionToken(token);
		}

		try {
			const response =
				await places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
					input: value,
					sessionToken: token,
				});
			setSuggestions(response.suggestions);
		} catch {
			setSuggestions([]);
		}
	}

	async function handleSelect(
		suggestion: google.maps.places.AutocompleteSuggestion,
	) {
		if (!suggestion.placePrediction) return;
		const place = suggestion.placePrediction.toPlace();
		await place.fetchFields({
			fields: ["location", "displayName", "formattedAddress"],
		});
		setInputValue(place.formattedAddress ?? place.displayName ?? "");
		setSuggestions([]);
		setSessionToken(null);
		onPlaceSelect(place);
	}

	return (
		<div ref={containerRef} className="relative flex-1">
			<InputGroup>
				<InputGroupAddon>
					<MapPin />
				</InputGroupAddon>
				<InputGroupInput
					value={inputValue}
					onChange={handleInputChange}
					placeholder="Enter a location..."
					autoComplete="off"
				/>
			</InputGroup>
			{suggestions.length > 0 && (
				<div className="absolute left-0 right-0 top-full mt-1 rounded-xl border border-border bg-white shadow-md p-1 flex flex-col">
					{suggestions.map((s) => (
						<button
							key={s.placePrediction?.placeId}
							type="button"
							onClick={() => handleSelect(s)}
							className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-sea-ink transition-colors hover:bg-sand"
						>
							<MapPin className="size-3.5 shrink-0 text-sea-ink-soft" />
							{s.placePrediction?.text.toString()}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
