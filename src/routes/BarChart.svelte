<script>
  import * as d3 from "d3";
  import benford from "./benford_digit_freq.json";


  // Receive plot data as prop.
  export let data;
  export let maxy = 0.32;
  export let ed=0;
  $: label = ed === "NaN"
  ? "Not enough data to compute ED"
  : +ed > 0.25
    ? "Deviation from Benford's Law"
    : "No Deviation from Benford's Law";

  export let title = "Benford's law"; // ✅ Title prop


  // The chart dimensions and margins as optional props.
  export let width = 928;
  export let height = 500;
  export let marginTop = 40;
  export let marginRight = 0;
  export let marginBottom = 60;
  export let marginLeft = 40;
	export let stroke_color = 'black';
	export let bar_color = 'RoyalBlue';


  // Create the x (horizontal position) scale.
  const xScale = d3
    .scaleBand()
    .domain([1, 2, 3, 4, 5, 6, 7, 8, 9])
    .range([marginLeft, width - marginRight])
    .padding(0.1);

  // Create the y (vertical position) scale.
  $: yScale = d3
    .scaleLinear()
    .domain([0, maxy])
    .range([height - marginBottom, marginTop]);
</script>
<svg
  viewBox="0 0 {width} {height}"
  style:max-width="100%"
  style:height="auto"
>
<text fill="black"
			  text-anchor="middle"
			  font-size="34"
        font-weight="bold"
			  x={width/2}
			  y={50}>
  {title}
</text>

  <!-- Add a rect for each bar. -->
  <g fill={bar_color}>
    {#each data as d}
      <rect
        x={xScale(d.digit)}
        y={yScale(d.frequency)}
        height={yScale(0) - yScale(d.frequency)}
        width={xScale.bandwidth()}
      />
			<text
				fill="black"
			  text-anchor="middle"
			  font-size="18"
				font-weight="bold"
			  x={xScale(d.digit) + xScale.bandwidth() / 2}
			  y={yScale(d.frequency) - 4}
			>
			  {Math.floor(d.frequency * 1000) / 10}%
		</text>
		{/each}
  </g>
	<!-- Line connecting frequency values -->
<path
  fill="none"
  stroke={stroke_color}
  stroke-width="2"
  d={
    d3
      .line()
      .x(d => xScale(d.digit) + xScale.bandwidth() / 2)
      .y(d => yScale(d.frequency))
      (benford)
  }
/>

<!-- Square markers on the line -->
<g fill={stroke_color}>
  {#each benford as d}
    <rect
      x={xScale(d.digit) + xScale.bandwidth() / 2 - 4}
      y={yScale(d.frequency) - 4}
      width={8}
      height={8}
    />
  {/each}
</g>
<!-- ED Text -->
<text
				fill={stroke_color}
			  text-anchor="middle"
			  font-size="24"
			  x={xScale.bandwidth()*6}
			  y={100}
			> ED: {ed}			  
</text>
<text
				fill={stroke_color}
			  text-anchor="middle"
			  font-size="24"
			  x={xScale.bandwidth()*6}
			  y={125}
			> {label}	  
</text>

  <!-- X-Axis -->
  <g transform="translate(0,{height - marginBottom})">
    <line stroke="currentColor" x1={marginLeft - 6} x2={width} />

    {#each data as d}
      <!-- X-Axis Ticks -->
      <line
        stroke="currentColor"
        x1={xScale(d.digit) + xScale.bandwidth() / 2}
        x2={xScale(d.digit) + xScale.bandwidth() / 2}
        y1={0}
        y2={6}
      />

      <!-- X-Axis Tick Labels -->
      <text
        fill="currentColor"
        text-anchor="middle"
        x={xScale(d.digit) + xScale.bandwidth() / 2}
        y={27}
      >
        {d.digit}
      </text>
    {/each}

    <!-- X-Axis Label -->
    <text fill="currentColor" x={width / 2} y={50}>Leading digit</text>
  </g>

  <!-- Y-Axis -->
  <g transform="translate({marginLeft},0)">
    {#each yScale.ticks() as tick}
      <!-- 
        Y-Axis Ticks. 
        Note: First tick is skipped since the x-axis already acts as a tick. 
      -->
      {#if tick !== 0}
        <line
          stroke="currentColor"
          x1={0}
          x2={-6}
          y1={yScale(tick)}
          y2={yScale(tick)}
        />
      {/if}

      <!-- Y-Axis Tick Labels -->
      <text
        fill="currentColor"
        text-anchor="end"
        dominant-baseline="middle"
        x={-9}
        y={yScale(tick)}
      >
        {Math.trunc(tick * 100)}
      </text>
    {/each}

    <!-- Y-Axis Label -->
    <text fill="currentColor" text-anchor="start" x={-marginLeft} y={25}>
      ↑ frequency (%)
    </text>
  </g>
	<!-- Legend in top-right corner -->
	<g transform={`translate(${width - marginRight - 160}, ${marginTop - 20})`}>
	  <!-- Square marker for the line -->
	  <rect width="24" height="24" fill={stroke_color} />
		<line stroke={stroke_color} stroke-width="2" x1="-15" y1="12" x2="40" y2="12" />
	
	  <!-- Label text -->
	  <text x="40" y="20" fill={stroke_color} font-size="20">
	    Benford's law
	  </text>
	</g>
</svg>