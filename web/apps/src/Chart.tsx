import { useEffect, useState } from "react";
import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from "@rsagiev/gantt-task-react-19";
import "@rsagiev/gantt-task-react-19/dist/index.css";
import TextMask from "rsuite/esm/MaskedInput/TextMask";

// const tasks: Task[] = [
//     {
//         start: new Date(2020, 1, 1),
//         end: new Date(2020, 1, 31),
//         name: "Project1",
//         id: "p_1",
//         type: "project",
//         progress: 10,
//         isDisabled: true,
//         styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
//     },
//     {
//         start: new Date(2020, 1, 2),
//         end: new Date(2020, 1, 2),
//         name: "CV",
//         id: "m_1",
//         type: "milestone",
//         progress: 45,
//         isDisabled: true,
//         styles: { progressColor: "#ffbb54", backgroundColor: "#07dbee" },
//     },
//     {
//         start: new Date(2020, 1, 2),
//         end: new Date(2020, 1, 5),
//         name: "Idea",
//         id: "m_2",
//         type: "milestone",
//         progress: 45,
//         isDisabled: true,
//         styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
//     },
//     {
//         start: new Date(2020, 1, 2),
//         end: new Date(2020, 1, 5),
//         name: "Task 1",
//         id: "t_1",
//         type: "task",
//         progress: 45,
//         isDisabled: true,
//         styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
//     },
//     {
//         start: new Date(2020, 1, 6),
//         end: new Date(2020, 1, 10),
//         name: "Task 2",
//         id: "t_2",
//         type: "task",
//         progress: 45,
//         isDisabled: true,
//         dependencies: ["t_1"],
//         styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
//     },
//     {
//         start: new Date(2020, 1, 11),
//         end: new Date(2020, 1, 15),
//         name: "Task 3",
//         id: "t_3",
//         type: "task",
//         progress: 0,
//         isDisabled: true,
//         dependencies: ["t_2"],
//         styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
//     },
// ];
function Chart() {
    const [jsonData, setJsonData] = useState<Task[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("http://localhost:5010")
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Network response was not ok");
                }
            })
            .then((data) => {
                const transformData: Task[] = data.map((task: any) => ({
                    ...task,
                    start: new Date(task.start),
                    end: new Date(task.end),
                }));

                setJsonData(transformData);
                setLoading(false);
                console.log("http://localhost:5010", data);
                return data;
            })
            .catch((er) => {
                console.error("Error!", er);
                setError(er);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!jsonData || jsonData.length === 0) return <div>No data available</div>;

    return <Gantt tasks={jsonData} viewMode={ViewMode.Day} />;
}

export default Chart;
