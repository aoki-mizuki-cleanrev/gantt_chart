import React from "react";
import DateRangeIcon from "@mui/icons-material/DateRange";

function Controller() {
    return (
        <div className="h-[80px] flex">
            <div className="wrapper ml-auto p-2 font flex items-center">
                <label
                    htmlFor="displayModeSelect"
                    className="border rounded-[5px] border-transparent flex items-center px-4 py-2 focus:border-[#ccc] cursor-pointer"
                >
                    <DateRangeIcon fontSize="large" />
                    <select
                        name=""
                        id="displayModeSelect"
                        className="w-[80px] text-center text-[16px] outline-none cursor-pointer"
                    >
                        <option value="Day" selected>
                            日
                        </option>
                        <option value="Week">週</option>
                        <option value="Month">月</option>
                    </select>
                </label>
            </div>
        </div>
    );
}

export default Controller;
