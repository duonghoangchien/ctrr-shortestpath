import React, { useState, useEffect } from "react";
import "./ModalBox.scss";

const ModalBox = () => {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const modalTimer = setTimeout(() => {
			setShowModal(true);
		}, 100);
		return () => {
			clearTimeout(modalTimer);
		};
	}, []);

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<>
			{showModal && (
				<div className="modal">
					<div className="modal-content">
						<span className="close" onClick={closeModal}>
							&times;
						</span>
						<h3>Xin chào!</h3>
						<p>
							Xin chào! Đây chỉ là một website hỗ trợ cho phần bài tập của nhóm
							chúng tôi. Vì vậy nên chúng tôi không thực hiện việc responsive
							website. Nếu bạn đang mở trình duyệt bằng điện thoại thì cho phép
							chúng tôi xin lỗi vì sự bất tiện này.
						</p>
						<p>
							Nếu như bạn đang xem bằng điện thoại thì xin vui lòng mở trình
							duyệt bằng thiết bị có màn hình lớn hơn (PC, laptop, ...)
						</p>
					</div>
				</div>
			)}
		</>
	);
};

export default ModalBox;
