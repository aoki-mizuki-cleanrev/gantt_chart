import { Task } from "@rsagiev/gantt-task-react-19";
import React from "react";
import { Input } from "../common/Input";

interface ProgressProps {
    task: Task;
    onProgressUpdate: (e: React.ChangeEvent<HTMLInputElement>, taskID: string) => void;
}

const Progress = ({ task, onProgressUpdate }: ProgressProps) => {
    const commonClassNames =
        "h-[50px] p-2 text-center content-center border-b-[1px] border-[#f5f5f5] truncate whitespace-nowra";

    return (
        <div key={`${task.id}-progress`} style={{ display: "table-cell" }} className={commonClassNames}>
            {task.type !== "milestone" ? (
                <Input
                    key={`${task.id}-progress-input`}
                    type="number"
                    max="100"
                    name=""
                    id=""
                    onChange={(e) => onProgressUpdate(e, task.id)}
                    value={task.progress}
                    className="text-center w-[50px] p-0"
                    placeholder="prog."
                />
            ) : (
                []
            )}
        </div>
    );
};

export default Progress;
