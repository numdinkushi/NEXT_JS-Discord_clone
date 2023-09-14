'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import queryString from "query-string";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";

const DeleteChannelModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const isModalOpen = isOpen && type === "deleteChannel";
    const { server, channel } = data;

    const onClick = async () => {
        try {
            setIsLoading(true);
            const url = queryString.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query: {
                    serverId: server?.id
                }
            })

            await axios.delete(url);

            onClose();
            router.refresh();
            router.push(`/servers/${server?.id}`);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete Channel
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to do this? <br />
                         <span className="font-semibold text-indigo-500">#{channel?.name}</span> will be permanently deleted.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-6">
                    <div className="flex items-center justify-between w-full">
                        <Button onClick={onClose} variant="ghost" disabled={isLoading}> Cancel </Button>
                        <Button onClick={onClick} variant="primary" disabled={isLoading}> Confirm </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteChannelModal;