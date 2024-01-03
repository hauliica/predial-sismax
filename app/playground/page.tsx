import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {CheckCircle2, WalletCards,} from "lucide-react";

export default function PlaygroundPage() {
    return (
        <>
            <TooltipProvider>
                <Card className="bg-white dark:bg-black shadow-lg rounded-lg overflow-hidden">
                    <CardHeader className="bg-green-100 dark:bg-green-700 p-4">
                        <div className="flex items-center">
                            <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-300 mr-2"/>
                            <CardTitle className="text-lg font-semibold text-green-800 dark:text-green-200">Payment
                                Completed</CardTitle>
                        </div>
                        <CardDescription className="text-sm text-green-600 dark:text-green-300">Thank you! Your payment
                            has
                            been received.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4">
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-200">Date:</span>
                            <span className="text-sm text-gray-600 dark:text-gray-200">March 12, 2023</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-200">Reference:</span>
                            <span className="text-sm text-gray-600 dark:text-gray-200">A1B2C3D4</span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-200">Card Brand:</span>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <WalletCards className="h-5 w-5 text-gray-600 dark:text-gray-200"/>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Visa</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-200">Amount:</span>
                            <span className="text-sm text-gray-600 dark:text-gray-200">$123.45</span>
                        </div>
                    </CardContent>
                    <CardFooter className="p-4 bg-gray-100 dark:bg-gray-800">
                        <div className="flex items-center">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="User avatar"/>
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col ml-2">
                                <span
                                    className="text-sm font-medium text-gray-800 dark:text-gray-200">Card Holder</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">Charles Norman</span>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </TooltipProvider>
        </>
    );
};