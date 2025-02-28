import { useEffect, useState } from "react";
import { Gantt, Task, ViewMode } from "@rsagiev/gantt-task-react-19";
import "@rsagiev/gantt-task-react-19/dist/index.css";
// import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from "@wamra/gantt-task-react";
// import "@wamra/gantt-task-react/dist/style.css";

import dayjs from "dayjs";
import { getStartEndDateForProject } from "./helpers";
import "../assets/custom-gantt.css";
import { Input } from "./common/Input";

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
//     },]

function Chart() {
    const [taskData, setTaskData] = useState<Task[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // const [tasks, setTasks] = useState<Task[] | null>(taskData);

    const handlerClick = () => {
        return alert("clicked!");
    };
    const handleProgressClickChange = (event: React.ChangeEvent<HTMLButtonElement>, taskId: string) => {
        const newProgress = Number(event.target.value);

        const newTasks = taskData ? taskData?.map((t) => (t.id === taskId ? { ...t, progress: newProgress } : t)) : [];

        setTaskData(newTasks);
    };
    const handleStartDateClickChange = (event: React.ChangeEvent<HTMLButtonElement>, taskId: string) => {
        const newStart = new Date(event.target.value);

        const newTasks = taskData ? taskData?.map((t) => (t.id === taskId ? { ...t, start: newStart } : t)) : [];

        setTaskData(newTasks);
    };
    const handleEndDateClickChange = (event: React.ChangeEvent<HTMLButtonElement>, taskId: string) => {
        const newEnd = new Date(event.target.value);

        const newTasks = taskData ? taskData?.map((t) => (t.id === taskId ? { ...t, end: newEnd } : t)) : [];

        setTaskData(newTasks);
    };

    const tableHeaders = ["タスク名", "開始日", "終了日", "進捗率(%)"];
    const CustomTable = ({ tasks }: { tasks: Task[] }) => {
        return (
            <div style={{ display: "table", tableLayout: "fixed" }} className="pl-[10px] w-[520px]">
                <div style={{ display: "table-header-group" }}>
                    <div style={{ display: "table-row" }}>
                        {tableHeaders.map((item) => (
                            <div
                                key={item}
                                style={{ display: "table-cell" }}
                                className="h-[30px] border-b border-gray-300 text-center truncate whitespace-nowrap"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ display: "table-row-group" }}>
                    {tasks.map((task, i) => (
                        <div
                            key={task.id}
                            style={{ display: "table-row" }}
                            className={`${i % 2 === 0 ? "" : "bg-[#f5f5f5]"}`}
                        >
                            {[
                                task.name,
                                <Input
                                    type="date"
                                    value={dayjs(task.start).format("YYYY-MM-DD")}
                                    onChange={(e) => handleStartDateClickChange(e, task.id)}
                                />,
                                <div>
                                    {task.type !== "milestone" ? (
                                        <Input
                                            type="date"
                                            value={dayjs(task.end).format("YYYY-MM-DD")}
                                            onChange={(e) => handleEndDateClickChange(e, task.id)}
                                        />
                                    ) : (
                                        []
                                    )}
                                </div>,
                                <div>
                                    {task.type !== "milestone" ? (
                                        <Input
                                            type="number"
                                            max="100"
                                            name=""
                                            id=""
                                            onChange={(e) => handleProgressClickChange(e, task.id)}
                                            value={task.progress}
                                            className="text-center w-[50px] p-0"
                                            placeholder="prog."
                                        />
                                    ) : (
                                        []
                                    )}
                                </div>,
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    style={{ display: "table-cell" }}
                                    className="text-center h-[50px] p-2 content-center border-b-[1px] border-[#f5f5f5] truncate whitespace-nowra"
                                >
                                    {item}
                                </div>
                            ))}
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
                handleWidth={1}
                // listCellWidth={""}
                columnWidth={50}
                viewMode={ViewMode.Day}
                preStepsCount={1}
                locale={"ja-JS"}
                timeStep={86400000}
                fontFamily={
                    "proxima-nova, 'Helvetica Neue', Helvetica, Arial, sans-serif,'proxima-nova','Helvetica Neue',Helvetica,Arial,sans-serif"
                }
                // todayColor={"#ffedf3"}
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
        </>
    );
}

export default Chart;
