
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, Save, Plus, XCircle
} from "lucide-react";

const CreatePrompt: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const savePrompt = () => {
    // In a real app, you would save the prompt to the backend
    if (!title.trim()) {
      alert('Please enter a title for your prompt');
      return;
    }
    
    if (!content.trim()) {
      alert('Please enter content for your prompt');
      return;
    }
    
    console.log('Creating new prompt:', { title, description, content, tags });
    // Mock success - would redirect to the new prompt in a real app
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto max-w-3xl py-6 px-4">
            <div className="flex items-center gap-3 mb-6">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <h1 className="text-2xl font-bold">Create New Prompt</h1>
            </div>
            
            <div className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title<span className="text-destructive">*</span>
                  </label>
                  <Input 
                    id="title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Give your prompt a clear title" 
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Input 
                    id="description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="What does this prompt do?" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="prompt" className="text-sm font-medium">
                    Prompt Content<span className="text-destructive">*</span>
                  </label>
                  <Textarea 
                    id="prompt" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    placeholder="Write your prompt here..." 
                    className="min-h-[200px] font-mono resize-y"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Use [placeholders] for variable parts that will change between uses.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map(tag => (
                      <Badge 
                        key={tag} 
                        variant="secondary"
                        className="flex items-center gap-1 py-1"
                      >
                        {tag}
                        <button 
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-muted-foreground hover:text-foreground"
                        >
                          <XCircle className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      value={tagInput} 
                      onChange={(e) => setTagInput(e.target.value)} 
                      onKeyDown={(e) => e.key === 'Enter' && addTag()}
                      placeholder="Add a tag" 
                    />
                    <Button type="button" variant="outline" onClick={addTag}>
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Add tags to organize your prompts (e.g., ChatGPT, Creative, Business)
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  className="mr-2"
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </Button>
                <Button onClick={savePrompt}>
                  <Save className="w-4 h-4 mr-1" /> Create Prompt
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreatePrompt;
