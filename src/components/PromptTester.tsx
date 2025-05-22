
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";
import { Send } from "lucide-react";

interface PromptTesterProps {
  promptContent: string;
}

const PromptTester: React.FC<PromptTesterProps> = ({ promptContent }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [processedPrompt, setProcessedPrompt] = useState('');
  
  // Extract placeholders from prompt content
  const extractPlaceholders = () => {
    const regex = /\[([^\]]+)\]/g;
    let match;
    let placeholders: Record<string, string> = {};
    
    while ((match = regex.exec(promptContent)) !== null) {
      placeholders[match[1]] = '';
    }
    
    return placeholders;
  };

  // Initialize variables when prompt content changes
  React.useEffect(() => {
    const placeholders = extractPlaceholders();
    setVariables(placeholders);
    setProcessedPrompt(promptContent);
  }, [promptContent]);

  // Update placeholder value
  const updateVariable = (key: string, value: string) => {
    setVariables({
      ...variables,
      [key]: value
    });
  };

  // Process the prompt with variables
  const preparePrompt = () => {
    let processed = promptContent;
    Object.keys(variables).forEach(key => {
      const regex = new RegExp(`\\[${key}\\]`, 'g');
      processed = processed.replace(regex, variables[key] || `[${key}]`);
    });
    
    setProcessedPrompt(processed);
    return processed;
  };

  // Send prompt to OpenAI API
  const testPrompt = async () => {
    const apiKey = localStorage.getItem('openai_api_key');
    
    if (!apiKey) {
      toast.error("OpenAI API key not found. Please add your API key in Settings.");
      return;
    }
    
    const finalPrompt = preparePrompt();
    
    // Check if there are unfilled variables
    if (finalPrompt.includes('[') && finalPrompt.includes(']')) {
      toast.warning("There are unfilled variables in your prompt");
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: finalPrompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || "Error calling OpenAI API");
      }
      
      setResponse(data.choices[0]?.message?.content || "No response received");
    } catch (error) {
      console.error("Error testing prompt:", error);
      toast.error(`Error: ${error instanceof Error ? error.message : "Something went wrong"}`);
      setResponse("Failed to get a response. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Test Your Prompt</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Variable inputs */}
        {Object.keys(variables).length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Fill in Variables:</h3>
            {Object.keys(variables).map(key => (
              <div key={key} className="space-y-1">
                <label htmlFor={`var-${key}`} className="text-xs font-medium">
                  [{key}]
                </label>
                <input
                  id={`var-${key}`}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={variables[key]}
                  onChange={(e) => updateVariable(key, e.target.value)}
                  placeholder={`Enter value for [${key}]`}
                />
              </div>
            ))}
            <Separator />
          </div>
        )}
        
        {/* Processed prompt preview */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Processed Prompt:</h3>
          <div className="p-3 bg-secondary/30 rounded-md overflow-auto max-h-48">
            <pre className="whitespace-pre-wrap text-sm">{processedPrompt}</pre>
          </div>
        </div>
        
        <Button 
          onClick={testPrompt} 
          disabled={isLoading}
          className="w-full"
        >
          <Send className="w-4 h-4 mr-2" /> 
          {isLoading ? "Processing..." : "Test with ChatGPT"}
        </Button>
        
        {/* Response area */}
        {response && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Response:</h3>
            <div className="p-3 bg-secondary/20 rounded-md overflow-auto max-h-96">
              <div className="whitespace-pre-wrap text-sm">{response}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PromptTester;
