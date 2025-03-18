import React from "react";
import { Task } from "@rsagiev/gantt-task-react-19";
import dayjs from "dayjs";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";

interface PeriodProps {
    task: Task;
    onDateRangeUpdate: (dateRange: Date[], taskId: string) => void;
}

const Period = ({ task, onDateRangeUpdate }: PeriodProps) => {
    // const { combine, allowedMaxDays, beforeToday } = DateRangePicker;
    const commonClassNames = "h-[50px] content-center border-b-[1px] border-[#f5f5f5] truncate whitespace-nowra";

    return (
        <div key={`${task.id}-progress`} style={{ display: "table-cell" }} className={commonClassNames}>
            <DateRangePicker
                format="yyyy/MM/dd"
                // shouldDisableDate={beforeToday()}
                showMeridiem
                defaultValue={[dayjs(task.start).toDate(), dayjs(task.end).toDate()]}
                onChange={(value) => {
                    if (value) onDateRangeUpdate(value, task.id);
                }}
                // disabled={task.type === "project"}
            />
        </div>
    );
};

export default Period;
