
import React, { useState } from 'react';
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import PromptCard from "@/components/PromptCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ArrowDown } from "lucide-react";

const MOCK_PROMPTS = [
  {
    id: "1",
    title: "Creative Story Generator",
    description: "Generates creative short stories based on simple prompts.",
    content: "Create a short story about [character] who discovers [item] and how it changes their life.",
    tags: ["Creative", "Writing", "ChatGPT"],
    version: 2,
    versionCount: 4,
    updatedAt: "2 days ago"
  },
  {
    id: "2",
    title: "Code Explainer",
    description: "Explains complex code in simple terms for beginners.",
    content: "Explain this code as if you're teaching a beginner: [paste code here]",
    tags: ["Coding", "Educational", "ChatGPT"],
    version: 1,
    versionCount: 1,
    updatedAt: "1 week ago"
  },
  {
    id: "3",
    title: "Scientific Paper Summarizer",
    description: "Creates concise summaries of scientific papers.",
    content: "Summarize this scientific paper in simple terms, highlighting key findings and implications: [paper text]",
    tags: ["Academic", "Science", "Research"],
    version: 3,
    versionCount: 7,
    updatedAt: "3 days ago"
  },
  {
    id: "4",
    title: "Fantasy Character Creator",
    description: "Generates detailed fantasy character descriptions.",
    content: "Create a detailed character description for a [race] [class] in a high fantasy setting, including background, personality, and appearance.",
    tags: ["Fantasy", "Creative", "Characters"],
    version: 1,
    versionCount: 2,
    updatedAt: "5 days ago"
  },
  {
    id: "5",
    title: "Marketing Copy Generator",
    description: "Creates compelling marketing copy for products.",
    content: "Write a compelling marketing description for [product], highlighting its benefits, features, and why customers need it. Target audience is [audience].",
    tags: ["Marketing", "Copywriting", "Business"],
    version: 2,
    versionCount: 5,
    updatedAt: "Yesterday"
  },
  {
    id: "6",
    title: "DALL-E Detailed Scene",
    description: "Generates detailed scene descriptions for DALL-E.",
    content: "A highly detailed [scene type], featuring [main elements], with [style] artistic style, [lighting] lighting, [perspective] view, [additional details].",
    tags: ["DALL-E", "Image", "Creative"],
    version: 4,
    versionCount: 12,
    updatedAt: "4 hours ago"
  }
];

const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('recent');
  
  // Filter and sort prompts based on search query and sort option
  const filteredPrompts = MOCK_PROMPTS.filter(prompt => 
    prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  ).sort((a, b) => {
    if (sortOption === 'recent') {
      // Mock sorting by date - in a real app, convert dates properly
      return a.updatedAt.includes('hour') ? -1 : b.updatedAt.includes('day') ? -1 : 1;
    } else if (sortOption === 'name') {
      return a.title.localeCompare(b.title);
    } else if (sortOption === 'versions') {
      return b.versionCount - a.versionCount;
    }
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold">My Prompts</h2>
              
              <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search prompts..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-full sm:w-40">
                    <div className="flex items-center">
                      <ArrowDown className="mr-2 h-3.5 w-3.5" />
                      <SelectValue placeholder="Sort by" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="versions">Most Versions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {filteredPrompts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrompts.map(prompt => (
                  <PromptCard key={prompt.id} {...prompt} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <h3 className="text-lg font-medium">No prompts found</h3>
                <p className="text-muted-foreground mt-1">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
