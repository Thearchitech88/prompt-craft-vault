
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Book, Settings, LogOut, LogIn } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
      navigate('/');
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  return (
    <header className="w-full py-4 px-6 border-b border-border bg-card/80 backdrop-blur-sm z-10 sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-md bg-prompt-gradient">
            <Book className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
            Prompt<span className="gradient-text">Craft</span>Vault
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex"
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex"
                onClick={() => navigate('/settings')}
              >
                <Settings className="w-4 h-4 mr-1" /> Settings
              </Button>
              <Button
                size="sm"
                className="flex items-center gap-1"
                onClick={() => navigate('/create')}
              >
                <Plus className="w-4 h-4" /> New Prompt
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4 mr-1" /> Logout
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              onClick={() => navigate('/auth')}
            >
              <LogIn className="w-4 h-4 mr-1" /> Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
