import React, { useState } from "react";
import "./ShortestPath.scss";
import maps from "../../assets/TanPhu.png";
const graph = {
	A: { B: 5.4, C: 9.4 },
	B: { A: 5.4, C: 7.6, D: 6.3 },
	C: { A: 9.4, B: 7.6, D: 6, E: 5.1 },
	D: { B: 6.3, C: 6, E: 6.7, F: 5.7 },
	E: { C: 5.1, D: 6.7, F: 4.8, H: 7.2 },
	F: { D: 5.7, E: 4.8, G: 3, H: 6.8 },
	G: { F: 3, H: 5.6, J: 5 },
	H: { E: 7.2, F: 6.8, G: 5.6, J: 6.6, I: 3, K: 9 },
	J: { G: 5, H: 6.6, K: 4.2 },
	I: { H: 3 },
	K: { H: 9, J: 4.2 },
};

const nodeNames = {
	A: "Tây Thạnh",
	B: "Sơn Kỳ",
	C: "Tân Sơn Nhì",
	D: "Tân Quý",
	E: "Tân Thành",
	F: "Thọ Hòa",
	G: "Phú Thạnh",
	H: "Hòa Thạnh",
	I: "Phú Trung",
	J: "Hiệp Tân",
	K: "Tân Thới Hòa",
};

const Dijkstra = (graph, startNode, endNode) => {
	const distances = {};
	const path = {};
	const visited = {};
	const queue = Object.keys(graph);

	queue.forEach((node) => {
		distances[node] = Infinity;
		visited[node] = false;
		path[node] = [];
	});

	distances[startNode] = 0;

	while (queue.length > 0) {
		let minDistanceNode = null;

		queue.forEach((node) => {
			if (
				minDistanceNode === null ||
				distances[node] < distances[minDistanceNode]
			) {
				if (!visited[node]) {
					minDistanceNode = node;
				}
			}
		});

		if (minDistanceNode === null) break;

		visited[minDistanceNode] = true;
		queue.splice(queue.indexOf(minDistanceNode), 1);

		for (const neighbor in graph[minDistanceNode]) {
			const edgeWeight = graph[minDistanceNode][neighbor];
			const totalDistance = distances[minDistanceNode] + edgeWeight;

			if (totalDistance < distances[neighbor]) {
				distances[neighbor] = totalDistance;
				path[neighbor] = [
					...path[minDistanceNode],
					{ node: minDistanceNode, weight: edgeWeight },
				];
			}
		}
	}

	const shortestPath = path[endNode];
	const totalDistance = shortestPath.reduce(
		(acc, step) => acc + step.weight,
		0,
	);

	return { shortestPath, totalDistance };
};

const ShortestPathDetails = () => {
	const [startNode, setStartNode] = useState("A");
	const [endNode, setEndNode] = useState("D");
	const [pathDetails, setPathDetails] = useState([]);
	const [totalPathDistance, setTotalPathDistance] = useState(0);

	const findShortestPathDetails = () => {
		const { shortestPath, totalDistance } = Dijkstra(graph, startNode, endNode);
		setPathDetails(shortestPath);
		setTotalPathDistance(totalDistance);
	};

	return (
		<div id="shortest-path" data-aos="fade-up" data-aos-duration="1500">
			<div className="shortest-path-details">
				<h1>Shortest Path Details</h1>
				<label htmlFor="startNode">
					<b>Xuất phát:</b>
				</label>
				<select
					id="startNode"
					onChange={(e) => setStartNode(e.target.value)}
					value={startNode}>
					{Object.keys(graph).map((node) => (
						<option key={node} value={node}>
							{nodeNames[node]}
						</option>
					))}
				</select>
				<br />
				<label htmlFor="endNode">
					<b>Kết thúc tại:</b>
				</label>
				<select
					id="endNode"
					onChange={(e) => setEndNode(e.target.value)}
					value={endNode}>
					{Object.keys(graph).map((node) => (
						<option key={node} value={node}>
							{nodeNames[node]}
						</option>
					))}
				</select>
				<br />
				<button onClick={findShortestPathDetails}>Tìm đường đi</button>
				<h2>Đường đi chi tiết:</h2>
				<ul>
					<li style={{ marginBottom: "15px", listStyle: "none" }}>
						Để đi từ <b>{nodeNames[startNode]}</b> đến{" "}
						<b>{nodeNames[endNode]}</b> bạn có thể di chuyển như sau:
					</li>
					{pathDetails.map((step, index) => {
						const currentNodeName = nodeNames[step.node];
						const previousNodeName = nodeNames[pathDetails[index - 1]?.node];
						const nextNodeName = nodeNames[pathDetails[index + 1]?.node];
						const endNodeName = nodeNames[endNode];

						if (pathDetails.length === 1) {
							return (
								<li key={index}>
									Bạn chỉ cần đi {step.weight} từ <b>{nodeNames[startNode]}</b>{" "}
									đến <b>{nodeNames[endNode]}</b>
								</li>
							);
						} else if (index === 0) {
							return (
								<li key={index}>
									Xuất phát từ <b>{nodeNames[startNode]}</b>, bạn cần di chuyển{" "}
									{step.weight} để đến <b>{nextNodeName}</b>
								</li>
							);
						} else if (index === pathDetails.length - 1) {
							return (
								<li key={index}>
									Cuối cùng từ <b>{currentNodeName}</b>, bạn phải đi tiếp{" "}
									{step.weight} để đến <b>{endNodeName}</b> và hoàn thành đoạn
									đường
								</li>
							);
						} else {
							return (
								<li key={index}>
									Từ <b>{currentNodeName}</b>, bạn phải đi tiếp {step.weight} để
									đến <b>{nextNodeName}</b>
								</li>
							);
						}
					})}
				</ul>
				<h2>Tổng khoảng cách: {totalPathDistance}</h2>
			</div>
			<div className="maps">
				<img src={maps} alt="" />
				<br />
				<span>
					<i>Mở hình ảnh bằng tab mới để xem rõ hơn (Right click)</i>
				</span>
			</div>
		</div>
	);
};

export default ShortestPathDetails;
