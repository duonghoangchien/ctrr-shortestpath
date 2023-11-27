import React from "react";
import "./Welcome.scss";
import logo from "../../assets/LOGO.png";
import { Link } from "react-scroll";

export default function Welcome() {
	return (
		<div id="welcome">
			<div className="container">
				<div className="logo-img">
					<img src={logo} alt="" />
				</div>
				<div data-aos="fade-up" data-aos-duration="1500" className="text">
					<h1>Welcome!</h1>
					<h2>Học phần: Cấu trúc rời rạc</h2>
					<h2>Topic: Ứng dụng thuật toán đường đi ngắn nhất Dijkstra</h2>
					<p>
						{" "}
						<b>Giảng viên hướng dẫn:</b> <br /> Nguyễn Thị Thùy Trang
					</p>
					<p>
						<b>Nhóm 1:</b> <br />
						<span>Dương Hoàng Chiến - 2033216361</span> <br />
						<span>Nguyễn Thị Thu Hiền - 2033216411</span> <br />
						<span>Phạm Bá Đại - 2033181006</span> <br />
						<span>Lê Huỳnh Đức - 2033210447</span> <br />
						<span>Nguyễn Anh Đức - 2001215733</span> <br />
					</p>
				</div>
			</div>
			<div data-aos="fade-up" data-aos-duration="1500">
				<Link to="shortest-path" smooth duration={1500}>
					<button className="move-to-next">Get Started</button>
				</Link>
			</div>
		</div>
	);
}
