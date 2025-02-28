import { cva, VariantProps } from "class-variance-authority";
import React, { InputHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
    children?: ReactNode;
}

const inputVariants = cva(
    "h-[36px] border border-[#D1D1D1] bg-[#fff] rounded-[5px] py-[5px] px-[10px] placeholder-shown:bg-[#f3f3f3] w-full",
    {
        variants: {
            variant: {
                normal: "",
                primary: "bg-sky-500 hover:bg-sky-600",
            },
            // size: {
            //     sm: ["text-sm", "py-1", "px-2"],
            //     md: ["text-base", "w-[50px]", "py-2", "px-4"],
            //     lg: ["text-xl", "py-4", "px-6"],
            // },
            isDisabled: {
                false: null,
                true: ["opacity-50", "cursor-auto", "hover:bg-currentColor"],
            },
            defaultVariants: {
                variant: "normal",
                // size: "md",
            },
        },
    }
);

export const Input = ({ className, variant, isDisabled, ...props }: InputProps) => {
    return (
        <input
            className={twMerge(inputVariants({ variant, isDisabled }), className)}
            disabled={isDisabled ? true : undefined}
            {...props}
        />
    );
};
