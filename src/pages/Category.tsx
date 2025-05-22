
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Mock data
const mockPrompts = {
  "all-prompts": [
    { id: "1", title: "Creative Story Generator", description: "Generates creative short stories based on simple prompts.", tags: ["Creative", "Writing", "ChatGPT"] },
    { id: "2", title: "SEO Content Outline", description: "Creates SEO-friendly content outlines.", tags: ["SEO", "Content", "Marketing"] }
  ],
  "chatgpt": [
    { id: "1", title: "Creative Story Generator", description: "Generates creative short stories based on simple prompts.", tags: ["Creative", "Writing", "ChatGPT"] }
  ],
  "midjourney": [
    { id: "3", title: "Scene Description for Midjourney", description: "Detailed scene descriptions for Midjourney images.", tags: ["Midjourney", "Art", "Visual"] }
  ],
  "dall-e": [
    { id: "4", title: "DALL-E Product Mockup", description: "Generate product mockups using DALL-E.", tags: ["DALL-E", "Product", "Design"] }
  ],
  "uncategorized": [
    { id: "5", title: "Generic Prompt", description: "A basic prompt with no specific category.", tags: ["Basic"] }
  ]
};

const Category: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  
  const formattedCategoryName = categoryId ? 
    categoryId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 
    'All Prompts';
  
  const prompts = categoryId ? mockPrompts[categoryId as keyof typeof mockPrompts] || [] : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto max-w-5xl py-6 px-4">
            <div className="flex items-center gap-3 mb-6">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <h1 className="text-2xl font-bold">{formattedCategoryName}</h1>
              <span className="bg-secondary rounded-full px-2 py-0.5 text-xs">
                {prompts.length}
              </span>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {prompts.map(prompt => (
                <div 
                  key={prompt.id}
                  className="bg-card rounded-lg border border-border p-4 hover:border-primary transition-colors cursor-pointer"
                  onClick={() => navigate(`/prompt/${prompt.id}`)}
                >
                  <h2 className="text-lg font-medium mb-2">{prompt.title}</h2>
                  <p className="text-sm text-muted-foreground mb-3">{prompt.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {prompt.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
              ))}
              
              {prompts.length === 0 && (
                <div className="col-span-3 text-center py-12">
                  <p className="text-muted-foreground">No prompts found in this category</p>
                  <Button 
                    className="mt-4"
                    onClick={() => navigate('/create')}
                  >
                    Create a New Prompt
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Category;
