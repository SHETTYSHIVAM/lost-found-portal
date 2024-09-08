import React from "react";
import { PieChart, Pie, Tooltip } from "recharts";

const PieC = () => {
	// Sample data with colors
	const data = [
		{ name: "Items Lost", no: 400, fill: "#8884d8" },
		{ name: "Items Found", no: 700, fill: "#82ca9d" },
		{ name: "Items Returned back", no: 200, fill: "#ffc658" },
		{ name: "Items Got Back", no: 1000, fill: "#ff8042" },
	];

	return (
		<div
			style={{
				textAlign: "center",
				margin: "auto 10%",
			}}
		>
			<h1 className="text-gray-900">
				GeeksforGeeks
			</h1>
			<h3 className="text-gray-400">
				React JS example for donut chart using
				Recharts
			</h3>
			<PieChart width={700} height={700}>
				<Tooltip />
				<Pie
					data={data}
					dataKey="students"
					outerRadius={250}
					innerRadius={150}
					label={({ name, no }) =>
						`${name}: ${no}`
					}
				/>
			</PieChart>
		</div>
	);
};

export default PieC;
