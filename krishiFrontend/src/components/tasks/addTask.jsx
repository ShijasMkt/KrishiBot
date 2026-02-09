import React, { useEffect, useState } from "react";
import { getValidAccessToken } from "../../tools/tokenValidation";

export default function AddTask({ onClose }) {
	const [farms, setFarms] = useState([]);
	const [fields, setFields] = useState([]);
	const [crops, setCrops] = useState([]);
	const [hasCrop, setHasCrop] = useState(false);
	const [formData, setFormData] = useState({
		farm: "",
		field: "",
		crop: "",
	});
	useEffect(() => {
		fetchFarms();
		fetchCrops();
	}, []);

	useEffect(() => {
		if (formData.farm != "") {
			fetchFields();
		} else {
			setFields([]);
		}
	}, [formData.farm]);

	useEffect(() => {
		if (formData.field) {
			const selectedField = fields.find((f) => f.id == formData.field);
			if (selectedField && selectedField.crop) {
				setFormData((prev) => ({
					...prev,
					crop: selectedField.crop,
				}));
				setHasCrop(true);
			} else {
				setFormData((prev) => ({
					...prev,
					crop: "",
				}));
				setHasCrop(false);
			}
		}
	}, [formData.field]);

	const fetchFarms = async () => {
		const token = await getValidAccessToken();
		const res = await fetch("http://127.0.0.1:8000/api/fetch_farms/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		if (res.ok) {
			const data = await res.json();
			setFarms(data);
		}
	};
	const fetchFields = async () => {
		const token = await getValidAccessToken();
		const res = await fetch("http://127.0.0.1:8000/api/fetch_fields/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ farmID: formData.farm }),
		});
		if (res.ok) {
			const data = await res.json();
			setFields(data);
		}
	};
	const fetchCrops = async () => {
		const res = await fetch("http://127.0.0.1:8000/api/fetch_crops/");
		if (res.ok) {
			const data = await res.json();
			setCrops(data);
		}
	};

	const handleChange = (e) => {
		const { id, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	return (
		<section id="add-task">
			<div className="container">
				<form>
					<div className="row">
						<div className="col-4 form-group">
							<label htmlFor="farm" className="form-label mb-0">
								Farm
							</label>
							<select
								id="farm"
								className="form-control"
								value={formData.farm}
								onChange={handleChange}
                                required
							>
								<option value="">-- Select a Farm --</option>
								{farms.map((farm) => (
									<option key={farm.id} value={farm.id}>
										#{farm.id}({farm.name})
									</option>
								))}
							</select>
						</div>
						<div className="col-4 form-group">
							<label htmlFor="field" className="form-label mb-0">
								Field
							</label>
							<select
								id="field"
								className="form-control"
								value={formData.field}
								onChange={handleChange}
								disabled={formData.farm == "" ? true : false}
                                required
							>
								<option value="">-- Select a Field --</option>
								{fields.map((field) => (
									<option key={field.id} value={field.id}>
										{field.name}
									</option>
								))}
							</select>
						</div>
						<div className="col-4 form-group">
							<label htmlFor="crop" className="form-label mb-0">
								Crop
							</label>
							<select
								id="crop"
								className="form-control"
								value={formData.crop}
								onChange={handleChange}
								disabled={
									formData.farm == "" || formData.field == "" || hasCrop
										? true
										: false
								}
                                required
							>
								<option value="">-- Select a Crop --</option>
								{crops.map((crop) => (
									<option key={crop.id} value={crop.id}>
										{crop.name}
									</option>
								))}
							</select>
						</div>
					</div>
				</form>
			</div>
		</section>
	);
}
