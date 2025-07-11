<!-- 
  Original plot: https://observablehq.com/@d3/bar-chart/2
  Blog post version: https://tonydang.blog/d3-svelte-bar-chart/
-->

<script>  
  	import * as d3 from "d3";
	import benford from "./benford_digit_freq.json";
	import observed_freq from "./data.json";
  	import BarChart from "./BarChart.svelte";
	let selectedCity = "Varanasi";
	// Extract city names from the keys of the data object
  	const cities = observed_freq.map(obj => Object.keys(obj)[0]).sort((a, b) => a.localeCompare(b));
	//Update chart data when city changes
	let cityData = {};
	let maxY = 0.4;
  	$: {
  cityData = observed_freq.find(obj => obj[selectedCity])?.[selectedCity] || {};
  const allFrequencies = Object.values(cityData)
    .flatMap(yearData => yearData?.digit_frequency || []);

  maxY = d3.max(allFrequencies, d => d.frequency) + 0.02 || 0;
}


</script>
<div id="main">
<div id="header">
	How to spot anomalies in AQI data?
	<br>
	An application of Benford's law
</div>

<div class=row>
	<div class=blob>
		<p>Often, there is a suspicion that air quality numbers are misreported due to:</p>
			<ul>
				<li>Technical reasons (monitoring instrument malfunctioning or operational error) </li>
				<li>Statistical reasons (selection bias of monitoring locations), or </li>
				<li>Political reasons (selection bias on data openness)</li>
			</ul>
			<p>AQI data with good statistical confidence is more useful for policy work.<br>
				In this story, we explore the use of Benford's law in spotting anomalies in AQI data.
			<br><br>
			<br><br>
			
		</p>
	</div>
	<div class="blob">
		<img 
			src="/data_issues_clippings.png"
			alt="News Clippings"
      style="width: 100%; height: auto; object-fit: cover;">
	</div>
</div>

<div class=row>
	<div class=blob>
		<p>Benford's law is also called as the "First Digit Law". According to Benford’s law, the first digits in any naturally occuring data, follow a pattern: the smaller digits have higher probability 
			of occurring than the larger digits. 
			<br><br>
			When observed pattern of leading digits deviates from Benford's law, it is considered as an indication of misreporting, even fraud in some cases.
			This deviation is quantified as Euclidean Distance (ED). When ED>0.25, we treat it as an anomaly.
			<br><br>
			Benford's law is applied to check mis-reporting of <a href="https://erl.scholasticahq.com/article/38783-testing-co-2-emissions-data-during-covid-19-pandemic-using-benford-s-law"> carbon emissions</a>
			and <a href="https://www.sciencedirect.com/science/article/abs/pii/S1352231015306336"> air quality in Beijing</a> previously.
		</p>  
	</div>
		<BarChart data={benford} ed={0} stroke_color="none" />
</div>

<!-- City Selector -->
<div class=row>
  <label for="city" style="margin-right: 10px;">Select City:</label>
  <select id="city" bind:value={selectedCity}>
    <option disabled selected value="">-- Choose a city --</option>
	{#each cities as city}
      <option value={city}>{city}</option>
    {/each}
  </select>
</div>

<div class=row>
	<BarChart
		data={cityData['2019']?.digit_frequency || []}
		maxy={maxY} ed={cityData['2019']?.ed}
		title={`2019 (~${cityData['2019']?.no_stations} stations)`}
		bar_color={cityData['2019']?.ed> 0.25 ? "tomato" : "RoyalBlue"} />
	<BarChart 
		data={cityData['2020']?.digit_frequency || []} 
		maxy={maxY} ed={cityData['2020']?.ed}
		title={`2020 (~${cityData['2020']?.no_stations} stations)`}
		bar_color={cityData['2020']?.ed> 0.25 ? "tomato" : "RoyalBlue"} />
</div>

<div class=row>
	<BarChart
		data={cityData['2021']?.digit_frequency || []}
		maxy={maxY} ed={cityData['2021']?.ed}
		title={`2021 (~${cityData['2021']?.no_stations} stations)`}
		bar_color={cityData['2021']?.ed> 0.25 ? "tomato" : "RoyalBlue"} />
	<BarChart 
		data={cityData['2022']?.digit_frequency || []} 
		maxy={maxY} ed={cityData['2022']?.ed}
		title={`2022 (~${cityData['2022']?.no_stations} stations)`}
		bar_color={cityData['2022']?.ed> 0.25 ? "tomato" : "RoyalBlue"} />
</div>

<div class=row>
	<BarChart
		data={cityData['2023']?.digit_frequency || []}
		maxy={maxY} ed={cityData['2023']?.ed}
		title={`2023 (~${cityData['2023']?.no_stations} stations)`}
		bar_color={cityData['2023']?.ed> 0.25 ? "tomato" : "RoyalBlue"} />
	<BarChart 
		data={cityData['2024']?.digit_frequency || []} 
		maxy={maxY} ed={cityData['2024']?.ed}
		title={`2024 (~${cityData['2024']?.no_stations} stations)`}
		bar_color={cityData['2024']?.ed> 0.25 ? "tomato" : "RoyalBlue"} />
</div>

<div class="row blob" style="width: 100%;">
	<p>Deviation from Benford’s law is only an indicator and not a foolproof law. Statistical tests can be applied to investigate deviations from Benford's law.
		<br> More details of these tests <a href="https://urbanemissions.info/wp-content/uploads/docs/SIM-49-2024.pdf"> are available in this report.</a></p>
</div>

<div id="footer">
	<p> <a href="https://urbanemissions.info/">© 2025 Urban Emissions Info LLP</a></p>
        <p>Say hello!
            <a href="mailto:saikrishnadammalapati@gmail.com"> <i class="fa fa-envelope"></i> Email</a>  
            <a href="https://www.linkedin.com/in/saikrishnadammalapati/"> <img src="https://d-saikrishna.github.io/assets/linkedin.png">  LinkedIn</a> 
            <a href="https://github.com/urbanemissionsinfo" target="_blank"> <img src="https://d-saikrishna.github.io/assets/github.png"> GitHub</a>
        </p>
</div>

</div>
<style>
	#main{
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		font-size: 1.5rem;

	}
	#main a{
		color: royalblue;
	}
	
	#header{
		text-align: center;
		padding: 10px;
		background-color: tomato;
		fill-opacity: 0;
		color:white;
		font-weight:bold;
		font-size:2rem;
		margin: 3px;
	}
	.row {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: center;
		margin: 2px;
		align-items: center;
	}
	.blob {
		width: 50%;
		flex-shrink: 0; /* Prevent collapsing */
		align-content: center;
	}
	.blob p, .blob ul{
		margin:20px;
	}

	select {
		font-size: 1.1rem;
		padding: 8px 12px;
		width: 250px;
		height: 45px;
	}
	#footer{
		background-color: royalblue;
	}

	#footer a, #footer p{
		color: white;
		padding-right: 10px;
		text-align: center;
    	font-size: 0.9em;

	}
	@media (max-width: 1000px) {
		.row {
		flex-direction: column;
		width: 100%;
		justify-content: center;
		align-items: center;
		margin: 10px;
	}
	.blob {
		width: 100%;
		flex-shrink: 0; /* Prevent collapsing */
		align-content: center;
	}
	
	}

</style>