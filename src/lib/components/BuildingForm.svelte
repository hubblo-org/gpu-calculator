<script lang="ts">
</script>

<form aria-label="Building characteristics form">
	<div class="row-input">
		<label for="building-lifespan">Building lifespan, in years</label>
		<input type="number" id="building-lifespan" required />
	</div>
	<div class="row-input">
		<label for="building-total-surface">Building total surface, in square meters</label>
		<input type="number" id="building-total-surface" required />
	</div>
	<div class="row-input">
		<label for="building-technical-rooms-surface"
			>Technical rooms surface area, in square meters</label
		>
		<input type="number" id="building-technical-rooms-surface" required />
	</div>
	<div class="row-input">
		<label for="building-maximum-usable-electrical-power"
			>Maximum usable electrical power, in kilowatts</label
		>

		<input type="number" id="building-maximum-usable-electrical-power" required />
	</div>
	<div class="row-input">
		<label for="building-yearly-total-energy"> Total energy for one year, in kilowatts </label>
		<input type="number" id="building-yearly-total-energy" required />
	</div>
	<div class="row-input">
		<label for="building-load-factor"> Load factor </label>
		<input type="number" id="building-load-factor" required />
	</div>
	<div class="row-input">
		<label for="building-power-usage-effectiveness"> Power Usage Effectiveness (PUE) </label>
		<input
			type="number"
			id="building-power-usage-effectiveness"
			min="1"
			max="2"
			step="0.01"
			required
		/>
	</div>
	<div class="row-input">
		<label for="building-water-usage-effectiveness"> Water Usage Effectiveness (WUE) </label>
		<input
			type="number"
			id="building-water-usage-effectiveness"
			min="0"
			max="3"
			step="0.01"
			required
		/>
	</div>
	<div class="row-input">
		<label for="building-energy-reuse-factor"> Energy Reuse Factor (ERF) </label>
		<input type="number" id="building-energy-reuse-factor" min="0" max="3" step="0.01" required />
	</div>
	<div class="row-input">
		<label for="building-renewable-energy-factor"> Renewable Energy Factor (REF) </label>
		<input
			type="number"
			id="building-renewable-energy-factor"
			min="0"
			max="3"
			step="0.01"
			required
		/>
	</div>
	<div class="row-input">
		<label for="building-electrical-technical-resilience">
			Electrical Technical Resilience tier
		</label>
		<select id="building-electrical-technical-resilience"></select>
	</div>
	<div class="row-input">
		<label for="building-cooling-system"> Cooling system type </label>
		<select id="building-cooling-system"></select>
	</div>
	<div class="row-input">
		<label for="building-location"> Location </label>
		<input type="text" id="building-location" required />
	</div>
	<div class="row-input">
		<label for="building-study-duration"> Study duration, in days </label>
		<input type="number" id="building-study-duration" required />
	</div>
	<div class="row-input">
		<label for="building-concrete-volume"> Concrete volume, in cubic meters </label>
		<input type="number" id="building-concrete-volume" required />
	</div>
	<div class="row-input">
		<label for="building-steel-mass"> Steel mass, in kilograms </label>
		<input type="number" id="building-steel-mass" required />
	</div>
	<div class="row-input">
		<label for="building-designed-floor-assembly-surface">
			Designed floor assembly surface, in square meters
		</label>
		<input type="number" id="building-designed-floor-assembly-surface" required />
	</div>
	<div class="row-input">
		<label for="building-suspended-ceiling-surface">
			Suspended ceiling surface, in square meters
		</label>
		<input type="number" id="building-suspended-ceiling-surface" required />
	</div>
	<div class="row-input">
		<label for="building-lifts"> Number of lifts </label>
		<input type="number" id="building-lifts" required />
	</div>
	<div class="row-input">
		<label for="building-freight-lifts"> Number of freight lifts </label>
		<input type="number" id="building-freight-lifts" required />
	</div>
	<div class="row-input">
		<label for="building-partition-surface"> Partition surface, in square meters </label>
		<input type="number" id="building-partition-surface" required />
	</div>
</form>

<style>
	form {
		border: 2px black solid;
	}
</style>
