import React, { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { Button } from "primereact/button";
import 'react-datepicker/dist/react-datepicker.css';
import "./tasks.css"
import AddTask from "./addTask";


export default function Tasks() {
  const [selectedDate, setSelectedDate] = useState(new Date());
	useEffect(() => {
    console.log(selectedDate)
  }, [selectedDate]);

	
	const [calendarKey, setCalendarKey] = useState(0);
	const [monthlyTasks, setMonthlyTasks] = useState([]);
	const [addVisible, setAddVisible] = useState(false);

	const closeAdd = () => {
		setAddVisible(false);
		setCalendarKey((prev) => prev + 1);
	};

	

	return (
		<section className="section-body vh-150">
			<div className="container pt-3">
				<div className="d-flex justify-content-between mb-3">
					<div>
            <span>Tasks in: </span>
						<DatePicker
							selected={selectedDate}
							onChange={(date) => setSelectedDate(date)}
							dateFormat="MMMM-yyyy"
							showMonthYearPicker
              className="date-picker-display"
						/>
					</div>
					<Button
						label="Add Task"
						icon="pi pi-plus"
						onClick={() => setAddVisible(true)}
					/>
				</div>

				{/* <div>
                    <ProjectCalendar key={calendarKey}/>
                </div> */}
				<Dialog
					header="Add Task"
					visible={addVisible}
          style={{width:"70vw"}}
					onHide={() => setAddVisible(false)}
				>
					<AddTask onClose={closeAdd}/>
				</Dialog>
			</div>
		</section>
	);
}
