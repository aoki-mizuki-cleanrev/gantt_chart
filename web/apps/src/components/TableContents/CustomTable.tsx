import React, { useState } from "react";
// import { Input } from "../common/Input";
// import dayjs from "dayjs";
import { Task } from "@rsagiev/gantt-task-react-19";
import Expander from "./Expander";
import Progress from "./Progress";
import Period from "./Period";

type CustomTableProps = {
    onStartDateUpdate: (event: React.ChangeEvent<HTMLInputElement>, taskId: string) => void;
    onEndDateUpdate: (event: React.ChangeEvent<HTMLInputElement>, taskId: string) => void;
    onProgressUpdate: (event: React.ChangeEvent<HTMLInputElement>, taskId: string) => void;
    onDateRangeUpdate: (dateRange: Date[], taskId: string) => void;
    onExpanderClick: (task: Task) => void;
};

// const sortData = (data: Task[]) => {
//     // まず、typeが'project'のアイテムを優先して並べる
//     const projects = data.filter((item) => item.type === "project");
//     const others = data.filter((item) => item.type !== "project");
//     const sortedArray = [];
//     let pivot: Task | null = null;

//     for (let j = 0; j < projects.length; j++) {
//         pivot = projects[j];

//         const relatedTasks = others.filter((other: Task) => other.project === pivot?.id);

//         sortedArray.push(pivot);
//         sortedArray.push(...relatedTasks);

//         // 関連タスクをothersから削除
//         others.forEach((task, index) => {
//             if (task.project === pivot?.id) {
//                 others.splice(index, 1);
//             }
//         });
//     }
//     return sortedArray;
// };

const CustomTable = ({
    tasks,
    // onStartDateUpdate,
    // onEndDateUpdate,
    onDateRangeUpdate,
    onProgressUpdate,
    onExpanderClick,
}: { tasks: Task[] } & CustomTableProps) => {
    const [tableTasks, setTableTasks] = useState<Task[]>(tasks);

    const tableHeaders = ["タスク名", "期間", "進捗率(%)"];
    const tableHeadersWidth = ["w-1/3", "w-2/5", "w-1/6"];

    const handleExpandTasks = (project: Task) => {
        // const others = data.filter((item) => item.type !== "project");
        setTableTasks(tasks.filter((item) => !item.project || item.project !== project.id));
        console.log(tableTasks);
        console.log(
            "tableTasks",
            tasks.filter((item) => !item.project || item.project !== project.id)
        );
        console.log("project.id", project.id);
    };

    return (
        <div className="table table-fixed pl-[10px] w-[520px]">
            <div style={{ display: "table-header-group" }}>
                <div style={{ display: "table-row" }}>
                    {tableHeaders.map((item, index) => (
                        <div
                            key={item}
                            style={{ display: "table-cell" }}
                            className={`h-[50px] border-b border-gray-300 text-center content-center truncate whitespace-nowrap fit-content ${tableHeadersWidth[index]}`}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ display: "table-row-group" }}>
                {/* {tasks.map((task, i) => ( */}
                {tasks.map((task, i) => (
                    <div
                        key={task.id}
                        className={`${i % 2 === 0 ? "" : "bg-[#f5f5f5]"} ${
                            task.type !== "project" ? (task.hideChildren ? "hidden" : "table-row") : "table-row"
                        }`}
                    >
                        <Expander
                            key={`${task.id}-title`}
                            task={task}
                            onExpanderClick={() => onExpanderClick(task)}
                            onExpandTasks={handleExpandTasks}
                        />
                        <Period task={task} onDateRangeUpdate={onDateRangeUpdate} />
                        <Progress key={`${task.id}-progress`} task={task} onProgressUpdate={onProgressUpdate} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomTable;
