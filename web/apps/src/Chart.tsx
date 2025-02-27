import { useEffect, useState } from "react";
import { Gantt, Task, ViewMode } from "@rsagiev/gantt-task-react-19";
import dayjs from "dayjs";
import "@rsagiev/gantt-task-react-19/dist/index.css";
import { getStartEndDateForProject } from "./helpers";
import "./custom-gantt.css";

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
    const [taskData, setTaskData] = useState<Task[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // const [tasks, setTasks] = useState<Task[] | null>(taskData);

    const handlerClick = () => {
        return alert("clicked!");
    };
    // const handleProgressChange = (task: Task) => {
    //     setTaskData(taskData ? taskData.map((t) => (t.id === task.id ? {...t, task.progress + 1} : t)) : []);
    // }

    const tableHeaders = ["タスク名", "開始日", "終了日", "進捗率(%)"];
    const CustomTable = ({ tasks }: { tasks: Task[] }) => {
        console.log({ ...tasks });
        return (
            <div style={{ display: "table" }} className="w-[420px]">
                <div style={{ display: "table-header-group" }}>
                    <div style={{ display: "table-row" }}>
                        {tableHeaders.map((item) => (
                            <div key={item} style={{ display: "table-cell" }} className="h-[30px] border-b border-gray-300 text-center">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ display: "table-row-group" }}>
                    {tasks.map((task, i) => (
                        <div key={task.id} style={{ display: "table-row" }} className={`${i % 2 === 0 ? "" : "bg-[#f5f5f5]"}`}>
                            {[task.name, dayjs(task.start).format("YYYY/MM/DD"), dayjs(task.end).format("YYYY/MM/DD"), task.progress].map(
                                (item) => (
                                    <div
                                        style={{ display: "table-cell" }}
                                        className="text-center h-[50px] p-2 content-center border-b-[1px] border-[#f5f5f5]"
                                    >
                                        {item}
                                    </div>
                                )
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

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

                setTaskData(transformData);
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

    // const handleDateChange = (task: Task) => {
    //     setTaskData((prevTasks) => (prevTasks ? prevTasks.map((t) => (t.id === task.id ? task : t)) : []));
    // };
    const handleTaskChange = (task: Task) => {
        console.log("On date change Id:" + task.id);
        let newTasks = taskData ? taskData.map((t) => (t.id === task.id ? task : t)) : [];
        if (task.project) {
            const [start, end] = getStartEndDateForProject(newTasks, task.project);
            const project = newTasks[newTasks.findIndex((t) => t.id === task.project)];
            if (project.start.getTime() !== start.getTime() || project.end.getTime() !== end.getTime()) {
                const changedProject = { ...project, start, end };
                newTasks = newTasks.map((t) => (t.id === task.project ? changedProject : t));
            }
        }
        setTaskData(newTasks);
    };

    const handleProgressChange = async (task: Task) => {
        setTaskData(taskData ? taskData.map((t) => (t.id === task.id ? task : t)) : []);
        console.log("On progress change Id:" + task.id);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!taskData || taskData.length === 0) return <div>No data available</div>;

    return (
        <>
            <Gantt
                tasks={taskData}
                handleWidth={10}
                // listCellWidth={""}
                columnWidth={40}
                viewMode={ViewMode.Day}
                locale={"ja-JP"}
                todayColor={"#ffedf3"}
                // onClick={handlerClick}
                onDateChange={handleTaskChange}
                onProgressChange={handleProgressChange}
                TaskListHeader={() => (
                    <div className="h-[20px] flex items-center">
                        <h2 className="text-center p-2 w-full font-bold">Title</h2>
                    </div>
                )}
                TaskListTable={() => <CustomTable tasks={taskData} />}
            />
            ;
        </>
    );
}

export default Chart;
