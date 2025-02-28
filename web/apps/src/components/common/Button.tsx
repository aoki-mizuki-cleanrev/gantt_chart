import { cva, VariantProps } from "class-variance-authority";
import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    children: ReactNode;
}

const buttonVariants = cva("rounded-[5px] bg-amber-400 hover:bg-amber-200 w-[100px] h-[50px] cursor-pointer", {
    variants: {
        variant: {
            primary: "bg-sky-500 hover:bg-sky-600",
            secondary: "bg-slate-500 hover:bg-slate-600",
            danger: "bg-red-500 hover:bg-red-600",
        },
        size: {
            sm: ["text-sm", "py-1", "px-2"],
            md: ["text-base", "w-[50px]", "py-2", "px-4"],
            lg: ["text-xl", "py-4", "px-6"],
        },
        isDisabled: {
            false: null,
            true: ["opacity-50", "cursor-auto", "hover:bg-currentColor"],
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    },
});

const Button = ({ children, className, variant, size, isDisabled, ...props }: ButtonProps) => {
    return (
        <button
            type="button"
            className={twMerge(buttonVariants({ variant, size, isDisabled }), className)}
            disabled={isDisabled ? true : undefined}
            aria-disabled={isDisabled ? true : undefined}
            {...props}
        >
            {children}
        </button>
    );
};
// twMerge(
//                 "rounded-2xl bg-amber-400 hover:bg-amber-200 min-w-[100px] h-[50px] cursor-pointer",
//                 className
//             )}
export default Button;
