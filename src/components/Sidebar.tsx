
import React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Settings, Plus } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';

const categories = [
  { name: 'All Prompts', count: 12 },
  { name: 'ChatGPT', count: 5 },
  { name: 'Midjourney', count: 3 },
  { name: 'DALL-E', count: 2 },
  { name: 'Uncategorized', count: 2 },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <aside className="h-[calc(100vh-4rem)] w-64 border-r border-border bg-card hidden md:block overflow-y-auto">
      <div className="flex flex-col h-full p-4">
        <div className="space-y-1">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2"
            onClick={() => navigate('/dashboard')}
          >
            <BookOpen className="w-4 h-4" />
            My Prompts
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2"
            onClick={() => navigate('/settings')}
          >
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-1">
          <div className="flex items-center justify-between px-2 py-1.5">
            <span className="text-sm font-medium">Categories</span>
            <Button variant="ghost" size="icon" className="w-6 h-6">
              <Plus className="w-3.5 h-3.5" />
            </Button>
          </div>
          
          {categories.map((category) => (
            <Button
              key={category.name}
              variant="ghost"
              className="w-full justify-start text-sm"
              onClick={() => navigate(`/category/${category.name.toLowerCase().replace(' ', '-')}`)}
            >
              <div className="flex justify-between w-full">
                <span>{category.name}</span>
                <span className="bg-secondary rounded-full px-2 text-xs">
                  {category.count}
                </span>
              </div>
            </Button>
          ))}
        </div>
        
        <div className="mt-auto">
          <Button
            className="w-full mt-6"
            onClick={() => navigate('/create')}
          >
            <Plus className="w-4 h-4 mr-2" /> New Prompt
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
