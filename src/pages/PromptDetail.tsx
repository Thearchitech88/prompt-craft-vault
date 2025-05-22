import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import PromptTester from "@/components/PromptTester";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, Save, Copy, Clock, Plus, Trash, 
  CheckCircle, XCircle 
} from "lucide-react";

// Mock data
const promptData = {
  id: "1",
  title: "Creative Story Generator",
  description: "Generates creative short stories based on simple prompts.",
  content: "Create a short story about [character] who discovers [item] and how it changes their life.",
  tags: ["Creative", "Writing", "ChatGPT"],
  versions: [
    {
      id: "v3",
      version: 3,
      content: "Create a short story about [character] who discovers [item] and how it changes their life.",
      createdAt: "2 days ago",
      notes: "Added more specific instructions and examples."
    },
    {
      id: "v2",
      version: 2,
      content: "Write a short story featuring [character] who finds [item] with unexpected properties.",
      createdAt: "1 week ago",
      notes: "Refined character focus."
    },
    {
      id: "v1",
      version: 1,
      content: "Write a creative story about finding a magical item.",
      createdAt: "2 weeks ago",
      notes: "Initial version"
    }
  ]
};

const PromptDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("edit");
  const [title, setTitle] = useState(promptData.title);
  const [description, setDescription] = useState(promptData.description);
  const [content, setContent] = useState(promptData.content);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(promptData.tags);
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  const [isComparing, setIsComparing] = useState(false);
  
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const savePrompt = () => {
    // In a real app, you would save the prompt to the backend
    console.log("Saving prompt:", { title, description, content, tags });
    // Mock success message
    alert("Prompt saved successfully!");
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    // You could add a toast notification here
  };
  
  const toggleVersionSelection = (versionId: string) => {
    if (selectedVersions.includes(versionId)) {
      setSelectedVersions(selectedVersions.filter(id => id !== versionId));
    } else {
      // Only allow two versions for comparison
      if (selectedVersions.length < 2) {
        setSelectedVersions([...selectedVersions, versionId]);
      }
    }
  };
  
  const startComparison = () => {
    if (selectedVersions.length === 2) {
      setIsComparing(true);
    }
  };
  
  const cancelComparison = () => {
    setIsComparing(false);
    setSelectedVersions([]);
  };

  // Get the selected versions for comparison
  const comparisonVersions = promptData.versions.filter(
    version => selectedVersions.includes(version.id)
  ).sort((a, b) => b.version - a.version);

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
              <h1 className="text-2xl font-bold">{isComparing ? "Compare Versions" : title}</h1>
            </div>
            
            {isComparing ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Comparing Versions</h2>
                  <Button variant="outline" size="sm" onClick={cancelComparison}>
                    <XCircle className="w-4 h-4 mr-1" /> Cancel Comparison
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  {comparisonVersions.map(version => (
                    <Card key={version.id} className="overflow-hidden">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <Badge variant="outline" className="bg-primary/10 text-primary">
                            Version {version.version}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{version.createdAt}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{version.notes}</p>
                        <div className="p-3 bg-secondary/50 rounded-md">
                          <pre className="whitespace-pre-wrap text-sm font-mono">{version.content}</pre>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="edit">Edit Prompt</TabsTrigger>
                  <TabsTrigger value="versions">Version History</TabsTrigger>
                  <TabsTrigger value="test">Test Prompt</TabsTrigger>
                </TabsList>
                
                <TabsContent value="edit" className="space-y-6">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium">
                        Title
                      </label>
                      <Input 
                        id="title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Give your prompt a clear title" 
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
                        Prompt Content
                      </label>
                      <Textarea 
                        id="prompt" 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        placeholder="Write your prompt here..." 
                        className="min-h-[200px] font-mono resize-y"
                      />
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
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={copyToClipboard}>
                      <Copy className="w-4 h-4 mr-1" /> Copy
                    </Button>
                    <Button onClick={savePrompt}>
                      <Save className="w-4 h-4 mr-1" /> Save Changes
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="versions" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Version History</h2>
                    
                    {selectedVersions.length === 2 ? (
                      <Button size="sm" onClick={startComparison}>
                        <CheckCircle className="w-4 h-4 mr-1" /> Compare Selected
                      </Button>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Select two versions to compare
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    {promptData.versions.map((version) => (
                      <Card 
                        key={version.id} 
                        className={`overflow-hidden transition-all ${
                          selectedVersions.includes(version.id) 
                            ? 'border-primary' 
                            : ''
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className={`h-6 w-6 p-0 ${
                                  selectedVersions.includes(version.id) 
                                    ? 'bg-primary text-primary-foreground' 
                                    : ''
                                }`}
                                onClick={() => toggleVersionSelection(version.id)}
                              >
                                {selectedVersions.includes(version.id) ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : (
                                  <span>{version.version}</span>
                                )}
                              </Button>
                              <div>
                                <h3 className="font-medium">Version {version.version}</h3>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {version.createdAt}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-7 w-7" 
                                onClick={() => setContent(version.content)}
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </Button>
                              {version.version !== promptData.versions[0].version && (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-7 w-7 text-destructive"
                                >
                                  <Trash className="h-3.5 w-3.5" />
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          <Separator className="my-3" />
                          
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">{version.notes}</p>
                            <div className="p-3 bg-secondary/50 rounded-md max-h-32 overflow-y-auto">
                              <pre className="whitespace-pre-wrap text-sm font-mono">{version.content}</pre>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="test" className="space-y-6">
                  <PromptTester promptContent={content} />
                </TabsContent>
              </Tabs>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PromptDetail;
