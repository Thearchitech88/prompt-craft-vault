
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Book } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full py-4 px-6 border-b border-border bg-card/80 backdrop-blur-sm z-10 sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-md bg-prompt-gradient">
            <Book className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold">
            Prompt<span className="gradient-text">Craft</span>Vault
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex"
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </Button>
          <Button
            size="sm"
            className="flex items-center gap-1"
            onClick={() => navigate('/create')}
          >
            <Plus className="w-4 h-4" /> New Prompt
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
