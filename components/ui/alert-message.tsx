import { CircleX, CheckCircle } from "lucide-react";

interface AlertMessageProps {
    message: string;
    type: "error" | "success";
    onClose: () => void;
}

export const AlertMessage = ({ message, type, onClose }: AlertMessageProps) => {
    if (!message) return null;

    const isError = type === "error";
    const bgColor = isError ? "bg-rose-100" : "bg-green-100";
    const borderColor = isError ? "border-rose-300" : "border-green-300";
    const textColor = isError ? "text-rose-600" : "text-green-600";
    const iconColor = isError ? "text-rose-400" : "text-green-400";
    const Icon = isError ? CircleX : CheckCircle;

    return (
        <div className={`mt-2 py-2 px-3 ${bgColor} ${borderColor} border rounded-md flex justify-between items-center`}>
            <p className={`text-sm font-mono ${textColor}`}>{message}</p>
            <button
                className={`${iconColor} hover:${textColor} focus:outline-none ml-3`}
                aria-label="Close"
                onClick={onClose}
            >
                <Icon />
            </button>
        </div>
    );
}
