import Header from "./components/Header";
import Controller from "./components/Controller";
import Chart from "./components/Chart";
import React, { useState } from "react";
import { ViewMode } from "@rsagiev/gantt-task-react-19";

function App() {
    const [displayMode, setDisplayMode] = useState<ViewMode>(ViewMode.Day);

    const handleDisplayModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDisplayMode(() => {
            switch (event.target.value) {
                case "Hour":
                    return ViewMode.Hour;
                case "Day":
                    return ViewMode.Day;
                case "Week":
                    return ViewMode.Week;
                case "Month":
                    return ViewMode.Month;
                case "Quarter Day":
                    return ViewMode.QuarterDay;
                case "Half Day":
                    return ViewMode.HalfDay;
                case "QuarterYear":
                    return ViewMode.QuarterYear;
                case "Year":
                    return ViewMode.Year;
                default:
                    return ViewMode.Day;
            }
        });
    };
    return (
        <div>
            <Header />
            <Controller handleDisplayModeChange={handleDisplayModeChange} />
            <Chart />
            {/* <GanttChart /> */}
        </div>
    );
}

export default App;
