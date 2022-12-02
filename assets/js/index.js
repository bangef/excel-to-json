document.addEventListener("DOMContentLoaded", function () {
	const file = document.querySelector("#input-file");
	file.addEventListener("change", function () {
		readXlsxFile(file.files[0]).then(function (data) {
			let header = [];
			let json_obj = [];

			data.map((row, index) => {
				// nama field table
				if (index === 0) {
					header = row;
				}

				if (index > 0) {
					let temp = {};
					for (let x = 0; x < row.length; x++) {
						temp["id"] = index;
						if (header[x] === "nama_full") {
							// temp[header[x]] = row[x];
							if (row[x].includes(" ")) {
								temp["nama_depan"] = row[x].split(" ", 1).join("");
								temp["nama_belakang"] = row[x].split(" ").slice(1).join(" ");
							} else {
								let length = row[x].length;
								let charLengthFirstName = Math.floor(length / 2);
								temp["nama_depan"] = row[x].substr(0, charLengthFirstName);
								temp["nama_belakang"] = row[x].substr(
									charLengthFirstName,
									length
								);
							}
						} else if (header[x] === "number_phone") {
							temp[header[x]] = "0" + row[x].toString();
						} else {
							temp[header[x]] = row[x];
						}
					}
					json_obj.push(temp);
				}
			});
			const new_obj = json_obj.map(
				({ nama_depan, nama_belakang, number_phone, email, kota }) =>
					`document.querySelector('#question_first_name').value = '${nama_depan}';document.querySelector('#question_last_name').value = '${nama_belakang}';document.querySelector('#question_email').value = '${email}';document.querySelector('#question_confirm_email').value = '${email}';document.querySelector('#question_city').value = '${kota}';document.querySelector('#question_phone').value = '${number_phone}';`
			);
			document.querySelector("#output-json").value = JSON.stringify(
				new_obj,
				null,
				2
			);
		});
	});
});
