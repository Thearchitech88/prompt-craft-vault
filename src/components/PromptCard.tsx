
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Copy, Edit } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface PromptCardProps {
  id: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  version: number;
  versionCount: number;
  updatedAt: string;
}

const PromptCard: React.FC<PromptCardProps> = ({
  id,
  title,
  description,
  content,
  tags,
  version,
  versionCount,
  updatedAt,
}) => {
  const navigate = useNavigate();
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    // You could add a toast notification here
  };

  return (
    <Card className="w-full h-full overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary/30 group">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-1 text-lg">{title}</CardTitle>
          <Badge variant="outline" className="bg-primary/10 text-primary text-xs">
            v{version}.0
          </Badge>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="w-3 h-3 mr-1" />
          <span>{updatedAt}</span>
          <span className="mx-2">•</span>
          <span>{versionCount} versions</span>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs"
          onClick={() => navigate(`/prompt/${id}`)}
        >
          <Edit className="w-3.5 h-3.5 mr-1" /> Edit
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs"
          onClick={copyToClipboard}
        >
          <Copy className="w-3.5 h-3.5 mr-1" /> Copy
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PromptCard;
