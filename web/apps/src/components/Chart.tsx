import React, { useEffect, useState } from "react";
// import useSWR from "swr";
import { Gantt, Task, ViewMode } from "@rsagiev/gantt-task-react-19";
import "@rsagiev/gantt-task-react-19/dist/index.css";
// import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from "@wamra/gantt-task-react";
// import "@wamra/gantt-task-react/dist/style.css";

import { getStartEndDateForProject } from "./helpers";
import "../assets/custom-gantt.css";
import CustomTable from "./TableContents/CustomTable";

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
interface ChartProps {
    displayMode: ViewMode;
}

// Task並べ替え
const sortTask = (data: Task[]) => {
    // まず、typeが'project'のアイテムを優先して並べる
    const projects = data.filter((item) => item.type === "project");
    const others = data.filter((item) => item.type !== "project");
    const sortedArray = [];
    let pivot: Task | null = null;

    for (let j = 0; j < projects.length; j++) {
        pivot = projects[j];

        const relatedTasks = others.filter((other: Task) => other.project === pivot?.id);

        sortedArray.push(pivot);
        sortedArray.push(...relatedTasks);

        // 関連タスクをothersから削除
        others.forEach((task, index) => {
            if (task.project === pivot?.id) {
                others.splice(index, 1);
            }
        });
    }
    return sortedArray;
};

function Chart({ displayMode }: ChartProps) {
    const [taskData, setTaskData] = useState<Task[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleProgressClickChange = (event: React.ChangeEvent<HTMLInputElement>, taskId: string) => {
        const newProgress = Number(event.target.value);

        const newTasks = taskData ? taskData?.map((t) => (t.id === taskId ? { ...t, progress: newProgress } : t)) : [];

        setTaskData(newTasks);
    };
    const handleStartDateClickChange = (event: React.ChangeEvent<HTMLInputElement>, taskId: string) => {
        const newStart = new Date(event.target.value);

        const newTasks = taskData ? taskData?.map((t) => (t.id === taskId ? { ...t, start: newStart } : t)) : [];

        setTaskData(newTasks);
    };
    const handleEndDateClickChange = (event: React.ChangeEvent<HTMLInputElement>, taskId: string) => {
        const newEnd = new Date(event.target.value);

        const newTasks = taskData ? taskData?.map((t) => (t.id === taskId ? { ...t, end: newEnd } : t)) : [];

        setTaskData(newTasks);
    };
    const handleDateRangeClickChange = (dateRange: Date[], taskId: string) => {
        const newTasks = taskData
            ? taskData?.map((t) => (t.id === taskId ? { ...t, start: dateRange[0], end: dateRange[1] } : t))
            : [];

        setTaskData(newTasks);
    };
    const handleExpanderClick = (task: Task) => {
        console.log(task);
        setTaskData(taskData ? taskData.map((t) => (t.id === task.id ? task : t)) : []);
        setTaskData(
            taskData
                ? taskData.map((item) =>
                      item.id === task.id || item.project === task.id
                          ? { ...item, hideChildren: item.hideChildren ? false : true }
                          : item
                  )
                : []
        );
        console.log(taskData);

        console.log("On expander click Id:" + task.id);
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
                const transformData: Task[] = data.map((task: Task) => ({
                    ...task,
                    start: new Date(task.start),
                    end: new Date(task.end),
                }));
                setTaskData(sortTask(transformData));
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
    // async function fetcher(key: string) {
    //     return fetch(key).then((res) => res.json() as Promise<Task[] | null>);
    // }

    // const { data, error, isLoading } = useSWR("http://localhost:5010", fetcher);

    // if (error) return <div> failed to load</div>;
    // if (isLoading) return <div>Loading....</div>;
    // if (data) {
    //     const transformData: Task[] = data.map((task: Task) => ({
    //         ...task,
    //         start: new Date(task.start),
    //         end: new Date(task.end),
    //     }));
    //     setTaskData(transformData);
    // }

    return (
        <>
            <Gantt
                tasks={taskData || []}
                handleWidth={1}
                // listCellWidth={""}
                columnWidth={50}
                viewMode={displayMode}
                preStepsCount={1}
                locale={"ja-JS"}
                timeStep={86400000 as number}
                fontFamily={
                    "proxima-nova, 'Helvetica Neue', Helvetica, Arial, sans-serif,'proxima-nova','Helvetica Neue',Helvetica,Arial,sans-serif"
                }
                // todayColor={"#ffedf3"}
                // onClick={handlerClick}
                onDateChange={handleTaskChange}
                onProgressChange={handleProgressChange}
                onExpanderClick={handleExpanderClick}
                TaskListHeader={() => (
                    <div className="h-0 flex items-center">
                        {/* <h2 className="text-center p-2 w-full font-bold">Title</h2> */}
                    </div>
                )}
                TaskListTable={() => (
                    <CustomTable
                        tasks={taskData || []}
                        onStartDateUpdate={handleStartDateClickChange}
                        onEndDateUpdate={handleEndDateClickChange}
                        onDateRangeUpdate={handleDateRangeClickChange}
                        onProgressUpdate={handleProgressClickChange}
                        onExpanderClick={handleExpanderClick}
                    />
                )}
            />
        </>
    );
}

export default Chart;
