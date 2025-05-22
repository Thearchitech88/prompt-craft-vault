
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Save } from "lucide-react";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [openAIKey, setOpenAIKey] = useState('');

  useEffect(() => {
    // Load saved API key from localStorage if exists
    const savedKey = localStorage.getItem('openai_api_key');
    if (savedKey) {
      setOpenAIKey(savedKey);
    }
  }, []);

  const saveSettings = () => {
    // Store API key in localStorage
    if (openAIKey.trim()) {
      localStorage.setItem('openai_api_key', openAIKey);
      toast.success("API key saved successfully");
    } else {
      toast.error("Please enter a valid API key");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto max-w-3xl py-6 px-4">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>API Connections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="openai-key" className="text-sm font-medium">
                    OpenAI API Key
                  </label>
                  <Input 
                    id="openai-key"
                    type="password"
                    value={openAIKey}
                    onChange={(e) => setOpenAIKey(e.target.value)}
                    placeholder="sk-..." 
                  />
                  <p className="text-xs text-muted-foreground">
                    Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenAI Dashboard</a>
                  </p>
                </div>
                
                <Button onClick={saveSettings}>
                  <Save className="w-4 h-4 mr-2" /> Save Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
