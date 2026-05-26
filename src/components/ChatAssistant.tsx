import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { ChatPanel } from "./chat/ChatPanel";
import { AIOrbTrigger } from "./chat/AIOrbTrigger";

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const chatButtonRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => chatButtonRef.current?.focus(), 80);
  };

  return (
    <>
      <AnimatePresence>{isOpen && <ChatPanel onClose={handleClose} />}</AnimatePresence>
      <AIOrbTrigger
        onClick={() => (isOpen ? handleClose() : setIsOpen(true))}
        isOpen={isOpen}
        buttonRef={chatButtonRef}
      />
    </>
  );
}
