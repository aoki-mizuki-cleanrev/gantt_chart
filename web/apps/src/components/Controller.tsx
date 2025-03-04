import React from "react";
import DateRangeIcon from "@mui/icons-material/DateRange";

interface ControllerProps {
    handleDisplayModeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Controller({ handleDisplayModeChange }: ControllerProps) {
    return (
        <div className="h-[80px] flex">
            <div className="wrapper ml-auto p-2 font flex items-center">
                <label
                    htmlFor="displayModeSelect"
                    className="border rounded-[5px] border-transparent flex items-center px-4 py-2 focus:border-[#ccc]"
                >
                    <DateRangeIcon fontSize="large" />
                    <select
                        name=""
                        id="displayModeSelect"
                        className="w-[80px] text-center text-[16px] outline-none cursor-pointer"
                        onChange={(event) => {
                            handleDisplayModeChange(event);
                        }}
                        defaultValue={"Day"}
                    >
                        <option value="Day">日</option>
                        <option value="Week">週</option>
                        <option value="Month">月</option>
                        <option value="Hour">時間</option>
                    </select>
                    test!!
                </label>
            </div>
        </div>
    );
}

export default Controller;
