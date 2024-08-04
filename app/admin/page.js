'use client'
import { useState } from 'react'
import {Input} from "@nextui-org/react";
import { EyeFilledIcon } from "../assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../assets/EyeSlashFilledIcon";

const Admin = () => {
    const [ isVisible, setIsVisible ] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-1 min-h-9">
            <Input
                isClearable
                type="email"
                label="Email"
                variant="bordered"
                placeholder="Enter your email"
                defaultValue="junior@nextui.org"
                isInvalid={false}
                errorMessage="Please enter a valid email"
                onClear={() => console.log("input cleared")}
                className="max-w-xs min-h-60 border-gray-50 bg-sky-400 flex-col gap-10"
            />

            <Input
                label="Password"
                variant="bordered"
                placeholder="Enter your password"
                endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                        {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                    </button>
                }
                type={isVisible ? "text" : "password"}
                className="max-w-xs"
            />

        </div>
    )
}

export default Admin