import { Task } from "@rsagiev/gantt-task-react-19";
import React from "react";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ArticleIcon from "@mui/icons-material/Article";

interface ExpanderProps {
    task: Task;
    onExpanderClick: (task: Task) => void;
    onExpandTasks: (task: Task) => void;
}

const Expander = ({ task, onExpanderClick, onExpandTasks }: ExpanderProps) => {
    let expanderSymbol;
    let classNames;
    const commonClassNames = "h-[50px] p-2 content-center border-b-[1px] border-[#f5f5f5] truncate whitespace-nowra";
    if (task.type === "project") {
        expanderSymbol = task.hideChildren ? "+" : "−";
    } else {
        classNames = "pl-[16px]";
    }
    return (
        <div key={`${task.id}-name`} style={{ display: "table-cell" }} className={classNames + " " + commonClassNames}>
            <div className="flex">
                <div className="w-[30px]">
                    {expanderSymbol && (
                        <button
                            type="button"
                            style={{ width: "20px", height: "20px", cursor: "pointer" }}
                            onClick={() => {
                                onExpanderClick(task);
                                onExpandTasks(task);
                            }}
                        >
                            {expanderSymbol}
                        </button>
                    )}
                </div>
                <div className="">
                    {task.type === "project" ? <AccountTreeIcon /> : <ArticleIcon />}
                    <span className="ml-[5px]">{task.name}</span>
                </div>
            </div>
        </div>
    );
};

export default Expander;
