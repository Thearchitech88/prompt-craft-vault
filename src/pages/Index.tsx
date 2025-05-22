
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Book, Plus, ArrowRight } from "lucide-react";

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-4 px-6 border-b border-border">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-prompt-gradient">
              <Book className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">
              Prompt<span className="gradient-text">Craft</span>Vault
            </h1>
          </div>
          
          <Button 
            variant="outline" 
            className="hidden sm:flex"
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </Button>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="flex-1 text-center md:text-left space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Master Your <span className="gradient-text">AI Prompts</span> With Version Control
              </h1>
              
              <p className="text-lg text-muted-foreground">
                Create, save, and refine your prompts over time. 
                Compare versions and see what works best.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button 
                  size="lg" 
                  className="bg-prompt-gradient hover:opacity-90 transition-opacity"
                  onClick={() => navigate('/dashboard')}
                >
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/create')}
                >
                  <Plus className="mr-2 w-5 h-5" /> Create Prompt
                </Button>
              </div>
            </div>
            
            <div className="flex-1 max-w-md animate-fade-in">
              <div className="relative">
                <div className="absolute -top-8 -right-8 w-[90%] h-[90%] bg-prompt-purple-600/10 rounded-xl blur-xl"></div>
                <div className="relative bg-card border border-border rounded-xl shadow-lg p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-prompt-purple-500"></div>
                      <h3 className="font-medium">Creative Story Generator v3</h3>
                    </div>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Latest</span>
                  </div>
                  
                  <div className="bg-prompt-dark p-4 rounded-md font-mono text-sm">
                    <p>Create a short story about [character] who discovers [item] and how it changes their life.</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="prompt-tag">Creative</span>
                    <span className="prompt-tag">Writing</span>
                    <span className="prompt-tag">ChatGPT</span>
                  </div>
                  
                  <div className="pt-2 space-y-1 border-t border-border">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Version 3</span>
                      <span>Updated 2 days ago</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-prompt-gradient w-3/4"></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>v1</span>
                      <span>v3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-lg border border-border bg-card/50 space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Plus className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium">Create & Version</h3>
              <p className="text-muted-foreground">Save multiple versions of your prompts as you refine them</p>
            </div>
            
            <div className="p-6 rounded-lg border border-border bg-card/50 space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 3V9H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 3L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 21V15H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 21L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-medium">Compare & Analyze</h3>
              <p className="text-muted-foreground">See what's changed between versions to find the best approach</p>
            </div>
            
            <div className="p-6 rounded-lg border border-border bg-card/50 space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3V9L16 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-medium">Track History</h3>
              <p className="text-muted-foreground">Never lose your prompt experiments and iterations</p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="mt-auto py-6 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 PromptCraftVault. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
